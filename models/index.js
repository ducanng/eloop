const { sequelize } = require("../config/db");
const {admin} = require("./admin");
const {catalogue} = require("./catalogue");
const {product} = require("./product");
const {partner} = require("./partner");
const {recycle} = require("./recycle");
const {charity} = require("./charity");
const {sellProduct} = require("./sellProduct");
const {user}  = require("./user");

product.hasMany(sellProduct)
user.hasMany(sellProduct)
partner.hasMany(product)
catalogue.hasMany(product)

sequelize.sync()
