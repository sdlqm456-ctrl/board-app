import { svc } from "./boardService.js";

// CORS => 동일한 출처 허용.
// http (프로토콜), 호스트(localhost), Port(3000, 5500)

// 게시글 목록 출력
function loadBoards(page = 1) {
  svc.getBoards(page, (data) => {
    const target = document.querySelector("#boardList"); // tbody 목록.
    target.innerHTML = "";
    // 전체목록 출력 및 tbody에 생성.
    data.forEach((board) => {
      const str = `<tr>
                         <td>${board.id}</td>
                         <td>${board.title}</td>
                         <td>${board.writer}</td>
                         <td>${svc.formatDate(new Date(board.created_at))}</td>
                       </tr>`;
      target.insertAdjacentHTML("beforeend", str);
    });
  });
}
loadBoards();
// document.addEventListener("DOMContentLoaded", loadBoards);

// 페이징 목록
let page = 1; // page 전역번수
function loadPagingList() {
  const pagination = document.querySelector("div.pagination");
  pagination.innerHTML = ""; // 기존목록 지우기.

  const cb = (data) => {
    // 변수선언 및 계산
    const totalCnt = data.cnt;
    let endPage = Math.ceil(page / 5) * 5; // 현제 페이지를 기준으로 계산한 페이지
    let startPgae = endPage - 4; // startPage: 페이지 묶음의 시작 부분, endPage: 페이지 묶음 끝
    let realEnd = Math.ceil(totalCnt / 5); // 건수를 기준으로 실제 마지막 페이지가 됨
    // 계산: 실제 마지막 페이지와 비교
    endPage = endPage > realEnd ? realEnd : endPage;
    let prev = startPgae == 1 ? false : true; // startPgae가 1이면 false 아니면 true를 prev에 넣기 (조건의 결과를 뒤집고 싶을때 반대로 사용)
    let next = page == realEnd ? false : true; // page: 현재 보고 있는 페이지 번호
    // <a href="#" class="page-btn active">1</a> 숫자 버튼을 클릭했을때 다른 버튼은 비활성화

    // 이전페이지  <a href="#" class="page-btn next">&raquo;</a>
    let aTag = document.createElement("a");
    aTag.innerText = "«";
    aTag.setAttribute("href", "#");
    aTag.setAttribute("data-page", startPgae - 1);
    // 이전페이지의 여부에 따라서 disabled 속성을 가짐
    if (prev) {
      aTag.className = "page-btn";
    } else {
      aTag.className = "page-btn prev";
    }
    pagination.appendChild(aTag);
    // 다음페이지

    // 페이지
    for (let pg = startPgae; pg <= endPage; pg++) {
      let aTag = document.createElement("a");
      aTag.innerText = pg; // 예시: <a>3</a>를 만듬
      aTag.setAttribute("href", "#");
      aTag.setAttribute("data-page", pg);
      // active 페이지 설정
      if (pg == page) {
        aTag.className = "page-btn active";
      } else {
        aTag.className = "page-btn";
      }
      pagination.appendChild(aTag); // 부모.appendChild.자식
    }
    // 이후페이지
    aTag = document.createElement("a");
    aTag.innerText = "»";
    aTag.setAttribute("href", "#");
    aTag.setAttribute("data-page", endPage + 1);
    // 이후페이지의 여부에 따라서 disabled 속성을 지정.
    if (next) {
      aTag.className = "page-btn";
    } else {
      aTag.className = "page-btn next";
    }
    pagination.appendChild(aTag); // 부모.appendChild.자식

    // a 테그에 클릭 이벤트 달기
    document.querySelectorAll("div.pagination>a").forEach((elem) => {
      elem.addEventListener("click", function (e) {
        page = this.dataset.page;
        loadBoards(page);
        loadPagingList();
      });
    });
  };
  // svc 객체의 메소드 호출
  svc.getTotalCount(cb);
}

loadPagingList();

// createPost()
