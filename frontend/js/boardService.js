// boardService.js (모듈기능 제공)
const API_URL = "http://localhost:3000/boards";

// svc 객체의 메소드 정의
const svc = {
  // 전체 글 목록
  getBoards(page, callback) {
    fetch(API_URL + "/pg/" + page)
      .then((resp) => resp.json())
      .then(callback)
      .catch((err) => console.error(err));
  },
  // 페이징을 위한 전체 건수
  getTotalCount(callback) {
    fetch(API_URL + "/totalCount")
      .then((resp) => resp.json())
      .then(callback)
      .catch((err) => console.error(err));
  },
  // 삭제를 위한 메소드
  removeBoard(id, callback) {
    fetch(API_URL + `/${id}`, {
      method: "delete",
    })
      .then((resp) => resp.json())
      .then(callback)
      .catch((err) => console.error(err));
  },

  // 등록을 위한 메소드
  addBoard(board = {}, callback) {
    // fetch 호출
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(board),
    })
      .then((resp) => resp.json())
      .then(callback)
      .catch((err) => console.log(err));
  },

  // 날짜 포맷
  formatDate(data) {
    const yyyy = data.getFullYear();
    const mm = data.getMonth() + 1;
    const dd = data.getDate();
    const hh = data.getHours();
    const mi = data.getMinutes();
    const ss = data.getSeconds();
    // 날짜 포맷 출력 => yyyy-mm-dd HH:MM:SS 형태출력 메소드.
    return `${yyyy}-${("0" + mm).slice(-2)}-${("0" + dd).slice(-2)} ${("0" + hh).slice(-2)}:${("0" + mi).slice(-2)}:${("0" + ss).slice(-2)}`;
  },
};
export { svc };
