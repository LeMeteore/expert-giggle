// create a map
var map = L.map( 'map', {
    //center: lat, long
    center: [14.6937000, -17.4440600],
    minZoom: 2,
    maxZoom: 17,
    zoom: 12
});

// get layers from gmaps
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
map.addLayer(googleStreets);

// root url of current website
var myURL = jQuery( 'script[src$="demo.js"]' ).attr( 'src' ).replace( 'demo.js', '' );

// function called on click event
function onClick(e) {
    // url to g api
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
    // my api key for geocode
    // should normally be stored outside of source code
    var key = "AIzaSyAF_FVABrkUaRSfNyBd1YwKtjs5B82lyeM"

    // ask g what it the type of current point
    $.getJSON(url + e.latlng['lat'] + ',' + e.latlng['lng'] + '&key='+key,
              function(data) {
                  if(data){
                      var geometry =  data.results[0].geometry;
                      var types =  data.results[0].types;
                      var address =  data.results[0].formatted_address;
                      // types should not be in natural_feature
                      // address should not contains Sea, Lake, Ocean, Mountain
                      if(geometry &&
                         types !== "natural_feature" &&
                         address ) {
                          var point = {"lat":e.latlng['lat'],
                                       "lng":e.latlng['lng'],
                                       "types":types,
                                       "address":address}
                          request = store_point(point);
                          add_marker(e);
                          // Callback handler that will be called on success
                          request.done(function (response, textStatus, jqXHR){
                              // Log a message to the console
                              console.log("Yay \\o/, it worked!");
                          });
                      }
                  }
              });
}
map.on('click', onClick);

function getCookie(name){
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// retrieve the csrf token before posting data
$.ajaxSetup({
     beforeSend: function(xhr, settings) {
         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
             // Only send the token to relative URLs i.e. locally.
             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         }
     }
});

function store_point(data){
    // send point data to server
    return $.ajax({
        url: "store/",
        type: "post",
        data: data
    });
}

function add_marker(e){
    // mark
    L.marker([e.latlng['lat'], e.latlng['lng']]).addTo(map);
    // update list
    var infopos = "<li>"+ e.latlng +"</li>";
    document.getElementById("list").innerHTML += infopos;
}
