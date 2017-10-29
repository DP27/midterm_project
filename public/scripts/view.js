
function createSlot(event_slots) {
  let date = slot.date.replace("T00:00:00.000Z", "")
  let time = slot.time
  let slot_id = slot.id

  let slotHTML = $(".slots").append(
    $("<div>").addClass("checkbox")
      .append($("<label>").text(date + " " + time)
      .append($("<input>")
      .attr({type: "checkbox", name: "event_slots", value: slot_id}))))         
  return slotHTML
}

function createNames(name) {
  let namesHTML = $(".checkbox").append(
                  $("<p>").text(name));
  return namesHTML;
};

function eventTitle(title) {
  let eventHTML = $(".event-info").append(
                  ($("<h1>").text(title)))
  return eventHTML;
};

function eventDescription(description) {
  let eventHTML = $(".event-info").append(
                  ($("<p>").text(description)))
  return eventHTML;
}

function eventLocation(location){
  var geocoder = new google.maps.Geocoder();
  var address = location;

  if (geocoder) {
      geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          let lat = results[0].geometry.location.lat();
          let lng = results[0].geometry.location.lng();
          var uluru = {lat: lat, lng: lng};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: uluru
          })
          var marker = new google.maps.Marker({
            position: uluru,
            map: map
          }) 
          return
        }
      })
  }
}


$(() => {
  var eventId = $("#event-id").text();
  $("#event-id").hide();

  $.ajax({
    method: "GET",
    url: "/api/event_slots/" + eventId
  }).done((event_slots) => {   
      for(slot of event_slots) {
      createSlot(slot);
    }
  })  

  $.ajax({
    method: "GET",
    url: "/api/load_event/" + eventId
  }).done((event) => {
    let title = event[0].title;
    let description = event[0].description;
    let location = event[0].location;

    eventTitle(title);
    eventDescription(description);
    eventLocation(location);
  })

  $.ajax({
    method: "GET",
    url: "/api/votes/" + eventId
  }).done((users) => {
    const arr = {};

    users.forEach(function(user) {
      arr[user.slot_id] = arr[user.slot_id] || [];
      arr[user.slot_id].push(user); 
    });
    for(element in arr) {
      console.log(arr[element]);
    }
    //console.log(arr);
  })
})
//createNames(user.name);