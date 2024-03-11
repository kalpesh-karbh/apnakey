/* eslint-disable */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Icon from 'src/@core/components/icon'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const SidebarLeft = props => {
  const {
    store,
    mdAbove,
    dispatch,
    calendarApi,
    calendarsColor,
    leftSidebarOpen,
    leftSidebarWidth,
    handleSelectEvent,
    handleAllCalendars,
    handleCalendarsUpdate,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle,
    handleAddTaskToggle
  } = props

  const bookingfilter = [{ title: 'Booked' }, { title: 'Manual Booked' }]

  const colorsArr = calendarsColor
  const renderFilters = bookingfilter.length
    ? bookingfilter?.map((value, index) => {
        const colorIndex = index % colorsArr.length
        return (
          <FormControlLabel
            key={index}
            label={value?.title}
            sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
            control={
              <Checkbox
                color={colorsArr[colorIndex]}
                checked={true}
                // onChange={() => dispatch(handleCalendarsUpdate(index))}
                sx={{ p: 1 }}
              />
            }
          />
        )
      })
    : null

  const renderActivityFilters = store?.activityGroups.length
    ? store?.activityGroups?.map((value, index) => {
        const colorIndex = index % colorsArr.length
        return (
          <FormControlLabel
            key={index}
            label={value?.title}
            sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
            control={
              <Checkbox
                color={colorsArr[colorIndex]}
                checked={true}
                // onChange={() => dispatch(handleCalendarsUpdate(index))}
                sx={{ p: 1 }}
              />
            }
          />
        )
      })
    : null

  const handleSidebarToggleSidebar = () => {
    handleAddEventSidebarToggle()
    dispatch(handleSelectEvent(null))
  }
  const handleTaskToggleModel = () => {
    dispatch(handleSelectEvent(null))
    handleAddTaskToggle()
  }
  if (renderFilters) {
    return (
      <Drawer
        open={leftSidebarOpen}
        onClose={handleLeftSidebarToggle}
        variant={mdAbove ? 'permanent' : 'temporary'}
        ModalProps={{
          disablePortal: true,
          disableAutoFocus: true,
          disableScrollLock: true,
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          zIndex: 3,
          display: 'block',
          position: mdAbove ? 'static' : 'absolute',
          '& .MuiDrawer-paper': {
            borderRadius: 1,
            boxShadow: 'none',
            width: leftSidebarWidth,
            borderTopRightRadius: 0,
            alignItems: 'flex-start',
            borderBottomRightRadius: 0,
            zIndex: mdAbove ? 2 : 'drawer',
            position: mdAbove ? 'static' : 'absolute'
          },
          '& .MuiBackdrop-root': {
            borderRadius: 1,
            position: 'absolute'
          }
        }}
      >
        <Box sx={{ p: 6, width: '100%' }}>
          <Button fullWidth variant='contained' sx={{ '& svg': { mr: 2 }, my: 2 }} onClick={handleSidebarToggleSidebar}>
            <Icon icon='tabler:plus' fontSize='1.125rem' />
            Add Booking
          </Button>
          <Button
            fullWidth
            color='secondary'
            variant='contained'
            sx={{ '& svg': { mr: 2 }, my: 2 }}
            onClick={handleTaskToggleModel}
          >
            <Icon icon='tabler:plus' fontSize='1.125rem' />
            Add Task
          </Button>
        </Box>
        <Divider sx={{ width: '100%', m: '0 !important' }} />
        <Box sx={{ p: 6, width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography variant='body2' sx={{ mb: 2, color: 'text.disabled', textTransform: 'uppercase' }}>
            Filters
          </Typography>
          <FormControlLabel
            label='View All'
            sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
            control={
              <Checkbox
                checked={store.selectedCalendars.length === colorsArr.length}
                // onChange={e => dispatch(handleAllCalendars(e.target.checked))}
                sx={{ p: 1 }}
              />
            }
          />
          {renderFilters}
        </Box>
        <Divider sx={{ width: '100%', m: '0 !important' }} />
        <Box sx={{ p: 6, width: '100%', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography variant='body2' sx={{ mb: 2, color: 'text.disabled', textTransform: 'uppercase' }}>
            Activity Groups
          </Typography>
          <FormControlLabel
            label='View All'
            sx={{ '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
            control={
              <Checkbox
                checked={store.selectedCalendars.length === colorsArr.length}
                // onChange={e => dispatch(handleAllCalendars(e.target.checked))}
                sx={{ p: 1 }}
              />
            }
          />
          {renderActivityFilters}
        </Box>
      </Drawer>
    )
  } else {
    return null
  }
}

export default SidebarLeft
/* eslint-disable */
