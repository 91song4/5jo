// const socketUserId = localStorage.getItem('userId');
// const socket = io('ws://127.0.0.1:8080', {
//   query: { user: socketUserId, namespace: 'chatting' },
// });

/**
 * 프론트에서 접속을 해서 네임스페이스와, 유저아이디, 이름, 어드민 여부를 준다.
 * 네임스페이스 - 페이지 구분을 위해 필요.
 *  예약페이지 - 페이지 접속중인 인원 체크 (단일기능)
 *  채팅페이지 - 이름, 어드민여부
 *
 * 유저아이디 - 왜 필요? 지금은 필요없나?
 * 이름 - 채팅창에서 채팅닉네임이 필요하기 때문에 필요함 그리고 채팅페이지에서만 사용하기때문에 채팅페이지에서만 필요
 * 어드민여부 - 채팅창에서 관리자구분(채팅 닉네임 색), 입/퇴장 시 메세지출력 때문에 필요
 */

// 소켓 접속
// socket.on('message', (data) => {
//   console.log('front socket message on: ', data.message);

//   const LR = data.id === socket.id ? 'right' : 'left';

//   const chatLi = document
//     .querySelector('div.chat.format ul li')
//     .cloneNode(true);

//   chatLi.classList.add(LR);

//   const fontColor = data.admin ? 'red' : 'white';
//   chatLi.querySelector('.sender span').textContent = data.senderName;
//   chatLi.querySelector('.sender span').style.color = fontColor;
//   chatLi.querySelector('.message span').textContent = data.message;
//   document.querySelector('div.chat:not(.format) ul').append(chatLi);
//   document.querySelector('div.chat').scrollTop =
//     document.querySelector('div.chat').scrollHeight;
// });

// socket.on('joinAdmin', () => {
//   console.log('joinAdmin');
//   const chatLi = document
//     .querySelector('div.chat.format ul li')
//     .cloneNode(true);
//   chatLi.querySelector('.sender span').style.color = 'black';
//   chatLi.querySelector('.message span').textContent =
//     '관리자가 입장하였습니다.';
//   document.querySelector('div.chat:not(.format) ul').append(chatLi);
// });

// socket.on('exitAdmin', () => {
//   console.log('exitAdmin');
//   const chatLi = document
//     .querySelector('div.chat.format ul li')
//     .cloneNode(true);
//   chatLi.querySelector('.sender span').style.color = 'black';
//   chatLi.querySelector('.message span').textContent =
//     '관리자가 퇴장하였습니다.';
//   document.querySelector('div.chat:not(.format) ul').append(chatLi);
// });
