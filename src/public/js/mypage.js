console.log('mypage.js');
function really() {
  if ($('#real_update_button')) {
  }
  $('#real_update_button').hide();
  let temp_html = `<button id="update-btn" onclick="real_update()" type="button" class="btn btn-outline-danger">확인</button>`;
  $('.user_form').append(temp_html);

  return document.querySelector('#update-btn');
}
function real_update() {}
function my_coupons() {}
function my_reviews() {}
function my_orders() {}
