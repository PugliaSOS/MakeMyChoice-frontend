$(".search_input").click(function() {
  $(".search_input").val("");
  $("body").css("background-color", "#808080");
  $(".container-fluid").css("opacity", "0.3");
});

$(".container-fluid").click(function() {
  $(".search_input").val("MakeMyChoice");
  $("body").css("background-color", "#FFFFFF");
  $(".container-fluid").css("opacity", "1");
});