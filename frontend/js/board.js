import { svc } from "./boardService.js";

// CORS => 동일한 출처 허용.
// http (프로토콜), 호스트(localhost), Port(3000, 5500)

// 게시글 목록 출력
function loadBoards(page = 1) {
  svc.getBoards(page, (data) => {
    const target = document.querySelector("#boardList"); // tbody 목록.
    target.innerHTML = "";
    // 전체목록 출력 및 tbody에 생성
    data.forEach((board) => {
      // 데이터를 하나하나 꺼내서 화면에 출력하기
      // 동적으로 html 테그 만들기
      const str = `<tr>
                         <td>${board.id}</td>
                         <td>${board.title}</td>
                         <td>${board.writer}</td>
                         <td>${svc.formatDate(new Date(board.created_at))}</td>
                         <td><button data-no = '${board.id}' class = 'btn-delete'>삭제</button></td>
                       </tr>`;
      // 화면에 추가하기
      target.insertAdjacentHTML("beforeend", str);
    });
    // 버튼 이벤트 (삭제)
    document
      .querySelectorAll("#boardList button.btn-delete")
      .forEach((elem) => {
        elem.addEventListener("click", function (e) {
          const bno = this.dataset.no; // 삭제할 글 번호
          // 삭제 fetch 호출
          // data (여기서 서버처리 결과값)
          svc.removeBoard(bno, (data) => {
            console.log(data);
            // 성공 => 페이지 출력 / 실패 => alert (애러)
            if (data.retCode == "OK") {
              loadBoards(page);
              loadPagingList();
            } else {
              alert("예외발생");
            }
          });
        });
      });
  });
}
loadBoards();

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
    let next = endPage < realEnd ? false : true; // page: 현재 보고 있는 페이지 번호
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

// 등록 이벤트
document.querySelector("button#addBtn").addEventListener("click", () => {
  const title = document.querySelector("#title").value; // 입력값(제목)
  const content = document.querySelector("#content").value; // 입력값(내용)
  const writer = document.querySelector("#writer").value; // 입력값(작성자)

  // 필수값 입력
  if (!title || !content || !writer) {
    alert("필수값을 입력하세요");
    return;
  }

  // svc 메소드 활용
  svc.addBoard({ title, content, writer }, (data) => {
    // 성공
    if (data.retCode == "OK") {
      // 1페이지 목록 보여주기
      page = 1;
      loadBoards(page);
      loadPagingList();
    } else {
      alert("등록 예외");
    }
  });
});

