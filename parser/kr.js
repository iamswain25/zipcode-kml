const fs = require("fs");
const xml2js = require("xml2js");

const inputSourceFile = __dirname + "/../zipSeoul.kml";
const sharedKml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Imitation of FME 2016.1.1.0 (Build 16609) -->
<kml xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:atom="http://www.w3.org/2005/Atom" xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <LookAt>
      <longitude>127</longitude>
			<latitude>37.5</latitude>
			<range>7000000</range>
			<tilt>10</tilt>
			<heading>0</heading>
    </LookAt>
    <name>Korea</name>
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
    <Schema name="kml_schema_kr_2018_oct" id="kml_schema_kr_2018_oct">
      <SimpleField name="BAS_MGT_SN" type="string"></SimpleField>
      <SimpleField name="CTP_KOR_NM" type="string"></SimpleField>
      <SimpleField name="SIG_CD" type="string"></SimpleField>
      <SimpleField name="SIG_KOR_NM" type="string"></SimpleField>
      <SimpleField name="BAS_ID" type="string"></SimpleField>
      <SimpleField name="BAS_AR" type="float"></SimpleField>
      <SimpleField name="NTFC_DE" type="string"></SimpleField>
      <SimpleField name="MVMN_DE" type="string"></SimpleField>
      <SimpleField name="MVMN_RESN" type="string"></SimpleField>
      <SimpleField name="OPERT_DE" type="string"></SimpleField>
    </Schema>
    <Folder id="kml_schema_kr_2018_oct_folder">
      <name>korea</name>
    </Folder>
  </Document>
</kml>
`;
const { parseString } = xml2js;
const builder = new xml2js.Builder();
parseString(sharedKml, function(err1, sharedKmlObj) {
  const top = sharedKmlObj;
  fs.readFile(inputSourceFile, function(err, data) {
    parseString(data, function(err, result) {
      const placemarks = result.kml.Document[0].Folder[0].Placemark;
      for (var i = 0; i < placemarks.length; i++) {
        const currentPlaceMark = placemarks[i];
        currentPlaceMark.ExtendedData[0].SchemaData[0].$.schemaUrl =
          "#kml_schema_kr_2018_oct";
        const postalCode =
          currentPlaceMark.ExtendedData[0].SchemaData[0].SimpleData[4]._;
        delete currentPlaceMark.Style;
        currentPlaceMark.styleUrl = [];
        currentPlaceMark.styleUrl[0] = {};
        currentPlaceMark.styleUrl[0]._ = "#KMLStyler";
        currentPlaceMark.name = [];
        currentPlaceMark.name[0] = {};
        currentPlaceMark.name[0]._ = postalCode;
        top.kml.Document[0].Placemark = currentPlaceMark;
        const xml = builder.buildObject(top);

        fs.writeFileSync(`${__dirname}/../KR/zip${postalCode}.kml`, xml);
        if(i == 2) {
          break;
        }
      }

      console.log("Done");
    });
  });
});
