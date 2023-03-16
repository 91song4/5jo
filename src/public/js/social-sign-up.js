// const signupBtn = document.querySelector('#social-signup-btn');

// // 아이디 체크 버튼

// signupBtn.addEventListener('click', async () => {
//   try {
//     if (!phone.value || !birthday.value) {
//       return alert('입력이 안된 값이 있습니다.');
//     }

//     axios
//       .post(`/api/auth/social-sign-up`, {
//         userId: userId,
//         password: 'social_login',
//         name: $('#name').val(),
//         email: $('#email').val(),
//         phone: $('#phone').val(),
//         birthday: $('#birthday').val(),
//         socialType: socialType,
//       })
//       .then((response) => {
//         console.log(response.data);
//         if (response?.status === 201) {
//           window.location.href = '/view/login';
//         }
//       })
//       .catch((error) => {
//         alert('회원가입에 실패하였습니다.');
//         console.log(error.request.response);
//       });
//   } catch (error) {
//     console.error(error.messgae);
//   }
// });
