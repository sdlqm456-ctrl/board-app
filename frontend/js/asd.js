import { svc } from "./boardService.js";

// CORS => 동일한 출처 허용.
// http (프로토콜), 호스트(localhost), Port(3000, 5500)

// 게시글 목록 출력.
function loadBoards(page = 1) {
  // svc 객체의 getBoards 메소드 활용.
  svc.getBoards(page, (data) => {
    const target = document.querySelector("#boardList"); // tbody 목록.
    target.innerHTML = "";
    // 전체목록 출력 및 tbody에 생성.
    data.forEach((board) => {
      const str = `<tr>
                     <td>${board.id}</td>
                     <td>${board.title}</td>
                     <td>${board.writer}</td>
                     <td>${new Date(board.created_at).formatDate()}</td>
                   </tr>`;
      target.insertAdjacentHTML("beforeend", str);
    });
  });
}
loadBoards();

// 페이징목록 출력.
let page = 1; // page 전역변수.
function loadPagingList() {
  const pagination = document.querySelector("div.pagination");
  pagination.innerHTML = ""; // 기존목록 지우기.
  // 비동기 호출.
  const cb = (data) => {
    // 변수선언 및 계산.
    const totalCnt = data.cnt;
    let endPage = Math.ceil(page / 5) * 5; // 현재페이지를 기준으로 계산한 페이지.
    let startPage = endPage - 4;
    let realEnd = Math.ceil(totalCnt / 10); // 건수를 기준으로 실제마지막.
    // 실제 마지막페이지와 비교.
    endPage = endPage > realEnd ? realEnd : endPage;
    let prev = startPage == 1 ? false : true; // startPage(1,6,11,16...)
    let next = endPage < realEnd ? true : false; // endPage(5) ? realEnd(26) => 130
    // <a href="#" class="page-btn disabled">«</a>
    // 이전페이지.
    let aTag = document.createElement("a");
    aTag.innerText = "«";
    aTag.setAttribute("href", "#");
    aTag.setAttribute("data-page", startPage - 1);
    // 이전페이지의 여부에 따라서 disabled 속성을 지정.
    if (prev) {
      aTag.className = "page-btn";
    } else {
      aTag.className = "page-btn disabled";
    }
    pagination.appendChild(aTag); // 부모.appendChild.자식

    // 페이지.
    for (let pg = startPage; pg <= endPage; pg++) {
      let aTag = document.createElement("a");
      aTag.innerText = pg; // <a>3</a>
      aTag.setAttribute("href", "#");
      aTag.setAttribute("data-page", pg);
      // active 페이지 설정.
      if (pg == page) {
        aTag.className = "page-btn active";
      } else {
        aTag.className = "page-btn";
      }
      pagination.appendChild(aTag); // 부모.appendChild.자식
    }
    // 이후페이지.
    aTag = document.createElement("a");
    aTag.innerText = "»";
    aTag.setAttribute("href", "#");
    aTag.setAttribute("data-page", endPage + 1);
    // 이후페이지의 여부에 따라서 disabled 속성을 지정.
    if (next) {
      aTag.className = "page-btn";
    } else {
      aTag.className = "page-btn disabled";
    }
    pagination.appendChild(aTag); // 부모.appendChild.자식

    // 페이징 생성후 이벤트 등록.
    // a태그에 클릭이벤트.
    document.querySelectorAll("div.pagination>a").forEach((elem) => {
      elem.addEventListener("click", function (e) {
        page = this.dataset.page; // 클릭한 페이지로 변경.
        e.preventDefault(); // a태그 기본이동막기.
        loadBoards(page);
        loadPagingList();
      });
    });
  };
  // svc 객체의 메소드 호출.
  svc.getTotalCount(cb);
}
loadPagingList();
