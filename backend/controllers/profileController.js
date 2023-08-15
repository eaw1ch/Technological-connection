const ErrorAPI = require("../errors/ErrorAPI");
const { PersonalData } = require("../models/models");

class ProfileController {
  async setPersonalData(req, res, next) {
    const {
      surname,
      name,
      patronymic,
      phone_number,
      passport_serial,
      passport_number,
      city,
      street,
      house_number,
    } = req.body;
    const user = req.user.id;
    const phone = await PersonalData.findOne({ where: { phone_number } });
    const person = await PersonalData.findOne({ where: { userId: user } });
    if (phone && person.phone_number !== phone_number) {
      return next(
        ErrorAPI.badRequest(
          "Введенный номер телефона уже привязан к другому профилю"
        )
      );
    }
    const data = await PersonalData.update(
      {
        surname: surname,
        name: name,
        patronymic: patronymic,
        phone_number: phone_number,
        passport_serial: passport_serial,
        passport_number: passport_number,
        city: city,
        street: street,
        house_number: house_number,
      },
      {
        where: { userId: req.user.id },
      }
    );
    return res.json({ message: "Данные о пользователе сохранены" });
  }

  async getPersonalData(req, res, next) {
    const user = req.user.id;

    const personalData = await PersonalData.findOne({
      where: { userId: user },
    }).then((data) => {
      if (!data) {
        return next(ErrorAPI.badRequest("Произошла ошибка"));
      }
      return res.json({ data });
    });
  }

  async checkProfile(req, res, next) {
    const user = req.user.id;

    await PersonalData.findOne({
      where: { userId: user },
    }).then((data) => {
      if (!data) {
        return next(ErrorAPI.badRequest("Произошла ошибка"));
      }
      if (
        data.name === null ||
        data.surname === null ||
        data.patronymic === null ||
        data.passport_serial === null ||
        data.passport_number === null ||
        data.phone_number === null ||
        data.city === null ||
        data.street === null ||
        data.house_number === null
      ) {
        return next(
          ErrorAPI.badRequest(
            "Профиль не заполнен. Пожалуйста, заполните профиль!"
          )
        );
      } else {
        res.json({ message: "Доступ разрешен" });
      }
    });
  }
}

module.exports = new ProfileController();
