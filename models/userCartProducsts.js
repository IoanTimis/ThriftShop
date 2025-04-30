const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); 

const userCartProducts = sequelize.define('userCP', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: 'id', 
    },
  },

  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(userCartProducts, { foreignKey: 'user_id', onDelete: 'CASCADE' });
userCartProducts.belongsTo(User, { foreignKey: 'user_id' });

module.exports = userCartProducts;
