const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/", (req, res) => {
  if(!req.user){
    return res.status(401).send('로그인이 필요합니다.');
  }
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
}); // /api/user
router.post("/", async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId
      }
    });
    if (exUser) {
      return res.status(404).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword
    });
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    //에러 처리 넘기기
    return next(e);
  }
});
router.get("/:id", (req, res) => {}); // 남의 정보 가져오는 것 ex)/api/user/3
router.post("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('logout성공');
}); // /api/user/logout

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      const fullUser = await db.User.findOne({
        where: {id : user.id},
        // include: [{
        //   model: db.Post,
        //   as: 'Posts',
        //   attributes: ['id']
        // },
        // {
        //   model: db.User,
        //   as: 'Followings',
        //   attributes: ['id']
        // }, 
        // {
        //   model: db.User,
        //   as: 'Followers',
        //   attributes: ['id']
        // }
      //],
        attributes: ['id', 'nickname', 'userId']
      })
      console.log(fullUser);
      return res.json(fullUser);
    });
  })(req,res,next);
});

router.post("/:id/follow", (req, res) => {});
router.delete("/:id/follow", (req, res) => {});

router.post("/:id/follower", (req, res) => {});
router.delete("/:id/follower", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

module.exports = router;
