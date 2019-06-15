const passport = require("passport");
const db = require("../models");
const local = require("./local");
module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id }
      });
      return done(null, user);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
  local();
};

// 프론트에서 서버로는 쿠키만 보낸다.
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사후 아이디발견
// 발견한 id가 deserialize로 들어감
// req.user로 사용자 정보로 들어감
// 요청을 보낼때마다 deserialize가 실행됨

