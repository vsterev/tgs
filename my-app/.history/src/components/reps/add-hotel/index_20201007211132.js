import React, { useState } from 'react';
import { render } from 'react-dom';

const App = (props) => {
  const [state, setState] = useState({
    Filters: [
      {
        name: 'Vegetables',
        options: [
          {
            value: 'tmto',
            name: 'Tomato',
          },
          {
            value: 'ptato',
            name: 'Potato',
          },
        ],
      },
      {
        name: 'Fruits',
        options: [
          {
            value: 'ornge',
            name: 'Orange',
          },
          {
            value: 'grps',
            name: 'Grapes',
          },
        ],
      },
    ],
    selected: [],
  });

  const handleCheckboxChange = (value) => {
    setState((state) => {
      const updatedEtables = state.selected.find((obj) => obj === value);
      const selected = updatedEtables ? state.selected.filter((obj) => obj !== value) : [...state.selected, value];

      return {
        selected,
        Filters: [
          ...state.Filters.map((filter) => {
            return {
              ...filter,
              options: filter.options.map((ele) => {
                return {
                  ...ele,
                  checked: selected.includes(ele.value),
                };
              }),
            };
          }),
        ],
      };
    });
  };

  return (
    <div>
      {state.Filters.map((ele) => {
        return (
          <React.Fragment>
            <h6>{ele.name}</h6>
            {ele.options.map((item) => {
              return (
                <div>
                  <input
                    checked={item.checked || false}
                    onChange={() => handleCheckboxChange(item.value)}
                    type="checkbox"
                  />
                </div>
              );
            })}
          </React.Fragment>
        );
      })}

      <strong>Selected: </strong>
      <br />
      <span>{state.selected.join(',')}</span>
    </div>
  );
};
export default App;

// render(<App />, document.getElementById('root'));
