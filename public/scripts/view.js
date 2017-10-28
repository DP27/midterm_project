
function createSlot(event_slots) {
  let date = slot.date.replace("T00:00:00.000Z", "")
  let time = slot.time

  let slotHTML = $(".slots").append(
          $("<div>").addClass("checkbox")
            .append($("<label>")
            .append($("<input>")
            .attr('type', "checkbox")
            .attr('name', "event_slots")
            ).text(date + " " + time)
          )
      );

  return slotHTML;
}

function createNames(user) {
  let namesHTML = $(".names").append(
                  $("<p>").addClass("slot-names")
                  .text(user.name)
                  );
  return namesHTML;
};


$(() => {
  var eventId = $("#event-id").text();
  $("#event-id").hide();
  // DOM has loaded
  $.ajax({
    method: "GET",
    url: "/api/event_slots/" + eventId
  }).done((event_slots) => {

    for(slot of event_slots) {
      createSlot(slot);
    }
  });

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {

    for(user of users) {
      createNames(user);
    }
  });

  $('.names').hide();
  $('.slots').click(function() {
    $('.names').slideToggle();
  });


});
