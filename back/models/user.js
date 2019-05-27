module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci" //한글이 저장됨
    }
  );
  User.associate = db => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
  };
  return User;
};
