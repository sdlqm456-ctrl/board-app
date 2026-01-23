const mysql = require("mysql2/promise");

// DB 연결 설정 (설정을 한 곳에 모으기)
// pool 생성
const pool = mysql.createPool({
  // DB 연결을 여러개 미리 만들어 줌
  host: "localhost",
  user: "dev01",
  password: "dev01",
  database: "dev",
});
module.exports = pool; // pool을 다른 파일에서도 사용가능하게 내보내기
