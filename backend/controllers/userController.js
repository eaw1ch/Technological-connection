const ErrorAPI = require("../errors/ErrorAPI");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const mailService = require("../service/mail-service");
const path = require("path");

const {
  User,
  Applications,
  SubmittedApp,
  ConnectionType,
  OtherInfo,
  PersonalData,
  Companies,
  Files,
} = require("../models/models");
const validator = require("email-validator");
const { PowerDevice } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ErrorAPI.badRequest("Заполните все поля"));
    }
    if (!validator.validate(email)) {
      return next(ErrorAPI.badRequest("Некорректный email"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ErrorAPI.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();
    const user = await User.create({
      email,
      role: "USER",
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivation(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );
    const data = await PersonalData.create({ userId: user.id });

    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ErrorAPI.internalServerError("Пользователь не найден"));
    }

    if (!user.confirmed) {
      return next(
        ErrorAPI.internalServerError(
          "Пожалуйста подтвердите свою электронную почту"
        )
      );
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ErrorAPI.internalServerError("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async activate(req, res, next) {
    const activationLink = req.params.link;

    const user = await User.findOne({
      where: { activationLink: activationLink },
    });
    if (!user) {
      return next(ErrorAPI.badRequest("Некорректная ссылка активации"));
    }
    user.confirmed = true;
    await user.save();
    return res.redirect(process.env.CLIENT_URL);
  }

  async getInfo(req, res, next) {
    const count = await User.count();
    return res.json({ count });
  }

  async getCountApp(req, res, next) {
    const count = await Applications.count();
    return res.json({ count });
  }

  async getSubmittedApp(req, res, next) {
    const count = await SubmittedApp.count({
      where: {
        app_status: true,
      },
    });
    return res.json({ count });
  }

  async getFeedback(req, res, next) {
    const { email, question } = req.body;
    try {
      await mailService.getFeedback(email, question);
      res.send({ message: "Вопрос был задан" });
    } catch (err) {
      return next(ErrorAPI.internalServerError(e));
    }
  }

  async getConnectionTypes(req, res, next) {
    let connectionType = await ConnectionType.findAll();
    if (connectionType) {
      return res.json(connectionType);
    } else {
      return next(ErrorAPI.badRequest("Варианты присоединения не найдены"));
    }
  }

  async getCompanies(req, res, next) {
    let companies = await Companies.findAll();
    if (companies) {
      return res.json(companies);
    } else {
      return next(ErrorAPI.badRequest("Нет доступных организаций"));
    }
  }

  async application(req, res, next) {
    const {
      type,
      doc_method,
      consent_processing,
      device,
      address,
      max_power,
      voltage,
      load_type,
      companyName,
    } = req.body;
    const { file } = req.files;
    const user = req.user.id;

    try {
      const application = await Applications.create({ userId: user });
      const submitted_app = await SubmittedApp.create({
        applicationId: application.id,
        app_status: false,
      });

      const connection_type = await ConnectionType.findOne({
        where: { reason: type },
      });
      // Создание нового connection_type
      // const connection_type = await ConnectionType.create({
      //   reason: "Временное присоединение",
      // });

      const company = await Companies.findOne({
        where: { name: companyName },
      });

      let fileName = uuid.v4() + ".doc";
      file.mv(path.resolve(__dirname, "..", "files", fileName));

      const other_info = await OtherInfo.create({
        doc_method: doc_method,
        file: fileName,
        consent_processing: consent_processing,
      });

      const power_device = await PowerDevice.create({
        device,
        address,
        max_power,
        voltage,
        load_type,
      });

      application.companyId = company.id;
      application.connectionTypeId = connection_type.id;
      application.submittedAppId = submitted_app.id;
      application.otherInfoId = other_info.id;
      application.powerDeviceId = power_device.id;
      await application.save();
      return res.json({ application });
    } catch (e) {
      return next(ErrorAPI.badRequest("Ошибка подачи заявки"));
    }
  }
}

module.exports = new UserController();
