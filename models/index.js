const { sequelize } = require("../config/db");
const {admin} = require("./admin");
const {catalogue} = require("./catalogue");
const {product} = require("./product");
const {partner} = require("./partner");

const {user}  = require("./user");

partner.hasMany(product)
catalogue.hasMany(product)

sequelize.sync()
