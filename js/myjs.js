$( document ).ready(function() {

  $(".search_input").autocomplete({ 
    appendTo: ".overlay",
    source: ['Tv','Cellulari','Computer','Tablet','T-Shirt'],
    minLength:1,
  }); 

  $(".search_input").keyup(function() {
    $(".autocomplete-new").remove();
<<<<<<< Updated upstream
    var str = $(".search_input").val();
    $(".ui-helper-hidden-accessible").addClass("hidden");
    $("#ui-id-1").removeClass("hidden");
    var items = $("#ui-id-1 li");
    var listItems = [];
    items.text(function(index, name) {
      listItems[name] = name;
    });
    strHasBeenInitialized = (str[0] >= 'a' && str[0] <= 'z') || (str[0] >= 'A' && str[0] <= 'Z');
    if(strHasBeenInitialized && listItems[str] == undefined) {
        $(".overlay").append("<ul class='ui-autocomplete ui-menu autocomplete-new'><li><span class='icon-plus'>+</span>"+str+"</li></ul>");
    } else {
        $("#ui-id-1").addClass("hidden");
    }
=======
    var str = $( ".search_input" ).val();
    $(".overlay").append("<ul class='ui-autocomplete ui-menu autocomplete-new'><li><span class='icon-plus'>+</span>"+str+"</li></ul>");
>>>>>>> Stashed changes
  });
  
  $(".search").click(function() {
	  $(".title").addClass("hidden");
  	$(".search_bar").removeClass("hidden");
    $(".search_input").attr("id", "search_input");
    $("#search_input").focus();
  	$(".overlay").css("background-color", "rgba(128, 128, 128, 0.5)");
  });

});
