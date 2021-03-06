import React, { useState } from 'react';
// const hotelsArr = [
//   { id: 1, name: 'Laguna Beach', checked: false, resort: 'Albena' },
//   { id: 2, name: 'Havana', checked: false, resort: 'Golden Sands' },
//   { id: 3, name: 'Flamingo', checked: true, resort: 'Albena' },
//   { id: 4, name: 'Paradise Beach', checked: false, resort: 'Golden Sands' },
// ];
const Test = (props) => {
  const testInit = { id: 4, name: 'Paradise Beach', checked: false, resort: 'Golden Sands' };
  const [test, setTest] = useState(testInit);
  //   function changeHandler() {
  //     console.log('vasko');
  //     setTest({ ...test, checked: !test.checked });
  //   }
  return (
    <React.Fragment>
      <form>
        <label htmlFor={test.id}>{test.name}</label>
        <input
          type="checkbox"
          value={test.name}
          name="hotels"
          id={test.id}
          checked={test.checked}
          onChange={() => setTest({ ...test, checked: !test.checked })}
        />
      </form>
      {JSON.stringify(test)}
    </React.Fragment>
  );
};

export default Test;
