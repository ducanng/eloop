const { sequelize,DataTypes } = require('../config/db');


const user = sequelize.define('user', {
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
}, {
  // Other model options go here
});

module.exports ={user}
