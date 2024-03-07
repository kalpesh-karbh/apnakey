// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import AxiosInstance from 'src/configs/AxiosInstance'
import { CALENDAR, CALENDAR_Activity_Groups } from 'src/configs/Endpoints'

// ** Fetch Events
export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async DateRange => {
  const response = await AxiosInstance.get(CALENDAR, {
    params: {
      StartDateRange: DateRange.StartDateRange,
      EndDateRange: DateRange.EndDateRange
    }
  })

  return response.data
})

// ** Fetch Events
export const fetchGroupActivity = createAsyncThunk('appCalendar/fetchGroupActivity', async () => {
  const response = await AxiosInstance.get(CALENDAR_Activity_Groups)

  return response.data
})

// ** Add Event
export const addEvent = createAsyncThunk('appCalendar/addEvent', async (event, { dispatch }) => {
  const response = await axios.post('/apps/calendar/add-event', {
    data: {
      event
    }
  })
  await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))

  return response.data.event
})

// ** Update Event
export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (event, { dispatch }) => {
  const response = await axios.post('/apps/calendar/update-event', {
    data: {
      event
    }
  })
  await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))

  return response.data.event
})

// ** Delete Event
export const deleteEvent = createAsyncThunk('appCalendar/deleteEvent', async (id, { dispatch }) => {
  const response = await axios.delete('/apps/calendar/remove-event', {
    params: { id }
  })
  await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))

  return response.data
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: null,
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
  },
  reducers: {
    handleSelectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    handleCalendarsUpdate: (state, action) => {
      const filterIndex = state.selectedCalendars.findIndex(i => i === action.payload)
      if (state.selectedCalendars.includes(action.payload)) {
        state.selectedCalendars.splice(filterIndex, 1)
      } else {
        state.selectedCalendars.push(action.payload)
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0
      }
    },
    handleAllCalendars: (state, action) => {
      const value = action.payload
      if (value === true) {
        state.selectedCalendars = ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
      } else {
        state.selectedCalendars = []
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload
    })
    builder.addCase(fetchGroupActivity.fulfilled, (state, action) => {
      state.group_activities = action.payload.activityGroups
    })
  }
})

export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = appCalendarSlice.actions

export default appCalendarSlice.reducer
