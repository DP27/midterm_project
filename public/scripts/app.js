// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });


$(document).ready(function getlocation(){

      $('#location').on('click',function(){
          let locationText = $(document).find('.location-placeholder').val();
          getLatLng(locationText);
      })

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


<<<<<<< HEAD

=======
// $("#create").click(function() {
//     window.location.href='/create';
// })
27479c8e82d360ccab2ac857777cefd1d982b3b5
>>>>>>> 50114b270f685ada6263efd9b07cd795f77a2807
