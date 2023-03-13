const socket = io('ws://127.0.0.1:8080');

// 소켓 접속
socket.on('connect', () => {
  console.log(`socket 작성중!!`);
});

socket.on('close', () => {
  console.log(`접속해제`);
});

socket.on('message', (data) => {
  console.log('front socket message on: ', data.message);

  const LR = data.senderName === socket.id ? 'right' : 'left';

  const chatLi = document
    .querySelector('div.chat.format ul li')
    .cloneNode(true);

  chatLi.classList.add(LR);
  chatLi.querySelector('.sender span').textContent = data.senderName;
  chatLi.querySelector('.message span').textContent = data.message;
  document.querySelector('div.chat:not(.format) ul').append(chatLi);
  document
    .querySelector('div.chat')
    .scrollTop(document.querySelector('div.chat').prop('scrollHeight'));
});
