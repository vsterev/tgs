import React, { Fragment, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
function KeyboardDatePickerExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  const PersistentKeyboardDatePicker = React.forwardRef((props, ref) => (
    <KeyboardDatePicker
      clearable
      value={selectedDate}
      placeholder="10/10/2018"
      onChange={(date) => handleDateChange(date)}
      minDate={new Date()}
      format="MM/dd/yyyy"
      ref={ref}
    />
  ));

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <PersistentKeyboardDatePicker />

      {/* <KeyboardDatePicker
        placeholder="2018/10/10"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        format="yyyy/MM/dd"
      /> */}
    </MuiPickersUtilsProvider>
  );
}

export default KeyboardDatePickerExample;
