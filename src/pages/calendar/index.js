/* eslint-disable */
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { useDispatch, useSelector } from 'react-redux'

// ** FullCalendar & App Components Imports
import Calendar from 'src/views/calendar/Calendar'
import SidebarLeft from 'src/views/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'

// import AddEventSidebar from 'src/views/calendar/AddEventSidebar'

// ** Actions
import {
  fetchEvents,

  // addEvent,
  // deleteEvent,
  updateEvent,
  handleSelectEvent,
  handleAllCalendars,
  handleCalendarsUpdate
} from 'src/store/apps/calendar'

// ** CalendarColors
const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}

const AppCalendar = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state?.calendar)

  const EndDateRange = new Date().toISOString().split('T')[0]
  const selectStartDate = new Date()
  selectStartDate.setMonth(selectStartDate.getMonth() - 1)
  const StartDateRange = selectStartDate.toISOString().split('T')[0]
  const DateRange = {
    StartDateRange: StartDateRange,
    EndDateRange: EndDateRange
  }
  const [calendarApi, setCalendarApi] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchEvents(DateRange))
  }, [store, dispatch])

  // ** Hooks
  const { settings } = useSettings()

  // ** Vars
  const leftSidebarWidth = 300

  // const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  return (
    <CalendarWrapper
      className='app-calendar'
      sx={{
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
      }}
    >
      {/* <SidebarLeft
        mdAbove={mdAbove}
        calendarApi={calendarApi}
        calendarsColor={calendarsColor}
        leftSidebarOpen={leftSidebarOpen}
        leftSidebarWidth={leftSidebarWidth}
        handleSelectEvent={handleSelectEvent}
        handleAllCalendars={handleAllCalendars}
        handleCalendarsUpdate={handleCalendarsUpdate}
        handleLeftSidebarToggle={handleLeftSidebarToggle}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      /> */}
      <Box
        sx={{
          p: 6,
          pb: 0,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: 'none',
          backgroundColor: 'background.paper',
          ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
        }}
      >
        {/* <Calendar
          direction={direction}
          updateEvent={updateEvent}
          calendarApi={calendarApi}
          calendarsColor={calendarsColor}
          setCalendarApi={setCalendarApi}
          handleSelectEvent={handleSelectEvent}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        /> */}
      </Box>
      {/* <AddEventSidebar
        addEvent={addEvent}
        updateEvent={updateEvent}
        deleteEvent={deleteEvent}
        calendarApi={calendarApi}
        drawerWidth={addEventSidebarWidth}
        handleSelectEvent={handleSelectEvent}
        addEventSidebarOpen={addEventSidebarOpen}
        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
      /> */}
    </CalendarWrapper>
  )
}

export default AppCalendar
/* eslint-disable */
