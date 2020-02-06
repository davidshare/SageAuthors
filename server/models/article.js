module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: 'uniqueArticle',
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        },
        len: {
          args: [5, 200],
          msg: 'Title must be between 5 and 200 characters'
        }
      },
      unique: 'uniqueArticle',
    },
    body: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Body cannot be empty'
        }
      }
    },
    readingStat: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    slug: DataTypes.TEXT,
    published: DataTypes.BOOLEAN,
    readTime: DataTypes.INTEGER,
    featuredImage: DataTypes.STRING
  });
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Article.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });

    Article.belongsToMany(models.Tag, {
      as: 'tags',
      through: models.ArticlesTag,
      foreignKey: 'articleId'
    });
  };
  return Article;
};
