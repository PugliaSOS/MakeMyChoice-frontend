$( document ).ready(function() {

  $(".search_input").autocomplete({ 
    appendTo: ".overlay",
    source: ['Tv','Cellulari','Computer','Tablet','TV','T-Shirt'],
    minLength:1,
  }); 

  $(".search_input").keyup(function() {
    $(".autocomplete-new").remove();
    var str = $( ".search_input" ).val();
    $(".overlay").append("<ul class='ui-autocomplete ui-menu autocomplete-new'><li><span class='icon-plus'>+</span>"+str+"</li></ul>");

  });
  
  $(".search").click(function() {
	  $(".title").addClass("hidden");
  	$(".search_bar").removeClass("hidden");
    $(".search_input").attr("id", "search_input");
    $("#search_input").focus();
  	$(".overlay").css("background-color", "rgba(128, 128, 128, 0.5)");
  });

});
