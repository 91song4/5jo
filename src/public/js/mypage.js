// 데이터
const mypageName = document.querySelector('#mypage-name');
const mypageEmail = document.querySelector('#mypage-email');
const mypagePhone = document.querySelector('#mypage-phone');
const mypageBirthday = document.querySelector('#mypage-birthday');
const mypagePassword = document.querySelector('#mypage-password');
const mypageInputs = document.querySelectorAll('input');

mypageInputs.forEach((input) => (input.disabled = true));

// 버튼
const mypageWithdrawalBtn = document.querySelector('#mypage-withdrawal');
const realUpdateBtn = document.querySelector('#real_update_button');
const getMyCoupons = document.querySelector('#get-my-coupons');
const getMyReviews = document.querySelector('#get-my-reviews');
const getMyOrders = document.querySelector('#get-my-orders');

realUpdateBtn.addEventListener('click', () => {
  const updateBtn = really();
  mypageInputs.forEach((input) => {
    if (input.id !== 'mypage-birthday') {
      input.disabled = false;
    }
  });

  updateBtn.addEventListener('click', () => {
    const userId = localStorage.getItem('userId');
    try {
      if (mypagePassword.value === '') {
        alert('비밀번호를 입력하지 않았습니다.');
        return (window.location.href = `/view/mypage`);
      }
      axios
        .put(`/api/users`, {
          name: mypageName.value,
          phone: mypagePhone.value,
          email: mypageEmail.value,
          password: mypagePassword.value,
        })
        .then((response) => {
          alert('유저정보 업데이트 완료');
          window.location.href = `/view/mypage`;
        })
        .catch((error) => alert(error.response.data.message));
    } catch (error) {
      console.error(error.message);
    }
  });
});

mypageWithdrawalBtn.addEventListener('click', () => {
  try {
    axios
      .delete('/api/auth/withdrawal')
      .then((response) => {
        localStorage.clear();
        window.location.href = '/';
      })
      .catch((error) => alert(error.response.data.message));
  } catch (error) {
    console.erroe(error.message);
  }
});

function really() {
  if ($('#real_update_button')) {
  }
  $('#real_update_button').hide();
  let temp_html = `<button id="update-btn" onclick="real_update()" type="button" class="btn btn-outline-danger">확인</button>`;
  $('.user_form').append(temp_html);

  return document.querySelector('#update-btn');
}
