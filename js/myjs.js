$( document ).ready(function() {

  $(".search").click(function() {
	$(".title").addClass("hidden");
  	$(".search_input").removeClass("hidden");
  	$("body").css("background-color", "#808080");
  	$(".container-fluid").css("opacity", "0.3");
  });

  $(".container-fluid").click(function() {
    $(".search_input").addClass("hidden");
    $(".title").removeClass("hidden")
  	$("body").css("background-color", "#FFFFFF");
  	$(".container-fluid").css("opacity", "1");
  });
});