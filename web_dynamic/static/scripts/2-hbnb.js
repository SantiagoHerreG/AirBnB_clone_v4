$(document).ready(function () {
  const idList = [];
  const nameList = [];
  $('DIV.amenities LI input').change(function () {
    if ($(this).is(':checked')) {
      idList.push($(this).attr('data-id'));
      nameList.push($(this).attr('data-name'));
    } else {
      idList.splice(idList.indexOf($(this).attr('data-id')), 1);
      nameList.splice(nameList.indexOf($(this).attr('data-name')), 1);
    }
    $('DIV.amenities H4').text(nameList);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/?format=json', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
