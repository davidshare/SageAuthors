module.exports = (sequelize, DataTypes) => {
  const ArticlesTag = sequelize.define('ArticlesTag', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    articleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    tagId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }
  });

  ArticlesTag.associate = (models) => {
    ArticlesTag.belongsTo(models.Article, {
      foreignKey: 'articleId',
      targetKey: 'id',
      as: 'Article'
    });
    ArticlesTag.belongsTo(models.Tag, {
      foreignKey: 'tagId',
      targetKey: 'id',
      as: 'Tag'
    });
  };
  return ArticlesTag;
};
