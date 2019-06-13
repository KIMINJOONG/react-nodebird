module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci" //두개를 해줘야 한글이 됨
    }
  );
  Image.associate = db => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
