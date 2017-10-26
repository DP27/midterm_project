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

})

function getLatLng(locationText){
    var geocoder = new google.maps.Geocoder();
    var address = locationText;
 
    if (geocoder) {
       geocoder.geocode({ 'address': address }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            let lat = results[0].geometry.location.lat();
            let lng = results[0].geometry.location.lng();
            
             console.log(results[0].geometry.location.lat());
             console.log(results[0].geometry.location.lng());
             let arr = [lat,lng];
             retlatlng(arr);
             return arr;
          }
          else {
             console.log("Geocoding failed: " + status);
          }
       });
    }    

}

function retlatlng(arr){
    if(arr[0]){
        let dir = {lat: arr[0],lng: arr[1]};
        console.log(dir);
        return dir;
    }

}




