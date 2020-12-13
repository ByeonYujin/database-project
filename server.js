const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// Express app 생성
const express = require("express");
const app = express();

// 정적 컨텐츠 경로 지정
app.use(express.static(path.join(__dirname, "public")));

// CORS 문제 해결
app.use(cors());

// request 파싱 (content-type: application/json)
app.use(bodyParser.json());
// request 파싱 (content-type: application/x-www-form-urlencoded) 
app.use(bodyParser.urlencoded({ extended: true }));

// Sequelize를 통한 DB 연동, 테이블 동기화
const db = require("./models");
db.sequelize.sync();

// Passport 연결
const passport = require("passport");
app.use(passport.initialize());
// Passport strategy 등록
require("./passport")();

// App의 route 설정
require("./routes")(app);

// 서버 가동
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});