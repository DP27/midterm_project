function createSlot(event_slots) {
  let date = slot.date.replace("T00:00:00.000Z", "")
  const year = date.substring(0,4);
  const month = date.substring(5,7);
  const day = date.substring(8,10);

  let newDate = new Date(year, month-1, day);
  let betterDate = newDate.toString()
                   .replace(/00:00:00|GMT-0400|GMT-0500/g,"")

  let time = slot.time
  let slot_id = slot.id
  let inhtml = `<div class = "checkbox" data-like=${slot_id}>
  <label for="checkbox"> ${betterDate}${time}
  <input type="checkbox" name="event_slots" value=${slot_id}>
  </label>
  </div>`
  let slotHTML = $(".slots").append(inhtml);
  return slotHTML;
}
function createNames(name, slotId) {
  var namesHTML = $(".checkbox").filter(`[data-like='${slotId}']`).append(
                  $("<p>").text(name));
  return namesHTML;
};
function eventTitle(title) {
  let eventHTML = $(".event-info").append(
                  $("<h1>").text(title));
  return eventHTML;
};
function eventDescription(description) {
  let eventHTML = $(".event-info").append(
                  $("<p>").text(description));
  return eventHTML;
}
function eventLocation(location) {
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
    for(user of users) {
      let name = user.name;
      let slotId = user.slot_id;
      createNames(name,slotId);
    }
  })
})

