// DEMO ONLY
var style_toggle = "closed";
 
jQuery(document).ready(function() { 
 
	jQuery(".style_picker_toggle").click(function(){
		if(style_toggle == "closed"){
			jQuery("#style_picker").stop(true, true).animate({left : "0px"}, 300, "linear", function(){
				style_toggle = "open";
				jQuery(".style_picker_toggle").addClass("style_picker_toggle_open");
			});
		};
		if(style_toggle == "open"){
			jQuery("#style_picker").stop(true, true).animate({left : "-147px"}, 300, "linear", function(){
				style_toggle = "closed";
				jQuery(".style_picker_toggle").removeClass("style_picker_toggle_open");
			});
		};
		return false;
    });

	// Drop Down Menu
	jQuery("ul#main-menu").superfish({ 
        delay:       0,
        animation:   {opacity:'show',height:'show'},
        speed:       'fast',
        autoArrows:  true,
        dropShadows: true
    });

	// Accordion
	jQuery(".accordion").accordion( { autoHeight: false } );

	// Toggle
	jQuery(".toggle > .inner").hide();
	jQuery(".toggle .title").toggle(function(){
		jQuery(this).addClass("active").closest('.toggle').find('.inner').slideDown(200, 'easeOutCirc');
	}, function () {
		jQuery(this).removeClass("active").closest('.toggle').find('.inner').slideUp(200, 'easeOutCirc');
	});

	// Tabs
	jQuery(function() {
		jQuery("#tabs").tabs();
	});
	
	// Gallery Hover Effect
	jQuery(".gallery-item .gallery-thumbnail .zoom-wrapper").hover(function(){		
		jQuery(this).animate({ opacity: 1 }, 300);
	}, function(){
		jQuery(this).animate({ opacity: 0 }, 300);
	});
	
	// PrettyPhoto
	jQuery(document).ready(function(){
		jQuery("a[rel^='prettyPhoto']").prettyPhoto();
	});

	// Mobile Menu

	// Create the dropdown base
	//jQuery("<select />").appendTo(".nav-wrapper");
      
	//// Create default option "Go to..."
	//jQuery("<option />", {
	//	"selected": "selected",
	//	"value"   : "",
	//	"text"    : goText
	//}).appendTo(".nav-wrapper select");
      
	// Populate dropdown with menu items
	jQuery("#mobile-menu a").each(function() {
		var el = jQuery(this);
		jQuery("<option />", {
			"value"   : el.attr("href"),
			"text"    : el.text()
		}).appendTo(".nav-wrapper select");
	});
	
	// To make dropdown actually work
	jQuery(".nav-wrapper select").change(function() {
		window.location = jQuery(this).find("option:selected").val();
	});
	
	// Datepicker
	jQuery(".datepicker").datepicker();
	
	var map_toggle  = "closed";
	
	// Google Map Slide Down
	jQuery(".gmap-btn").click(function(){
		
		jQuery('#header-google-map').slideToggle('slow');
		
		if (!map) {
			initialize();
		}
		
		jQuery('.gmap-btn').toggleClass('gmap-btn-hover');
		
	});
	
	// Google Map Display
	var map = null;
	
	function initialize() {
		var latlng = new google.maps.LatLng(mapLat,mapLng);
		var myOptions = {
			zoom: 15,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: true,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
			}
		};

		map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
		var contentString = '<div class="gmap-content">'+mapContent+'</div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		var marker = new google.maps.Marker({
			position: latlng, 
			map: map
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});

	}
	
	// Booking Form Validation
	jQuery(".booking-validation").submit(function() {
		if ( jQuery("#room").val() == "none" ) {
			jQuery("#room").effect("pulsate", { times:3 }, 250);
			alert(msgSelectRoom);
			return false;
		}
		
		if (jQuery("#datefrom").val() == "From") {
			jQuery("#datefrom").effect("pulsate", { times:3 }, 250);
			alert(msgSelectArrDate);
			return false;
		}
		
		if (jQuery("#dateto").val() == "To") {
			jQuery("#dateto").effect("pulsate", { times:3 }, 250);
			alert(msgSelectDepDate);
			return false;
		}
		
		if ( jQuery("#datefrom").val() == jQuery("#dateto").val() ) {
			jQuery("#datefrom").effect("pulsate", { times:3 }, 250);
			jQuery("#dateto").effect("pulsate", { times:3 }, 250);
			alert(msgArrDepMatch);
			return false;
		}
		
		var dateFrom = Date.parse(jQuery("#datefrom").val());
        var dateTo = Date.parse(jQuery("#dateto").val());
		
		if ( dateTo < dateFrom ) {
			jQuery("#datefrom").effect("pulsate", { times:3 }, 250);
			jQuery("#dateto").effect("pulsate", { times:3 }, 250);
			alert(msgDepBeforeArr);
			return false;
		}	
		
		return true;
	});
	
	// Booking Form Validation (Widget)
	jQuery(".booking-validation-widget").submit(function() {
		if ( jQuery("#room_widget").val() == "none" ) {
			jQuery("#room_widget").effect("pulsate", { times:3 }, 250);
			alert(msgSelectRoom);
			return false;
		}
		
		if (jQuery("#datefrom_widget").val() == "From") {
			jQuery("#datefrom_widget").effect("pulsate", { times:3 }, 250);
			alert(msgSelectArrDate);
			return false;
		}
		
		if (jQuery("#dateto_widget").val() == "To") {
			jQuery("#dateto_widget").effect("pulsate", { times:3 }, 250);
			alert(msgSelectDepDate);
			return false;
		}
		
		if ( jQuery("#datefrom_widget").val() == jQuery("#dateto_widget").val() ) {
			jQuery("#datefrom_widget").effect("pulsate", { times:3 }, 250);
			jQuery("#dateto_widget").effect("pulsate", { times:3 }, 250);
			alert(msgArrDepMatch);
			return false;
		}
		
		var dateFromWidget = Date.parse(jQuery("#datefrom_widget").val());
        var dateToWidget = Date.parse(jQuery("#dateto_widget").val());
		
		if ( dateToWidget < dateFromWidget ) {
			jQuery("#datefrom_widget").effect("pulsate", { times:3 }, 250);
			jQuery("#dateto_widget").effect("pulsate", { times:3 }, 250);
			alert(msgDepBeforeArr);
			return false;
		}	
		
		return true;
	});
		
});

// Slider
jQuery(window).load(function(){
	
	jQuery('.slider').flexslider({
		animation: "slide",
		controlNav: false
	});
	
	jQuery(".slider .booknow").removeClass("jshide");
	jQuery(".slider .booknow").hide().fadeIn('slow');

});
