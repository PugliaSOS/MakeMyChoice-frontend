$( document ).ready(function() {

  $(".search").click(function() {
	$(".title").addClass("hidden");
  	$(".search_input").removeClass("hidden");
  	$(".container-fluid").css("opacity", "0.3");
  });

  $(".container-fluid").click(function() {
    $(".search_input").addClass("hidden");
    $(".title").removeClass("hidden")
  	$(".container-fluid").css("opacity", "1");
  });
});