const ErrorAPI = require("../errors/ErrorAPI");
const {
  SubmittedApp,
  PersonalData,
  ConnectionType,
  PowerDevice,
  OtherInfo,
} = require("../models/models");
const { User, Companies, Applications } = require("../models/models");
const validator = require("email-validator");

class AdminController {
  async getAll(req, res, next) {
    let users = await User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    }).catch((err) => {
      return next(ErrorAPI.badRequest("Пользователи не были найдены"));
    });
    return res.json(users);
  }

  async getAllApp(req, res, next) {
    let user;
    let submitted_app;

    const applications = await Applications.findAll().catch((err) => {
      return next(ErrorAPI.badRequest("Заявки не были найдены"));
    });
    applications.map((obj) => ({ ...obj, user: "null" }));
    for (let i = 0; i < applications.length; i++) {
      user = await User.findOne({
        where: { id: applications[i].userId },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      submitted_app = await SubmittedApp.findOne({
        where: { applicationId: applications[i].submittedAppId },
      });
      applications[i].dataValues.submitted = submitted_app.app_status;
      applications[i].dataValues.user = user.email;
    }
    return res.json(applications);
  }

  async getInfoApplication(req, res, next) {
    const { user_id, type_id, company_id, device_id, info_id } = req.body;
    const personal_data = await PersonalData.findOne({
      where: { userId: user_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const connection_type = await ConnectionType.findOne({
      where: { id: type_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const company = await Companies.findOne({
      where: { id: company_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const power_device = await PowerDevice.findOne({
      where: { id: device_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const other_info = await OtherInfo.findOne({
      where: { id: info_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return res.json({
      personal_data,
      connection_type,
      company,
      power_device,
      other_info,
    });
  }

  async submittingApp(req, res, next) {
    const { app_id } = req.body;
    try {
      const submitted_app = await SubmittedApp.findOne({
        where: { applicationId: app_id },
      });

      submitted_app.app_status = true;
      await submitted_app.save();
      return res.json({ message: "Заявка была одобрена" });
    } catch (e) {
      return next(ErrorAPI.badRequest("Заявка не была найдена"));
    }
  }

  // async rejectingApp(req, res, next) {
  //   const { app_id } = req.body;

  //   try {
  //     await OtherInfo.destroy({
  //       where: { id: app_id },
  //     });
  //     await PowerDevice.destroy({
  //       where: { id: app_id },
  //     });
  //     await SubmittedApp.destroy({
  //       where: { id: app_id },
  //     });
  //     await Applications.destroy({
  //       where: { applicationId: app_id },
  //     });
  //     return res.json({ message: "Заявка была отклонена" });
  //   } catch (e) {
  //     return next(ErrorAPI.badRequest("Заявка не была найдена"));
  //   }
  // }

  async setAdmin(req, res, next) {
    const { email } = req.body;
    if (validator.validate(email)) {
      let user = await User.findOne({
        where: { email },
      });
      if (user) {
        if (user.role !== "ADMIN") {
          User.update({ role: "ADMIN" }, { where: { email: email } });
          return next(res.json({ message: "Админ был назначен" }));
        } else {
          return next(
            ErrorAPI.badRequest("Данный пользователь уже является админом")
          );
        }
      } else {
        return next(ErrorAPI.badRequest("Пользователь не был найден"));
      }
    } else return next(ErrorAPI.badRequest("Некорректный email"));
  }

  async addCompany(req, res, next) {
    const {
      name,
      index,
      city,
      street,
      house_number,
      email,
      phone_number,
      cite,
    } = req.body;
    console.log(name);
    if (validator.validate(email)) {
      const duplicateName = await Companies.findOne({
        where: { name },
      });
      if (duplicateName) {
        return next(
          ErrorAPI.badRequest("Компания с введенным названием уже существует")
        );
      }
      const duplicateEmail = await Companies.findOne({
        where: { email },
      });
      if (duplicateEmail) {
        return next(
          ErrorAPI.badRequest("Введенная электронная почта уже используется")
        );
      }

      await Companies.create({
        name,
        index,
        city,
        street,
        house_number,
        email,
        phone_number,
        cite,
      });
      return res.send({ message: "Компания успешно добавлена" });
    } else return next(ErrorAPI.badRequest("Некорректный email"));
  }
}

module.exports = new AdminController();
