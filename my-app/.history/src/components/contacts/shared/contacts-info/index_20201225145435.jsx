import React from 'react';
const ContactsInfo = ({ transferArr, hasTransfer, setHasTransfer, flightsArr, flight, setFlight }) => {
  return (
    <React.Fragment>
      <label htmlFor="hasTransfer">
        transfer
        <select
          name="hasTransfer"
          id="hasTransfer"
          value={hasTransfer}
          onChange={(e) => {
            // setSearchCriteria({ ...searchCriteria, hasTransfer: e.target.value });
            setHasTransfer(e.target.value);
          }}>
          {transferArr.map((tr, i) => {
            return (
              <option key={i} value={tr}>
                {tr ? 'with transfer' : 'without transfer'}
              </option>
            );
          })}
          <option value="all">all</option>
        </select>
      </label>
      <label htmlFor="flights">
        departure flight
        <select
          name="flight"
          id="flights"
          value={flight}
          onChange={(e) => {
            setFlight(e.target.value);
          }}>
          {flightsArr.map((fl, i) => {
            return (
              <option key={i} value={fl}>
                {fl}
              </option>
            );
          })}
          <option value="">all</option>
        </select>
      </label>
      <label htmlFor="hotels">
        hotel
        <select name="hotelId" id="hotels" value={hotelId} onChange={(e) => setHotelId(e.target.value)}>
          {Object.keys(hotelsArr).map((k) => {
            return (
              <option key={k} value={k}>
                {hotelsArr[k]}
              </option>
            );
          })}
          <option value="">all</option>
        </select>
      </label>
    </React.Fragment>
  );
};
export default ContactsInfo;
