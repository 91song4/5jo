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

function deleteCamp(camp_id) {
  let input = prompt('삭제하시려면 "삭제합니다" 를 입력해 주세요');
  if (input === '삭제합니다') {
    $.ajax({
      type: 'DELETE',
      url: `/api/camps/${camp_id}`,
      data: {},
      success: function (result) {
        alert('삭제 완료');
        location.replace('/view/management/camp');
      },
      error: function () {
        alert('실패');
      },
    });
  } else {
    alert('일치하지 않습니다');
  }
}

function updateCamp(camp_id) {
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
        location.replace('/view/management/camp');
      } else {
        alert('전송된 값 없음');
      }
    },
    error: function () {
      alert('전송 실패');
    },
  });
}

function createCoupon() {
  let name = $('#name').val();
  let discount = $('#discount').val();
  let dateOfUse = $('#dateOfUse').val();
  let maxDiscount = $('#maxDiscount').val();
  $.ajax({
    type: 'POST',
    url: '/api/coupon',
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader('Content-Type', 'application/json');
      xhrObj.setRequestHeader('Accept', 'application/json');
    },
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      name: name,
      discount: Number(discount),
      dateOfUse: Number(dateOfUse),
      maxDiscount: Number(maxDiscount),
    }),
    success: function (result) {
      if (result) {
        alert('완료');
      } else {
        alert('전송된 값 없음');
      }
    },
    error: function (error) {
      alert('전송 실패');
      console.log(error);
    },
  });
}

function updateCoupon(coupon_id) {
  let name = $('#name').val();
  let discount = $('#discount').val();
  let dateOfUse = $('#dateOfUse').val();
  let maxDiscount = $('#maxDiscount').val();
  $.ajax({
    type: 'PUT',
    url: `/api/coupon/${coupon_id}`,
    //   beforeSend: function(xhrObj)
    //   {
    //   xhrObj.setRequestHeader("Content-Type","application/json");
    //   xhrObj.setRequestHeader("Accept","application/json");
    // },
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      name: name,
      discount: Number(discount),
      dateOfUse: Number(dateOfUse),
      maxDiscount: Number(maxDiscount),
    }),
    success: function (result) {
      if (result) {
        alert('완료');
        location.replace('/view/management/coupon');
      } else {
        alert('전송된 값 없음');
      }
    },
    error: function () {
      alert('전송 실패');
    },
  });
}

function deleteCoupon(coupon_id) {
  let input = prompt('삭제하시려면 "삭제합니다" 를 입력해 주세요');
  if (input === '삭제합니다') {
    $.ajax({
      type: 'DELETE',
      url: `/api/coupon/${coupon_id}`,
      data: {},
      success: function (result) {
        alert('삭제 완료');
        location.replace('/view/management/coupon');
      },
      error: function () {
        alert('실패');
      },
    });
  } else {
    alert('일치하지 않습니다');
  }
}

function deleteUser(id) {
  console.log(id);
  let input = prompt('삭제하시려면 "삭제합니다" 를 입력해 주세요');
  if (input === '삭제합니다') {
    $.ajax({
      type: 'DELETE',
      url: `/api/users/${id}`,
      data: {},
      success: function (result) {
        alert('삭제 완료');
        location.replace('/view/management/users');
      },
      error: function (error) {
        console.log(error);
        alert('실패');
      },
    });
  } else {
    alert('일치하지 않습니다');
  }
}

function updateUser() {
  let name = $('#name').val();
  let phone = $('#phone').val();
  let email = $('#email').val();
  let password = $('#password').val();
  let birthday = $('#birthday').val();

  const id = location.pathname.split('update/')[1];

  $.ajax({
    type: 'PUT',
    url: `/api/users/${id}`,
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      name: String(name),
      phone: String(phone),
      email: String(email),
      password: String(password),
      birthday: new Date(birthday).toISOString().slice(0, 10),
    }),

    success: function (result) {
      alert('유저정보 수정완료');

      location.replace('/view/management/users');
    },
    error: function (error) {
      console.log(error);
    },
  });
}
