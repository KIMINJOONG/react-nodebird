const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

router.get("/", (req, res) => {}); // /api/user
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
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    //에러 처리 넘기기
    return next(e);
  }
});
router.get("/:id", (req, res) => {}); // 남의 정보 가져오는 것 ex)/api/user/3
router.post("/logout", (req, res) => {}); // /api/user/logout

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      const filteredUser = Object.assign({}, user);
      delete filteredUser.password;
      return res.json(filteredUser);
    });
  });
});

router.post("/:id/follow", (req, res) => {});
router.delete("/:id/follow", (req, res) => {});

router.post("/:id/follower", (req, res) => {});
router.delete("/:id/follower", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

module.exports = router;
