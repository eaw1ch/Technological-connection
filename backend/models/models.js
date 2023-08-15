const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER", allowNull: false },
});

const PersonalData = sequelize.define("personal_data", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  patronymic: { type: DataTypes.STRING },
  passport_serial: { type: DataTypes.INTEGER },
  passport_number: { type: DataTypes.STRING },
  phone_number: { type: DataTypes.STRING, unique: true },
  city: { type: DataTypes.STRING },
  street: { type: DataTypes.STRING },
  house_number: { type: DataTypes.STRING },
});

const Applications = sequelize.define("applications", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ConnectionType = sequelize.define("connection_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  reason: { type: DataTypes.STRING, allowNull: false },
});

const Companies = sequelize.define("companies", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  index: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  street: { type: DataTypes.STRING, allowNull: false },
  house_number: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone_number: { type: DataTypes.STRING, allowNull: false },
  cite: { type: DataTypes.STRING, allowNull: true },
});

const PowerDevice = sequelize.define("power_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  device: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  max_power: { type: DataTypes.INTEGER, allowNull: false },
  voltage: { type: DataTypes.FLOAT, allowNull: false },
  load_type: { type: DataTypes.STRING, allowNull: false },
});

const OtherInfo = sequelize.define("other_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  doc_method: { type: DataTypes.STRING, allowNull: false },
  file: { type: DataTypes.STRING, allowNull: false },
  consent_processing: { type: DataTypes.BOOLEAN, allowNull: false },
});

const SubmittedApp = sequelize.define("submitted_app", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  app_status: { type: DataTypes.BOOLEAN, allowNull: false },
});

// Зависимости сущностей в БД
User.hasOne(PersonalData);
PersonalData.belongsTo(User);

User.hasMany(Applications);
Applications.belongsTo(User);

Applications.hasOne(SubmittedApp);
SubmittedApp.belongsTo(Applications);

ConnectionType.hasMany(Applications);
Applications.belongsTo(ConnectionType);

Companies.hasMany(Applications);
Applications.belongsTo(Companies);

PowerDevice.hasMany(Applications);
Applications.belongsTo(PowerDevice);

OtherInfo.hasMany(Applications);
Applications.belongsTo(OtherInfo);

SubmittedApp.hasOne(Applications);
Applications.belongsTo(SubmittedApp);

module.exports = {
  User,
  PersonalData,
  Applications,
  ConnectionType,
  Companies,
  PowerDevice,
  OtherInfo,
  SubmittedApp,
};
