function LoadGoogleMaps(callbackFunction)
{
	google.load('maps', '3', {
		callback: callbackFunction,
		other_params: "sensor=false"
		});
}


/*
 * puts a venue map on the page (assuming you have the right id)
 */
function DisplayVenueMap() {

	if ($('#map_venue').length) {
		// we have a map
		var mapHolder = $("#map_venue") ;
		
		var mapZoom = 12 ;
		var lat = parseFloat(mapHolder.data("map-lat"));
		var lng = parseFloat(mapHolder.data("map-lng"));
		
		var mapPoint = new google.maps.LatLng(lat, lng);
		
		var options = {
			zoom: mapZoom,
			center: mapPoint,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		var map = new google.maps.Map(document.getElementById('map_venue'), options);
		
		// do we have a point to prove?
		var venueName = mapHolder.data("name");
		if ( venueName.length )
		{
			var infoWindowHtml = venueName ;
			var venueAddress = mapHolder.data("address");
			if ( venueAddress.length ) {
				infoWindowHtml = '<p>' + venueName + '</p>'
					+ '<a href="https://maps.google.com/maps?saddr=&daddr=' + venueAddress + '">directions</a>';
			}

			var image = '/img/mapicons/venue.png';
			
			var venueType = mapHolder.data("venue-type");
			if ( venueType.length )
			{
				image = '/img/mapicons/venue_' + venueType + '.png' ; 
			}
	
			var shadow = '/img/mapicons/shadow.png';
			
			var marker = new google.maps.Marker({
				position: mapPoint,
				map: map,
				icon: image,
				shadow: shadow,
				title: venueName });
				
			var infoWindow = new google.maps.InfoWindow({
				content: infoWindowHtml 
				}); 
				
			google.maps.event.addListener(marker, 'click', function() {
				infoWindow.open(map, marker); 
				});
				
		}
	}
}