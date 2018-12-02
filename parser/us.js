var fs = require('fs'),
  xml2js = require('xml2js');

var inputSourceFile = __dirname + '/allZip.kml';
var ourputFilePrefix = 'zip';

var sharedKml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by FME 2016.1.1.0 (Build 16609) -->
<kml xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <LookAt>
      <longitude>-102</longitude>
      <latitude>38.5</latitude>
      <range>7000000</range>
      <tilt>10</tilt>
      <heading>0</heading>
    </LookAt>
    <name>cb_2016_us_zcta510_500k</name>
    <visibility>1</visibility>
    <Style id="KMLStyler">
      <IconStyle>
        <scale>0.8</scale>
      </IconStyle>
      <LabelStyle>
        <scale>1.0</scale>
      </LabelStyle>
      <LineStyle>
        <color>ffbc822f</color>
        <width>2</width>
        <gx:labelVisibility>0</gx:labelVisibility>
      </LineStyle>
      <PolyStyle>
        <color>7fe1ca9e</color>
      </PolyStyle>
    </Style>
    <Schema name="cb_2016_us_zcta510_500k" id="kml_schema_ft_cb_2016_us_zcta510_500k">
      <SimpleField type="xsd:string" name="ZCTA5CE10">
        <displayName>ZCTA5CE10</displayName>
      </SimpleField>
      <SimpleField type="xsd:string" name="AFFGEOID10">
        <displayName>AFFGEOID10</displayName>
      </SimpleField>
      <SimpleField type="xsd:string" name="GEOID10">
        <displayName>GEOID10</displayName>
      </SimpleField>
      <SimpleField type="xsd:double" name="ALAND10">
        <displayName>ALAND10</displayName>
      </SimpleField>
      <SimpleField type="xsd:double" name="AWATER10">
        <displayName>AWATER10</displayName>
      </SimpleField>
    </Schema>
    <Folder id="kml_ft_cb_2016_us_zcta510_500k">
      <name>cb_2016_us_zcta510_500k</name>
    
    
    </Folder>
  </Document>
</kml>
`;

var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

var top;
parser.parseString(sharedKml, function (err1, result1) {
  top = result1;

  parser.reset();
  fs.readFile(inputSourceFile, function (err, data) {
    parser.parseString(data, function (err, result) {
      var index = 0;
      var doc = result.kml.Document[0].Placemark;
      for (var i = 0; i < doc.length; i++) {
        var zip = doc[i].ExtendedData[0].SchemaData[0].SimpleData[0]._;
        top.kml.Document[0].Placemark = doc[i];
        var xml = builder.buildObject(top);

        fs.writeFileSync(outputFilePrefix + zip + '.kml', xml);
      }

      console.log('Done');
    });
  });

});