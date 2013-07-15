var infowindow,
marker,
markerContent,
map,
user_data,
tmarker;

$(document).ready(function(){
  if (localStorage.getItem('visited') == undefined)
    $('#myModal').modal();
 
  $(document.body).click(function(){
     $('#myModal').modal('hide');
     localStorage["visited"] = true;
    
  });

  $('.link-proyecto').click(function(e){
     e.preventDefault();
     $('#myModalProyecto').modal();
  });

  locate(null);
  
  $('input').change(function() {
    updateMarkerContent();
    infowindow.open(map, marker);
    marker.setAnimation(null);
  });
  
  $('#new_happy_moment').submit(function(e){
     
     // setup some local variables
      var $form = $(this);
      // let's select and cache all the fields
      var $inputs = $form.find("input, select, button, textarea");
      // serialize the data in the form
      var serializedData = $form.serialize();

      // let's disable the inputs for the duration of the ajax request
      $inputs.prop("disabled", true);

      // fire off the request to /form.php
      request = $.ajax({
          url: "/happy_moments",
          type: "post",
          data: serializedData
      });

      // callback handler that will be called on success
      request.done(function (response, textStatus, jqXHR){
          // log a message to the console
          console.log("Hooray, it worked!");
      });

      // callback handler that will be called on failure
      request.fail(function (jqXHR, textStatus, errorThrown){
          // log the error to the console
          console.error(
              "The following error occured: "+
              textStatus, errorThrown
          );
      });

      // callback handler that will be called regardless
      // if the request failed or succeeded
      request.always(function () {
          // reenable the inputs
          $inputs.prop("disabled", false);
      });

      e.preventDefault();
      $("#happy_content").val("");
  });

});


function create_moment(){

}

function loadMarkers(){
  if (h_moments && h_moments.length){
    for (var i = h_moments.length - 1; i >= 0; i--) {

      tmarker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(h_moments[i][1]),parseFloat(h_moments[i][2])),
        map: map,
        animation: google.maps.Animation.DROP,
        icon: "/assets/pin.png"
      });

      google.maps.event.addListener(tmarker, 'click', (function(tmarker, i) {
        return function() {
          infowindow.setContent(createMarkerContent(h_moments[i][0]));

          !function(d,s,id){
            var js,fjs=d.getElementsByTagName(s)[0];
            if(!d.getElementById(id)){
              js=d.createElement(s);js.id=id;
              js.src="https://platform.twitter.com/widgets.js";
              fjs.parentNode.insertBefore(js,fjs);
            }
          }
          (document,"script","twitter-wjs");

          infowindow.open(map, tmarker);
        }
      })(tmarker, i));

    };
  }
}

function initialize(lat,lon) {
  var centerMap = new google.maps.LatLng(lat,lon);
  var style = getStyle();
  var mapOptions = {
    zoom: 12,
    center: centerMap,
    panControl: false,
    zoomControl: false,
    scaleControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles:style
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  infowindow = new google.maps.InfoWindow();
  var overlay = new google.maps.OverlayView();
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });
  placeMarker(centerMap);
  marker.setAnimation(google.maps.Animation.BOUNCE);
  loadMarkers();
}

function getStyle(){
    return map_style_night;
}

function placeMarker(location) {
  if ( marker ) {
    marker.setPosition(location);
    marker.getMap().panTo(marker.position);
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP,
      draggable: true,
      icon:"assets/pin2.png"
    });
    addListeners(marker);
  }
  updateMarkerContent();
  updateLatLng();
}

function addListeners(marker){
  google.maps.event.addListener(marker, "click", function () {
      updateMarkerContent();
      !function(d,s,id){
      var js,fjs=d.getElementsByTagName(s)[0];
      if(!d.getElementById(id)){
        js=d.createElement(s);js.id=id;
        js.src="https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js,fjs);
      }
    }
    (document,"script","twitter-wjs");
      infowindow.open(map, this);
  });

  google.maps.event.addListener(marker, 'dragstart', function(){ 
    showDragMessage(marker.title);
  });

  google.maps.event.addListener(marker, 'drag', function(){ 
    
  });

  google.maps.event.addListener(marker, 'dragend', function(){ 
    marker.getMap().panTo(marker.position);
    hideDragMessage();
    updateLatLng();
    
  });
}

function updateLatLng(){
   $('#happy_lat').val(marker.getPosition().lat());
   $('#happy_lon').val(marker.getPosition().lng());
}

function updateMarkerContent(){
  markerContent = retrieveMarkerContent();  
  marker.setTitle(markerContent);
  var html = createMarkerContent(markerContent);
  infowindow.setContent(html);
  
}

function createMarkerContent(markerContent){
  var content;

  if (markerContent && markerContent!="" && markerContent!='undefined'){
    content=markerContent;
  }else{
    content = "";
  }

  return '<div id="infowindow">'+'<p>'+content+'</p>'+
  "<a href=\"https://twitter.com/intent/tweet?button_hashtag=FeliciMAP&text="+escape(content)+"\" class=\"twitter-hashtag-button\" data-lang=\"en\" data-related=\"jasoncosta\">Tweet #TwitterStories</a>"+
  '</div>';

}

function retrieveMarkerContent(){
  return ($('#happy_content').val())
}


var map_style_night = [
  {
    stylers: [
      { hue: "#ff0000" },
      { saturation: -100 }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "on" },
      { lightness: 60 }
    ]
  },{
    featureType: "poi",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "transit.station.rail",
    elementType: "labels",
    stylers: [
      { lightness: 45 }
    ]
  },{
  },{
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      { visibility: "on" },
      { lightness: 50 }
    ]
  },{
    featureType: "transit.line",
    stylers: [
      { visibility: "off" }
    ]
  },{
  }
];


var geocoder;
var c = 0;
function locate(success){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locked, notfound);
  }else{
    console.log("Geocoder not supported");
  }
}
function locked(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  geocoder = new google.maps.Geocoder();
  codeLatLng(lat,lng);
  initialize(lat,lng);
}
function notfound(){
  console.log("Geocoder failed");
}

function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
            'latLng': latlng
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    c = 1;
                    var user_lat = latlng.lat();
                    var user_lon = latlng.lng();
                    var user_area = results[1].formatted_address;
                    user_data = {"lat":user_lat,
                                "lon":user_lon,
                                "area":user_area};
                    } else {
                        console.log('Geocoder failed due to: ' + status);
                    }
                } else {
                    console.log('Geocoder failed due to: ' + status);
                }
            });
    }
