function createSlot(event_slot) {
  let slotHTML = $(".slots").append(
          $("<article>").addClass("each-slot")
            .append($("<header>")
            .append($("<span>")
            .addClass("date")
            .text(slot.date)
            )
            .append($("<span>")
            .addClass("time")
            .text(slot.time)
            )
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
  // DOM has loaded
  $.ajax({
    method: "GET",
    url: "/api/event_slots/" + eventId
  }).done((event_slot) => {

    for(slot of event_slot) {
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

  $('.slot-names').hide();
  $('each-slot').click(function() {
    $('.slot-names').slideToggle();
  });


});
