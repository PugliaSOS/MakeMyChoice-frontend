/********* GLOBAL VARIABLES ***********/
var checkedProducts = []; //container of checked products
var sample; //A template of the products od the selected category(features)
var preferences = {}; //an object with preferences setted
var featuresName = []; // all feature names of items of specific category
var category;
/********************* Event Handler *************/
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
        $(".search_input").addClass("hidden");
        $(".title").removeClass("hidden");
        $(".title").text(ui.item.value);
        $(".autocomplete-new").remove();
        $(".overlay").css("background-color", $("body").css("background-color"));
        $(".products-container").html("");
        $()
        printProducts(ui.item.value);
        category = ui.item.value;
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
        //Save all products into sample
        sample = msg;
        $(".products-container").append(
          "<div class='filter'>" +
            "<input type='text'" + 
                   "class='filter-input'" + 
                   "placeholder='Filter possibility...'>" +
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
                  "<use xlink:href='./img/icons.svg#icon-ic-add-black-36px'>" + 
                  "</use>" +
                "</svg>" + str +
              "</li>" +
            "</ul>"
        );
    }
  });
  
  $("#btn-2").click(function() {

    /* insert all checked products into checkedProducts */
    checkedProducts = [];
    $("li").each(function() {
      if($(this).children("input").is(':checked')) {
        checkedProducts.push($(this).attr("data-id"));
      }
    });
    
    /*check if user can go to the setter page or not*/
    if(
      $(".products-container").text() !== "" 
      && 
      checkedProducts.length !== 0
    ) {

      var temp = [];
      /* add objects of sample with _id equals to checkedProducts into temp */
      for( var i in checkedProducts ) {
        var value = _.findIndex(sample, function(o) { return o._id === checkedProducts[i]; });
        if(value !== -1) {
          temp.push(sample[value]);
        } 
      }
      checkedProducts = temp;

      /* Store all features about all selected products */
      for(var i in checkedProducts) {
        var features = Object.getOwnPropertyNames(checkedProducts[i].features);
        for (var j in features) {
          if(featuresName[features[j]] === undefined) {
            featuresName[features[j]] = features[j];
          }
        }  
      }

      $(".products-container").addClass("hidden");
      $(".search-nav h1").removeClass("hidden").text("Set your preferences");
      /* print features setters */
      for( field in featuresName) {      
        $(".setter").append(
          "<div class='row'>" +
              "<div class='col-xs-4'><span>" + field + "</span></div>" +
              "<div class='col-xs-8'><input id='" + field + "' type='range' min=0 max=100></div>" + 
          "</div>"
        );
      }
      $("#btn-2").addClass("hidden");
      $("#btn-3").removeClass("hidden");
    }
  });

  $("#btn-3").click(function() {
    
    for (var i in featuresName) {
      preferences[featuresName[i]] = 
        $("#" + featuresName[i]).val(); 
    }
    console.log(category);
    console.log(preferences);
    /*
      CODE TO USE chooseTheBest
    */
    //$("#btn-2").addClass("hidden");

  });



  $("#ui-id-1").click(function(){
    $(".autocomplete-new").addClass("hidden");
  });


  
  changeBgColor = function() {
    $(".overlay").css("background-color", "rgba(128, 128, 128, 0.5)");
  };

  $(".search_input").click(function() {
    changeBgColor();
    alert(" 5 ");
  });

  $(".search_input").keyup(function() {
    changeBgColor;
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
