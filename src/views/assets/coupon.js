function getCoupons() {
  $.ajax({
    type: 'GET',
    url: `/api/coupon`,
    data: {},
    success: function (response) {
      $('.camps').hide();
      for (let i = 0; i < response.length; i++) {
        let temp_html = 'aaa';
        $('.mid').append(temp_html);
      }
    },
  });
}
