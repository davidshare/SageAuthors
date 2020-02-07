module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Tag.associate = (models) => {
    Tag.belongsToMany(models.Article, {
      foreignKey: 'tagId',
      as: 'articles',
      through: models.ArticlesTag
    });
  };
  return Tag;
};
