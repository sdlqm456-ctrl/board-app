// app.js

// 1. express 불러오기 (서버제작)
// require: 다른 모듈 불러오기
const express = require("express"); // express 프레임 워크 가져오기 (서버를 만드는 도구)
const boardRoute = require("./routes/board.routes");
const cors = require("cors");

const app = express(); // 인스턴스 (서버생성)
app.use(express.json()); // body 영역의 데이터를 json 포맷으로 해석
app.use(cors()); // 요청에 대한 허용

// 기본 라우트
// '/': URL정보
app.get("/", (rep, res) => {
  res.send("/경로호출");
});

// 서버 실행
app.listen(3000, () => {
  console.log("서버실행 http://localhost:3000");
});

app.use("/boards", boardRoute); // 게시판 라우터 연결
