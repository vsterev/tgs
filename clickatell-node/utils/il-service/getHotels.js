const fetch = require('node-fetch');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const getHotels = function (cityId) {
  const requestStr = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetHotels xmlns="http://www.megatec.ru/">
      <countryKey>4</countryKey>
      <regionKey>-1</regionKey>
      <cityKey>${cityId}</cityKey>
    </GetHotels>
  </soap:Body>
</soap:Envelope>`;
  fetch('http://evaluation.solvex.bg/iservice/integrationservice.asmx', {
    method: 'post',
    body: requestStr,
    headers: {
      'Content-Type': 'text/xml',
    },
  })
    .then((res) => res.text())
    .then((xml) => {
      parser
        .parseStringPromise(xml)
        .then((result) => {
          const cities =
            result['soap:Envelope']['soap:Body'][0]['GetHotelsResponse'][0][
              'GetHotelsResult'
            ][0]['Hotel'];
          console.log(cities);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
module.exports = getHotels;
