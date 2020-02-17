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
  const CityidList = [];
  const StateCitynameList = [];
  const StateidList = [];
  $('DIV.locations UL.popover H2 INPUT').change(function () {
    if ($(this).is(':checked')) {
      StateidList.push($(this).attr('data-id'));
      StateCitynameList.push($(this).attr('data-name'));
    } else {
      StateidList.splice(StateidList.indexOf($(this).attr('data-id')), 1);
      StateCitynameList.splice(StateCitynameList.indexOf($(this).attr('data-name')), 1);
    }
    $('DIV.locations H4').text(StateCitynameList);
  });
  $('DIV.locations UL.popover LI INPUT').change(function () {
    if ($(this).is(':checked')) {
      CityidList.push($(this).attr('data-id'));
      StateCitynameList.push($(this).attr('data-name'));
    } else {
      CityidList.splice(CityidList.indexOf($(this).attr('data-id')), 1);
      StateCitynameList.splice(StateCitynameList.indexOf($(this).attr('data-name')), 1);
    }
    $('DIV.locations H4').text(StateCitynameList);
  });
  $.get('http://0.0.0.0:5001/api/v1/status/?format=json', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
  const renderPlaceCard = (place) => {
    return (`
    <article>
    <div class="title">
      <h2>${place.name}</h2>
      <div class="price_by_night">
        ${place.price_by_night}
      </div>
   </div>
   <div class="information">
   <div class="max_guest">
     <i class="fa fa-users fa-3x" aria-hidden="true"></i>
     <br>
     ${place.max_guest} Guests
   </div>
   <div class="number_rooms">
     <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
     <br>
     ${place.number_rooms} Bedrooms
   </div>
   <div class="number_bathrooms">
     <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
     <br>
     ${place.number_bathrooms} Bathroom
   </div>
   </div>
   <div class="description">
   <br />
   ${place.description.replace(/<BR \/>/gi, '\n')}
   </div>
   </article>
  `);
  };
  const getPlaces = (StateidList = [], CityidList = [], idList = []) => {
    const Payload = JSON.stringify({ states: StateidList, cities: CityidList, amenities: idList });
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: Payload,
      success: function (res) {
        let i = 0;
        $('SECTION.places').empty();
        $('SECTION.places').append('<h1>Places</h1>');
        if (res.length) {
          while (i < res.length) {
            $('SECTION.places').append(renderPlaceCard(res[i]));
            i++;
          }
        }
      }
    });
  };

  getPlaces(StateidList, CityidList, idList);

  $('#btn-search').click(function () {
    getPlaces(StateidList, CityidList, idList);
  });
});
