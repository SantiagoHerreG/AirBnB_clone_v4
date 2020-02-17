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
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (res) {
      let i = 1;
      const dic = {};
      if (res.length) {
        dic[0] = $('SECTION.places article').clone();
        $('SECTION.places article h2').text(res[0].name);
        $('SECTION.places article .price_by_night').text(res[0].price_by_night);
        $('SECTION.places article div.max_guest br').after(res[0].max_guest + ' Guests');
        $('SECTION.places article div.number_rooms br').after(res[0].number_rooms + ' Bedrooms');
        $('SECTION.places article div.number_bathrooms br').after(res[0].number_bathrooms + ' Bathroom');
        $('SECTION.places article .description').text(res[0].description.replace(/<BR \/>/gi, '\n'));
        $('SECTION.places article .information').after('<br />');

        while (i < res.length) {
          dic[i] = dic[0].clone();
          dic[i].find('h2').text(res[i].name);
          dic[i].find('.price_by_night').text(res[i].price_by_night);
          dic[i].find('div.max_guest br').after(res[i].max_guest + ' Guests');
          dic[i].find('div.number_rooms br').after(res[i].number_rooms + ' Bedrooms');
          dic[i].find('div.number_bathrooms br').after(res[i].number_bathrooms + ' Bathroom');
          dic[i].find('.description').text(res[i].description.replace(/<BR \/>/gi, '\n'));
          dic[i].find('.information').after('<br />');
          $('SECTION.places').append(dic[i]);
          i++;
        }
      } else {
        $('SECTION.places article').remove();
      }
    }
  });
});
