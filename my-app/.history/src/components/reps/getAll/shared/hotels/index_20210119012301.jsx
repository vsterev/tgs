import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
const Hotels = ({ hotels, repId }) => {
  const [visible, setVisible] = useState(false);
  const reduced = hotels.reduce((acc, curr) => {
    acc[curr.resortId.name] = [...(acc[curr.resortId.name] || []), curr.name];
    return acc;
  }, {});
  const sorted = [...Object.entries(reduced)].sort((a, b) => a[0].localeCompare(b[0]));
  // console.log(sorted);
  function toggleView() {
    setVisible(!visible);
  }
  return (
    <React.Fragment>
      {/* <div> */}
      {/* <button onClick={toggleView}>{visible ? 'hide' : 'view'} hotels of rep</button> */}
      <Button
        variant="outlined"
        size="medium"
        color={visible ? 'secondary' : 'primary'}
        onClick={toggleView}
        startIcon={<ListAltOutlinedIcon />}>
        {visible ? 'hide' : 'view'} list
      </Button>
      {/* </div> */}
      {visible && (
        <div>
          {sorted.length === 0 && <div>No hotels added to this rep</div>}
          {sorted.map((info, i) => {
            const resort = info[0];
            const hotels = info[1];
            return (
              <div key={i}>
                <div>
                  <b>{resort} </b>- {hotels.length} hotels
                </div>
                {hotels.map((hotel, ind) => (
                  <div key={ind}>{hotel}</div>
                ))}
              </div>
            );
          })}
          <Link to={`/admin/reps/add-hotel/${repId}`}>edit hotels</Link>
        </div>
      )}
      {/* {visible && <Link to={`/admin/reps/add-hotel/${repId}`}>edit hotels</Link>} */}
    </React.Fragment>
  );
};
export default Hotels;
