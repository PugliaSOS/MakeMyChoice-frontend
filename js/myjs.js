$( document ).ready(function() {
  
  $.ajax({
    method: "GET",
    url: "http://localhost:8001/categories",
    dataType: "json"
  })
  .done(function( msg ) {
    $(".search_input").autocomplete({ 
      appendTo: ".autocomplete-section",
      source: msg,
      select: function( event, ui ) {
        $(".autocomplete-new").remove();
        $(".search_input").val(ui.item.value);
        $(".search_input").removeAttr("autofocus");
        $(".overlay").css("background-color", $("body").css("background-color"));
        $(".products-container").html("");
        printProducts(ui.item.value);
        return false;
      },
      minLength:1
    }); 
  });

  function printProducts(category) {
      $.ajax({
        method: "GET",
        url: "http://localhost:8001/categories/" + category + "/products",
        dataType: "json"
      })
      .done(function( msg ) {
        console.log(msg);
        $(".products-container").append(
          "<div class='filter'>" +
            "<input type='text' placeholder='Filter possibility...'>" +
          "</div>"
        );

        $(".products-container").append("<ul class='products-list'></ul>");
        
        for (var element in msg) {
          $(".products-list").append(
            "<li>"+
              "<input type='checkbox' id='" +msg[element]._id + "'>" + 
               msg[element].title + 
            "</li>"
          );            
        }
        
      });
  }

  

  $(".search_input").keyup(function() {
    $(".autocomplete-new").remove();
    var str = $(".search_input").val();
    $(".ui-helper-hidden-accessible").addClass("hidden");
    var items = $("#ui-id-1 li");
    var listItems = [];
    items.text(function(index, name) {
      listItems[name.toLowerCase()] = name.toLowerCase();
    });

    strHasBeenInitialized = (str[0] >= 'a' && str[0] <= 'z') || 
                            (str[0] >= 'A' && str[0] <= 'Z');

    if(strHasBeenInitialized && listItems[str.toLowerCase()] == undefined) {
        $(".autocomplete-section").append(           
            "<ul class='ui-autocomplete ui-menu autocomplete-new'>" + 
              "<li class='ui-menu-item'>" +
                "<svg class='icon-ic-add-black-36px'>" +
                  "<use xlink:href='./img/icons.svg#icon-ic-add-black-36px'></use>" +
                "</svg>" + str +
              "</li>" +
            "</ul>"
        );
    }
  });
  
  $("#ui-id-1").click(function(){
    $(".autocomplete-new").addClass("hidden");
  });
  
  changeBgColor = function() {
    $(".overlay").css("background-color", "rgba(128, 128, 128, 0.5)");
  };

  $(".search_input").click(changeBgColor);
  $(".search_input").keyup(function() {
    changeBgColor;
    $( "body" ).css( "background-image" , "url('../img/logo.png')" );
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
