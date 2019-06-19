const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");

const passportConfig = require("./passport");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");
const hashtagAPIRouter = require('./routes/hashtag');
dotenv.config();
const db = require("./models");
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan("dev"));
app.use(express.json()); // json형식의 본문
app.use(express.urlencoded({ extended: true })); // form을 처리하는것
// API는 다른 서비스가 내 서비스의 기능을 실행할수 있게 열어둔 창구
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false //https를 쓸때 true
    },
    name: 'rnbck'
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);
app.use("/api/hashtag", hashtagAPIRouter);

app.listen(3065, () => {
  console.log(`server is running on http://localhost:3065`);
});
