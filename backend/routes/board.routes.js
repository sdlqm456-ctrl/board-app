// board API 생성

// 1. Router 객체 생성 (url 요청들을 기능별로 묶어서 관리)
//  require: 필요한것을 불러오는 명령어
const router = require("express").Router(); // 읽어드릴 url 주소에 대한 정보입력
const ctrl = require("../controllers/board.controller"); // 기능
const cors = require("../controllers/board.controller");

// 라우팅
// http://localhost:3000/boards/5
router.get("/pg/:page", ctrl.list); // 목록 가져오기
router.get("/totalCount", ctrl.totaCount); // 전체 건수
router.post("/", ctrl.create); // 내용 등록하기
router.get("/detail/:id", ctrl.detail); // 데이터 단건 조회
router.put("/:id", ctrl.update); // 내용수정
router.delete("/:id", ctrl.remove); // 삭제요청

module.exports = router; // Router 내보내기 (위에서 만든 요청들을 묶어서 기능들이 오면 실행하기)
