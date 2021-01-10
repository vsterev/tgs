import React from 'react';
const ContactsInfo = ({ transferArr, setHasTransfer }) => {
  return (
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
  );
};
export default ContactsInfo;
