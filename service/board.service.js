// 2. 서버안에 기능을 만드는 부분

const pool = require("../db"); // sql 실행하기

// 1.  findAll: 전체조회
// row2: 게시글 목록
const service = {
  findAll: async function () {
    let [rows, result] = await pool.query("select * from board"); // 배열 구조분해 (비동기처리 방식)
    console.log(rows);
    return rows; // controller로 rows 전달
  },

  // id 단건 조회 기능 만들기 (id에 해당하는 게시글 조회)
  findById: async function (id) {
    // board 테이블에서 설정한 id 값인 게시글을 조회
    let [req1, res2] = await pool.query("select * from board where id = ?", id);
    console.log(req1);
    return req1;
  },
  create: async function (data = {}) {
    const { title, content, writer } = data; // 객체의 구조분해
    let result = await pool.query(
      "insert into board(title,content,writer) values(?,?,?)",
      [title, content, writer], // valuse(?,?,?) 에 전달할 값 (배열 형태로 전달)
    );
    console.log(result);
    return result[0].insertId; // DB에 추가된 행의 id값을 돌려줌
  },
  // 내용 업데이트
  update: async function (data = {}) {
    const { title, content, id } = data; // 앞에서 가져온 값을 참조하기 위해 한번더 적음
    console.log(title, content, id);
    let result = await pool.query(
      "Update board set title = ?, content = ? where id = ?",
      [title, content, id], // valuse(?,?,?) 에 전달할 값 (배열 형태로 전달)
    );
    console.log(result);
    return result[0].affectedRows;
  },
  // 내용 삭제
  remove: async function (id) {
    let [result] = await pool.query("delete * from board where id = ? ", [id]);
    console.log(req3);
    return result.affectedRows;
  },
};
module.exports = service;
// create({ title: "db입력 연습", content: "insert 구문연습", writer: "user01" });
