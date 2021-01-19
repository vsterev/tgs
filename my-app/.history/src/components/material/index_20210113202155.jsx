import React, { Fragment, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
function KeyboardDatePickerExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  const PersistentKeyboardDatePicker = React.forwardRef((props, ref) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        clearable
        value={selectedDate}
        placeholder="10/10/2018"
        onChange={(date) => handleDateChange(date)}
        minDate={new Date()}
        format="MM/dd/yyyy"
      />
      ref={ref}
    </MuiPickersUtilsProvider>
  ));

  return <PersistentKeyboardDatePicker />;
}

export default KeyboardDatePickerExample;
