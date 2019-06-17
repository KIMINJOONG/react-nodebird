module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", // 테이블명은 Users로 만들어짐
    {
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false // 필수
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true // 고유한값
      },
      password: {
        type: DataTypes.STRING(100), // 100글자 이하
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci" //두개를 해줘야 한글이 됨
    }
  );
  User.associate = db => {
    db.User.hasMany(db.Post, { as: "Posts" });
    db.User.hasMany(db.Comment); // 한명이 (게시글, 코멘트)여러개를 쓸 수 있다.
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // through=중간테이블명, belongsToMany는 as를 넣어주는게 좋다
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followers", foreignKey: 'followingId' }); // as 는 이름이 같을시 구별용도로
    db.User.belongsToMany(db.User, { through: "Follow", as: "Followings", foreignKey: 'followerId' });
  };
  return User;
};
