import React from 'react';
const ContactsForm = ({
  transferArr,
  hasTransfer,
  setHasTransfer,
  flightsArr,
  flight,
  setFlight,
  hotelsArr,
  hotelId,
  setHotelId,
  isDisabled,
  setIsDisabled,
  contacts,
  datePreFormat,
  setDate,
  submitHandler,
  type,
}) => {
  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        {/* <label htmlFor="flight">flight</label>
        <input
        type="text"
        placeholder="flight number"
        // name="search"
        ref={flight}
        // value={search}
        // onChange={(e) => console.log(e.target.value)}
      /> */}
        <label htmlFor="date">select {type} date</label>
        <input
          type="date"
          id="date"
          onChange={(e) => {
            console.log(datePreFormat(e.target.value));
            setDate(datePreFormat(e.target.value));
            setHasTransfer('all');
            setFlight('');
            setHotelId('');
            // setSearchCriteria({ ...searchCriteria, date: datePreFormat(e.target.value) });
            setIsDisabled(false);
          }}
        />
        {contacts.length !== 0 && type === 'departure' && (
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
                  if (fl !== undefined) {
                    return (
                      <option key={i} value={fl}>
                        {fl}
                      </option>
                    );
                  }
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
          // <ContactsInfo
          //   transferArr={transferArr}
          //   setHasTransfer={setHasTransfer}
          //   hasTransfer={hasTransfer}
          //   flightsArr={flightsArr}
          //   setFlight={setFlight}
          //   flight={flight}
          //   hotelsArr={hotelsArr}
          //   setHotelId={setHotelId}
          //   hotelId={hotelId}
          // />
        )}
        {/* {flightsArr.length !== 0 && (
      
        )} */}
        {/* {contacts.length > 0 && (
         
        )} */}
        <button type="submit" disabled={isDisabled}>
          Search
        </button>
        <Button variant="outlined" size="medium" color="primary" className={classes.margin}>
          Medium
        </Button>
      </form>
    </React.Fragment>
  );
};
export default ContactsForm;
