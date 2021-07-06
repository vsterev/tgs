const fetch = require('node-fetch');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const user = 'sol001';
const pass = 'NfC4nWyU';
const minPrice = (pageSize, checkIn, checkOut, cityKey, rowIndexFrom, cacheGuid, serviceType, adults, children) => {
  // const pageSize = '10';
  // const checkIn = '2021-07-27';
  // const checkOut = '2021-08-05';
  // const cityKey = '68';
  // console.log(pageSize, checkIn, checkOut, cityKey);

  // const rowIndexFrom = '10';
  // const cacheGuid = 'de6b605f-de6a-4f18-9358-41febc7058fc';
  // const cacheGuid = '';
  console.log(serviceType);
  const url = {
    eval: 'https://evaluation.solvex.bg/iservice/integrationservice.asmx',
    prod: 'https://iservice.solvex.bg/IntegrationService.asmx',
    eval2: 'http://192.168.10.50/integrationservice.asmx',
  };
  // const service = url['eval'];
  const service = url[serviceType];

  console.log(service);
  const pax = (+adults + children.length).toString();
  console.log('adults', adults);
  console.log('pax', pax);
  const connectionStr = `
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Connect xmlns="http://www.megatec.ru/">
      <login>${user}</login>
      <password>${pass}</password>
    </Connect>
  </soap:Body>
</soap:Envelope>
`;
  const requestStr = (guid) => {
    return `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <SearchHotelServicesMinHotel xmlns="http://www.megatec.ru/">
      <guid>${guid}</guid>
      <request>
        <PageSize>${pageSize}</PageSize>
       ${!!rowIndexFrom ? `<RowIndexFrom>${rowIndexFrom}</RowIndexFrom>` : ''}
        <PartnerKey>4391</PartnerKey>
        <DateFrom>${checkIn}</DateFrom>
        <DateTo>${checkOut}</DateTo>
        <CityKeys>
          <int>${cityKey}</int>
        </CityKeys>
        <Pax>${pax}</Pax>
        ${children.length > 0 ? `<Ages>${children.map((el) => `<int>${el}</int>`)}</Ages>` : ''}
        <ValidateQuota>true</ValidateQuota>
        ${!!cacheGuid ? `<CacheGuid>${cacheGuid}</CacheGuid>` : ''}
      </request>
    </SearchHotelServicesMinHotel>
  </soap:Body>
</soap:Envelope>
`;
  };

  return fetch(service, {
    method: 'post',
    body: connectionStr,
    headers: {
      'Content-Type': 'text/xml',
    },
  })
    .then((res) => res.text())
    .then((xml) => {
      return parser.parseStringPromise(xml);
    })
    .then((res) => {
      return res['soap:Envelope']['soap:Body'][0]['ConnectResponse'][0]['ConnectResult'][0];
    })
    .then((res) => (guid = res))
    .then((guid) => {
      // console.log(requestStr(guid));
      return fetch(service, {
        method: 'post',
        body: requestStr(guid),
        headers: {
          'Content-Type': 'text/xml',
        },
      })
        .then((res) => res.text())
        .then((xml) => {
          return parser.parseStringPromise(xml);
        })
        .then((result) => {
          // console.time('fetching price');
          const prices =
            result['soap:Envelope']['soap:Body'][0]['SearchHotelServicesMinHotelResponse'][0][
              'SearchHotelServicesMinHotelResult'
            ][0]['Data'][0]['DataRequestResult'][0]['ResultTable'][0]['diffgr:diffgram'][0]['DocumentElement'][0][
              'HotelServices'
            ];
          const cacheGuid =
            result['soap:Envelope']['soap:Body'][0]['SearchHotelServicesMinHotelResponse'][0][
              'SearchHotelServicesMinHotelResult'
            ][0]['Data'][0]['DataRequestResult'][0]['ResponseGuid'][0];
          const totalCount =
            result['soap:Envelope']['soap:Body'][0]['SearchHotelServicesMinHotelResponse'][0][
              'SearchHotelServicesMinHotelResult'
            ][0]['Data'][0]['DataRequestResult'][0]['TotalCount'][0];
          const pageSize =
            result['soap:Envelope']['soap:Body'][0]['SearchHotelServicesMinHotelResponse'][0][
              'SearchHotelServicesMinHotelResult'
            ][0]['Data'][0]['DataRequestResult'][0]['PageSize'][0];
          const pageIndex =
            result['soap:Envelope']['soap:Body'][0]['SearchHotelServicesMinHotelResponse'][0][
              'SearchHotelServicesMinHotelResult'
            ][0]['Data'][0]['DataRequestResult'][0]['PageIndex'][0];
          const isLastPage =
            result['soap:Envelope']['soap:Body'][0]['SearchHotelServicesMinHotelResponse'][0][
              'SearchHotelServicesMinHotelResult'
            ][0]['Data'][0]['DataRequestResult'][0]['IsLastPage'][0];
          const requeststr = requestStr(guid);
          return Promise.all([prices, cacheGuid, totalCount, pageSize, pageIndex, isLastPage, requeststr, result]);
        });
    })
    .catch((err) => console.log(err));
};
module.exports = minPrice;
