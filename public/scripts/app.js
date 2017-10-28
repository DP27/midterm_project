function createDateTime() {
  let button = $("<button>").attr('type', "button")
                            .addClass("btn delete-slot")
                            .text("-")

  let newTimeSlot = $("<section>").addClass("timeslot form-group").append(
    $("<input>").attr('id', "date")
                .attr('name', "dateslot")
                .attr('type', "date")
                .addClass("form-control")
    ).append($("<input>").attr('id', "time")
                         .attr('name', "timeslot")
                         .attr('type', "time")
                         .addClass("form-control")
    ).append(button)

  $('.timeslots').append(newTimeSlot);

  button.on('click', function() {
    newTimeSlot.remove()
  })
}

$(document).ready(
  
function getlocation(){
      $('#location').on('click',function(){
          let locationText = $(document).find('.address').val();
          console.log(locationText);
          getLatLng(locationText);
      })
      $('#add-slot').on('click', createDateTime);   
  });

  function getLatLng(locationText){
    var geocoder = new google.maps.Geocoder();
    var address = locationText;

    if (geocoder) {
       geocoder.geocode({ 'address': address }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            let lat = results[0].geometry.location.lat();
            let lng = results[0].geometry.location.lng();
            var uluru = {lat: lat, lng: lng};
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 13,
              center: uluru
            });
            var marker = new google.maps.Marker({
              position: uluru,
              map: map
            });
            return;
          }
          else {
             console.log("Geocoding failed: " + status);
          }
       });
    }
  }


