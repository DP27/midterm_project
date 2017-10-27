$(() => {

  // DOM has loaded
  $.ajax({
    method: "GET",
    url: "/api/event_slots"
  }).done((event_slot) => {

    for(slot of event_slot) {
      $("#view-page-body").append(
        $("<article>").addClass("each-slot")
          .append($("<header>")
            .append($("<span>")
            .addClass("date")
            .text(slot.date)
            )
          )
      );
    }
  });
});


// function createSlot(event_slot) {
//   let slotHTML = $("<article").addClass("each-slot")
//                               .append("<header>")

//   `
//     <article class="each-slot">
//       <header>
//         ${ $('<span class="date">').text(midterm.event_slots.date).prop('outerHTML') }
//         <span class="time">${midterm.event_slots.time}</span>
//       </header>
//     </article>`

//   return slotHTML;
// }
