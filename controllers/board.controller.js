// DB와 통신하는 service 불러오기

const service = require("../service/board.service");
// 컨트롤러의 역활 => /board => view에 전달

// 1. 전체조회 (board 전체 목록을 DB에서 가져옴)
const ctrl = {
  list: async (req, res) => {
    // service.findAll():DB조회 (비동기)
    // await: DB 결과가 올때까지 기다림
    const rows = await service.findAll();
    res.send(rows);
  },
  // 2. 글 등록하기
  // req: 받아오는 정보
  create: async (req, res) => {
    const { title, content, writer } = req.body; // body에서 값을 꺼냄
    // body에서 넘어온 정보: { title: 'postman을 활용', content: 'post 요청 처리하기', writer: 'user06' }
    const result = await service.create({ title, content, writer });
    res.send(result);
  },
  // 정보 한건 조회하기
  detail: async (req, res) => {
    let id = await service.findById(req.params.id); // 조회된 글 데이터 (실제 id가 아님)
    console.log(req.params.id);
    res.send(id);
  },
  // 정보를 수정하고 업데이트
  update: async (req, res) => {
    const id = req.params.id; // body에서 수정할 내용
    const { title, content } = req.body;
    const result = await service.update({ title, content, id }); // DB에 업데이트
    // false (falsy: 0, null, "", undifined)
    if (result) {
      res.json({ retCode: "OK" });
    } else {
      res.json({ retCode: "NG" });
    }
  },
  // 내용을 삭제하기
  remove: async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const result = await service.remove({ title, content, id });
    if (result) {
      res.json({ retCode: "OK" });
    } else {
      res.json({ retCode: "NG" });
    }
  },
};
module.exports = ctrl;
