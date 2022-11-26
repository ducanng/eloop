const { sequelize } = require("../config/db");
const {admin} = require("./admin");
const {catalogue} = require("./catalogue");
const {product} = require("./product");

const {user}  = require("./user");

store.hasMany(product)
store.hasMany(catalogue)
catalogue.hasMany(product)


sequelize.sync()
