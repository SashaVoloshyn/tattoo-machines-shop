'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TattooMachines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  TattooMachines.init({
    machine_manufacturer: DataTypes.STRING,
    country_manufacturer:DataTypes.STRING,
    price: DataTypes.INTEGER,
    vendor_code: DataTypes.STRING,
    name: DataTypes.STRING,
    description:DataTypes.STRING,
    color:DataTypes.STRING,
    weight:DataTypes.INTEGER,
    images:DataTypes.STRING,
    material:DataTypes.STRING,
    in_stock:DataTypes.INTEGER,
    bestseller:DataTypes.BOOLEAN,
    new:DataTypes.BOOLEAN,
    needle_stroke:DataTypes.INTEGER,
    type:DataTypes.STRING,
    popularity:DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'TattooMachines',
  });
  return TattooMachines;
};