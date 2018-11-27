# zipcode-kml

All USA zip codes split to separate kml files

I was looking and looking for .kml files for USA zip code to display boundraies on google maps with a .kml layer (https://developers.google.com/maps/documentation/javascript/examples/layer-kml)

All I found was a 150MB file from census.gov (https://www.census.gov/geo/maps-data/data/kml/kml_zcta.html)

So I wrote a script that split the giant file to 32,768 separate files each named zip[zipcode].kml

You can download the zip file, unzip it and upload the individual files to your web server (it has to be accecible from google).

Have Fun!
Tomer

# github-page

Unzipped the files from Tomer's zip file and put it on github-page web server.

Example Download Link: https://iamswain25.github.io/zipcode-kml/usa/zip94112.kml
Usage with Google Map: https://developers.google.com/maps/documentation/javascript/examples/layer-kml

```
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {lat: 37.709764, lng: -122.455961}
    });

    var ctaLayer = new google.maps.KmlLayer({
        url: 'https://iamswain25.github.io/zipcode-kml/usa/zip94112.kml',
        map: map
    });
}
```
