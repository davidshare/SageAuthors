'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      unique: {
        msg: 'This category already exists.'
      },
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty',
        },
        len: {
          args: [2, 200],
          msg: 'Title must be between 5 and 200 characters'
        }
      }
    }
  });
  Category.associate = (models) => {
    Category.hasMany(models.Article, {
      foreignKey: 'categoryId',
    });
  };
  return Category;
};
