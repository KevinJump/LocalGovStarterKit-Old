function LoadGoogleMapsApiWithCallBack(callBackFunction) {

    google.load('maps', '3', {
        callback: callBackFunction,
        other_params: "sensor=false"
    });
}





function AddVenueToGoogleMap() {
    if ($('#map_canvas').length) {
        //alert('has map');

        //set up variables
        var mapZoom = GetGoogleMapsZoomLevel($('#map_canvas').data("mapzoom"));
        var mapPoint = $('#map_canvas').data("location");
        var venueName = $('#map_canvas').data("name");
        var venueType = $('#map_canvas').data("venuetype");
        var venueAddress = $('#map_canvas').data("venueaddress");
        var infoWindowHtml = venueName;
        if (venueAddress.length != 0) {
            infoWindowHtml = venueName + ' <a href="https://maps.google.com/maps?saddr=&daddr=' + venueAddress + '">directions</a>';

        }
        venueType = venueType.split(' ').join('-');



        //map centre
        var latlng = GetGoogleMapsLatLng(mapPoint);

        // map options
        var options = {
            zoom: mapZoom,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // initialize
        var map = new google.maps.Map(document.getElementById('map_canvas'), options);
        //Add Marker to map
        var image = '/img/mapicons/venue_' + venueType.replace(" ", "-") + '.png';
        var shadow = '/img/mapicons/shadow.png';
        var venueMarker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: image,
            shadow: shadow,
            title: venueName
        });
        var infowindow = new google.maps.InfoWindow({
            content: infoWindowHtml
        });
        google.maps.event.addListener(venueMarker, 'click', function () {
            infowindow.open(map, venueMarker);
        });
    }
}

function AddVenuesToGoogleMap() {
    if ($('#map_canvas').length) {

        //alert('has map');

        //set up variables
        var mapZoom = GetGoogleMapsZoomLevel($('#map_canvas').data("mapzoom"));
        var mapCentre = $('#map_canvas').data("location");

        //read in map zoom
        // if ($("#map_canvas ul li#mapZoom").length) {
        //     mapZoom = parseInt($("#map_canvas ul li#mapZoom").text());
        // }
        // read in mapCenter
        // if ($("#map_canvas ul li#mapCentre").length) {
        //    mapCentre = $("#map_canvas ul li#mapCentre").text();

        // }

        //map centre
        var latlng = GetGoogleMapsLatLng(mapCentre);

        // map options
        var options = {
            zoom: mapZoom,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        var lastinfowindow;

        // initialize
        var map = new google.maps.Map(document.getElementById('map_canvas'), options);
        //loop through map points on the page
        $('.venueMapPoint').each(function (index) {

            var venueUrl = $(this).attr("data-venueUrl");
            var venueType = $(this).attr("data-venueType");
            var venueTitle = $(this).attr("data-venueTitle")
            var venueLatLng = GetGoogleMapsLatLng($(this).attr("data-venueLatLng"));
            var venueAddress = $(this).attr("data-venueaddress");
            var infoWindowHtml = '';
            if (venueAddress.length != 0) {
                infoWindowHtml = ' | <a href="https://maps.google.com/maps?saddr=&daddr=' + venueAddress + '">directions</a>';

            }
            //set marker type
            var image = '/img/mapicons/venue_' + venueType.replace(" ", "-") + '.png';
            var shadow = '/img/mapicons/shadow.png';

            // add marker to map
            var venueMarker = new google.maps.Marker({
                position: venueLatLng,
                map: map,
                icon: image,
                shadow: shadow,
                title: venueTitle
            });

            var infowindow = new google.maps.InfoWindow({
                content: '<div class="mapInfo"><h2><a href="' + venueUrl + '">' + venueTitle + '</a></h2><p><a href="' + venueUrl + '" title="View ' + venueTitle + ' details">More information</a> ' + infoWindowHtml + '</p></div>'
            });
            google.maps.event.addListener(venueMarker, 'click', function () {

                if (lastinfowindow) lastinfowindow.close();

                infowindow.open(map, venueMarker);
                lastinfowindow = infowindow;
            });
        });
    }
}



function GetGoogleMapsLatLng(mapCoordinate) {

    var maplatlng = mapCoordinate.split(',');
    var maplat = parseFloat(maplatlng[0]);
    var maplng = parseFloat(maplatlng[1]);

    //map centre
    return new google.maps.LatLng(maplat, maplng);

}

function GetGoogleMapsZoomLevel(uGoogleMapLocation) {
    var zoomLevel = 12
    var mapParts = uGoogleMapLocation.split(',');

    if (mapParts.length == 1) {
        zoomLevel = parseInt(uGoogleMapLocation);
    }
    else {
        zoomLevel = parseInt(mapParts[2])
    }
    return zoomLevel;
}