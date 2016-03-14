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
  
  var results;

  function printProducts(category) {
    
      $.ajax({
        method: "GET",
        url: "http://localhost:8001/categories/" + category + "/products",
        dataType: "json"
      })
      .done(function( msg ) {
        results = msg[0];
        $(".products-container").append(
          "<div class='filter'>" +
            "<input type='text' class='filter-input' placeholder='Filter possibility...'>" +
          "</div>"
        );

        $(".products-container").append("<ul class='products-list'></ul>");
        
        for (var element in msg) {
          $(".products-list").append(
            "<li data-id=" + msg[element]._id + ">" +
              "<input type='checkbox'>" + 
              "<span class='product-title'>" + msg[element].title + "</span>" + 
            "</li>"
          );            
        }

        prepare();  
      });
  }

  function prepare() {
    //An event which handles the filter 
    $(".filter-input").keyup(function() {
      /*check if the product title of each li matches with the filter 
       *content. If a product title doesn't match, the elememt itself will be 
       *hidden.
       */
      $("li span.product-title").each(function() {
        if(
            $(this).text().search(
              //make the research case insensitive
              new RegExp($(".filter-input").val(), "i")
            ) === -1
        ) $(this).parent().addClass("hidden"); 
        else $(this).parent().removeClass("hidden");
      });     
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
  
  var checkedProducts = [];

  $("#btn-2").click(function() {
    $("li").each(function() {
      if($(this).children("input").is(':checked')) {
        checkedProducts.push($(this).attr("data-id"));
      }
    });
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
    $("#btn-1").addClass("hidden");
    $("#btn-2").removeClass("hidden");
  });

});
