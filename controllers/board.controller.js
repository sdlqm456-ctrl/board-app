// 서버에서 받아온 요청들에 실제 기능을 넣는 부분

const service = require("../service/board.service");
// 컨트롤러의 역활 => /board => view에 전달

const ctrl = {
  list: async (req, res) => {
    const rows = await service.findAll();
    res.send(rows);
  },
  // req: 받아오는 정보
  create: async (req, res) => {
    const { title, content, writer } = req.body;
    // body에서 넘어온 정보: { title: 'postman을 활용', content: 'post 요청 처리하기', writer: 'user06' }
    const result = await service.create({ title, content, writer });
    res.send(result);
  },
  // 사용자 요청정보를 읽어오고 받아오는 부분
  detail: async (req, res) => {
    let id = await service.findById(req.params.id);
    console.log(req.params.id);
    res.send(id);
  },
  // 정보를 수정하고 업데이트
  update: async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const result = await service.update({ title, content, id });
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
