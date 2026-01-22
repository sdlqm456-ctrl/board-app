// app.js (1.서버를 실행)

const express = require("express");
const boardRoute = require("./routes/board.routes");

const app = express(); // 인스턴스
app.use(express.json()); // body 영역의 데이터를 json 포맷으로 해석
app.use("/boards", boardRoute); // 게시판 라우팅

// 라우팅 정보
// '/': URL정보
app.get("/", (rep, res) => {
  res.send("/경로호출");
});

app.listen(3000, () => {
  console.log("서버실행 http://localhost:3000");
});
