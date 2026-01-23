// boardService.js (모듈기능 제공)
const API_URL = "http://localhost:3000/boards";

const svc = {
  getBoards(page, callback) {
    fetch(API_URL + "/pg/" + page)
      .then((resp) => resp.json())
      .then(callback)
      .catch((err) => console.error(err));
  },
  getTotalCount(callback) {
    fetch(API_URL + "/totalCount")
      .then((resp) => resp.json())
      .then(callback)
      .catch((err) => console.error(err));
  },
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
