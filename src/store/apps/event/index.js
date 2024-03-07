/* eslint-disable */
// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
// import axios from 'axios'
import AxiosInstance from 'src/configs/AxiosInstance'
import { EVENT } from 'src/configs/Endpoints'
import popMsg from 'src/configs/popup'

// ** Fetch Events
export const fetchEvents = createAsyncThunk('appEvents/fetchEvents', async () => {
  const response = await AxiosInstance.get(EVENT)
  if (response.status != 200) {
    popMsg('something went wrong please try again', 'Error')
  }
  return response.data
})

// ** Add Event
export const addEvent = createAsyncThunk('appEvents/addEvent', async (event, { dispatch }) => {
  const response = await axios.post(EVENT, { event })
  if (response.status === 200) {
    popMsg('Event Add Successfully', 'Success')
    await dispatch(fetchEvents())
  } else {
    popMsg('Form is not entered correctly', 'Error')
  }

  return response.data.event
})

// ** Update Event
// export const updateEvent = createAsyncThunk('appEvents/updateEvent', async (event, { dispatch }) => {
//   const response = await axios.post('/apps/calendar/update-event', {
//     data: {
//       event
//     }
//   })
//   await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))

//   return response.data.event
// })

export const appEventSlice = createSlice({
  name: 'appEvents',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default appEventSlice.reducer
/* eslint-disable */
