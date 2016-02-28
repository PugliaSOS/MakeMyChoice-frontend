$( document ).ready(function() {

  $(".search_input").autocomplete({ 
    appendTo: ".overlay",
    source: ['Tv','Cellulari','Computer','Tablet','T-Shirt'],
    minLength:1,
  }); 

  $(".search_input").keyup(function() {
    $(".autocomplete-new").remove();
    var str = $(".search_input").val();
    $(".ui-helper-hidden-accessible").addClass("hidden");
    var items = $("#ui-id-1 li");
    var listItems = [];
    items.text(function(index, name) {
      listItems[name.toLowerCase()] = name.toLowerCase();
    });
    strHasBeenInitialized = (str[0] >= 'a' && str[0] <= 'z') || (str[0] >= 'A' && str[0] <= 'Z');
    if(strHasBeenInitialized && listItems[str.toLowerCase()] == undefined) {
        $(".overlay").append("<ul class='ui-autocomplete ui-menu autocomplete-new'><li><svg class='icon-ic-add-black-36px'><use xlink:href='./img/icons.svg#icon-ic-add-black-36px'></use></svg>"+str+"</li></ul>");
    }
  });
  
  $("#ui-id-1").click(function(){
    $(".autocomplete-new").addClass("hidden");
  });
  
  $(".search").click(function() {
	  $(".title").addClass("hidden");
  	$(".search_bar").removeClass("hidden");
    $(".search_input").attr("id", "search_input");
    $("#search_input").focus();
  	$(".overlay").css("background-color", "rgba(128, 128, 128, 0.5)");
    $("use").attr("xlink:href", "./img/icons.svg#icon-logo-black");
  });

});
