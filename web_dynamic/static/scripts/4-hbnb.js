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
    console.log(idList);
    $('DIV.amenities H4').text(nameList);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/?format=json', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
  const renderPlaceCard = (place) => {
    const { name, pricebynight, maxguest, numberrooms, numberbathrooms, description } = place;

    return (`
    <article>
    <div class="title">
      <h2>${name}</h2>
      <div class="price_by_night">
        ${pricebynight}
      </div>
   </div>
   <div class="information">
   <div class="max_guest">
     <i class="fa fa-users fa-3x" aria-hidden="true"></i>
     <br>
     ${maxguest} Guests
   </div>
   <div class="number_rooms">
     <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
     <br>
     ${numberrooms} Bedrooms
   </div>
   <div class="number_bathrooms">
     <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
     <br>
     ${numberbathrooms} Bathroom
   </div>
   </div>
   <div class="user">
   <strong>Owner: John Hooten</strong>
   </div>
   <div class="description">
   ${description.replace(/<BR \/>/gi, '\n')}
   </div>
   </article>
  `);
  };
  const getPlaces = (idList = []) => {
    const amenitiesPayload = JSON.stringify({ 'amenities': idList });
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: amenitiesPayload,
      success: function (res) {
        let i = 1;
        if (res.length) {
          $('SECTION.places').empty();
          $('SECTION.places').append('<h1>Places</h1>');

          while (i < res.length) {
            $('SECTION.places').append(renderPlaceCard(res[i]));
            i++;
          }
        } else {
          $('SECTION.places article').remove();
        }
      }
    });
  };

  getPlaces(idList);

  $('#btn-search').click(function () {
    console.log('Click from btn search');
    getPlaces(idList);
  });
});
