// function getCoupons() {
//   $.ajax({
//     type: 'GET',
//     url: `/api/coupon`,
//     data: {},
//     success: function (response) {
//       $('.camps').hide();
//       for (let i = 0; i < response.length; i++) {
//         let temp_html = 'aaa';
//         $('.mid').append(temp_html);
//       }
//     },
//   });
// }

// function camp_create_form() {
//   $('.camps').hide();
//   let temp_html = `
//               <div class="camps">
//                 <div>캠프 등록 페이지</div>
//                 이름 : <input type="text" id="name" placeholder="캠프명"/></br>
//                 최대인원 : <input type="number" id="headcount" placeholder="최대인원"/></br>
//                 가격 : <input type="number" id="price" placeholder="가격"/> </br>
//                 유형 : <input type="number" id="type" placeholder="유형"/></br></br>
//                 <button onclick="createCamp()">등록</button>
//                 <button onclick="location.replace('/view/management')">뒤로가기</button>
//               </div>`;
//   $('.mid').append(temp_html);
// }

function createCamp() {
  let name = $('#name').val();
  let headcount = $('#headcount').val();
  let price = $('#price').val();
  let type = $('#type').val();
  $.ajax({
    type: 'POST',
    url: `/api/camps/`,
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader('Content-Type', 'application/json');
      xhrObj.setRequestHeader('Accept', 'application/json');
    },
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      name: name,
      headcount: Number(headcount),
      price: Number(price),
      type: Number(type),
    }),
    success: function (result) {
      if (result) {
        alert('완료');
      } else {
        alert('전송된 값 없음');
      }
    },
    error: function () {
      alert('전송 실패');
    },
  });
}

function getCampById(camp) {
  let camp_id = $(camp).val();
  $.ajax({
    type: 'GET',
    url: `/api/camps/${camp_id}`,
    data: {},
    success: function (response) {
      $('.camps').hide();
      let id = response.id;
      let name = response.name;
      let headcount = response.headcount;
      let price = response.price;
      let type = response.type;
      let isRepair = response.isRepair;
      if (isRepair === false) {
        isRepair = '운영중';
      } else if (isRepair === true) {
        isRepair = '점검중';
      }
      let repairEndDate = response.repairEndDate;
      if (!repairEndDate) {
        repairEndDate = '점검중이 아닙니다.';
      }
      let temp_html = `
              <div class="camps">
                <div >번호 : ${id}</div>
                <div >이름 : ${name}</div>
                <div >최대인원 : ${headcount}</div>
                <div >가격 : ${price}</div>
                <div >유형 : ${type}</div>
                <div >상태 : ${isRepair}</div>
                <div >점검종료일 : ${repairEndDate}</div>
                <button value="${id}" onclick="camp_update_form(this)">수정하기</button>
                <button value="${id}" onclick="deleteCamp(this)">삭제하기</button>
                <button onclick="location.replace('/view/management')">뒤로가기</button>
              </div>`;
      $('.mid').append(temp_html);
    },
  });
}

function deleteCamp(camp) {
  let camp_id = $(camp).val();
  let input = prompt('삭제하시려면 "삭제합니다" 를 입력해 주세요');
  if (input === '삭제합니다') {
    $.ajax({
      type: 'DELETE',
      url: `/api/camps/${camp_id}`,
      data: {},
      success: function (result) {
        alert('삭제 완료');
        location.replace('/');
      },
      error: function () {
        alert('실패');
      },
    });
  } else {
    alert('일치하지 않습니다');
  }
}

function camp_update_form(camp) {
  let camp_id = $(camp).val();
  $.ajax({
    type: 'GET',
    url: `/api/camps/${camp_id}`,
    data: {},
    success: function (response) {
      $('.camps').hide();
      let id = response.id;
      let name = response.name;
      let headcount = response.headcount;
      let price = response.price;
      let type = response.type;
      let isRepair = response.isRepair;
      let repairEndDate = response.repairEndDate;
      let temp_html = `
              <div class="camps">
                <div id="id" value="${camp_id}">번호 : ${camp_id}</div>
                이름 : <input type="text" id="name" value="${name}"/></br>
                최대인원 : <input type="number" id="headcount" value="${headcount}"/></br>
                가격 : <input type="number" id="price" value="${price}"/> </br>
                유형 : <input type="number" id="type" value="${type}"/></br>
                점검상태 : <input type="checkbox" id="isRepair"/></br>
                점검종료일 : <input type="date" id="repairEndDate" value="${repairEndDate}"/></br>
                <button value="${id}" onclick="updateCamp(this)">수정하기</button>
                <button value="${camp_id}" onclick="getCampById(this)">뒤로가기</button>
              </div>`;
      $('.mid').append(temp_html);
    },
  });
}

function updateCamp(camp) {
  let camp_id = $(camp).val();
  let name = $('#name').val();
  let headcount = $('#headcount').val();
  let price = $('#price').val();
  let type = $('#type').val();
  let repairEndDate = $('#repairEndDate').val();
  let isRepair = document.getElementById('isRepair');
  const is_checked = isRepair.checked;
  $.ajax({
    type: 'PUT',
    url: `/api/camps/${camp_id}`,
    //   beforeSend: function(xhrObj)
    //   {
    //   xhrObj.setRequestHeader("Content-Type","application/json");
    //   xhrObj.setRequestHeader("Accept","application/json");
    // },
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      name: name,
      headcount: Number(headcount),
      price: Number(price),
      type: Number(type),
      isRepair: is_checked,
      repairEndDate: repairEndDate,
    }),
    success: function (result) {
      if (result) {
        alert('완료');
      } else {
        alert('전송된 값 없음');
      }
    },
    error: function () {
      alert('전송 완료');
      location.replace('/view/management');
    },
  });
}
