const { sequelize,DataTypes } = require('../config/db');


const user = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'google',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  number_product: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  number_recycles: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  number_charity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'unban',
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verify: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  // Other model options go here
});

module.exports ={user}
