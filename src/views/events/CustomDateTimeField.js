/* eslint-disable */
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import DateTimePicker from '@mui/lab/DateTimePicker'

const CustomDateTimeField = ({ label, value, onChange, error, helperText, ...rest }) => {
  return (
    <DateTimePicker
      label={label}
      value={value}
      onChange={onChange}
      renderInput={props => <TextField {...props} fullWidth variant='filled' error={error} helperText={helperText} />}
      {...rest}
    />
  )
}

export default CustomDateTimeField
/* eslint-disable */
