# zipcode-kml

## github-page (free kml web server)

[demo](https://iamswain25.github.io/zipcode-kml)

KML Download Link Example: https://iamswain25.github.io/zipcode-kml/usa/zip94112.kml)
Usage with Google Map: https://developers.google.com/maps/documentation/javascript/examples/layer-kml

```
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 37.709, lng: -122.455}
    });

    var ctaLayer = new google.maps.KmlLayer({
        url: 'https://iamswain25.github.io/zipcode-kml/usa/zip94112.kml',
        map: map
    });
}
```

## US

All USA zip codes split to separate kml files
I was looking and looking for .kml files for USA zip code to display boundraies on google maps with a .kml layer (https://developers.google.com/maps/documentation/javascript/examples/layer-kml)
All I found was a 150MB file from census.gov (https://www.census.gov/geo/maps-data/data/kml/kml_zcta.html)
So I wrote a script that split the giant file to 32,768 separate files each named zip[zipcode].kml
You can download the zip file, unzip it and upload the individual files to your web server (it has to be accecible from google).

Have Fun!
Tomer
---
Unzipped the files from Tomer's zip file and put it on github-page web server. -Swain

# KR

Tried to replicate Tomer's work on US kml map, but Korean government only provided the [shapefile](http://www.juso.go.kr/addrlink/addressBuildDevNew.do?menu=bsin). (Newest one at the time of DEC 2018 was DEC 2017)
1. I imported the shape files in QGIS and saved them as KML files.
2. Parsed the big chunk KML files into seperate postal code files zip[zipcode].kml
however, google map renders only the old postal code (6 digits) in Korea, whereas the kml postal code is the new one (5 digits).
I tried to utilize [Kakao(Daum) Local API](https://developers.kakao.com/docs/restapi/local#주소-변환) to get the new postal code 
but many geo points are lacking the road_address info.
I guess I'll have to build a server myself to render new Korean postal code.
