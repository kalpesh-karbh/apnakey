/* eslint-disable */
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const capitalize = string => string && string[0].toUpperCase() + string.slice(1)

const defaultState = {
  url: '',
  title: '',
  guests: [],
  allDay: true,
  description: '',
  endDate: new Date(),
  calendar: 'Business',
  startDate: new Date()
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const UpdateEventSidebar = props => {
  // ** Props
  const {
    store,
    dispatch,
    addEvent,
    updateEvent,
    drawerWidth,
    calendarApi,
    deleteEvent,
    handleSelectEvent,
    updateEventOpen,
    handleUpdateEventToggle
  } = props

  // ** States
  const [values, setValues] = useState(defaultState)
  const [repeatBooking, setRepeatBooking] = useState(false)

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } })

  const handleSidebarClose = async () => {
    setValues(defaultState)
    clearErrors()
    dispatch(handleSelectEvent(null))
    handleUpdateEventToggle()
  }

  const onSubmit = data => {
    const modifiedEvent = {
      url: values.url,
      display: 'block',
      title: data.title,
      end: values.endDate,
      allDay: values.allDay,
      start: values.startDate,
      extendedProps: {
        calendar: capitalize(values.calendar),
        guests: values.guests && values.guests.length ? values.guests : undefined,
        description: values.description.length ? values.description : undefined
      }
    }
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      dispatch(addEvent(modifiedEvent))
    } else {
      dispatch(updateEvent({ id: store.selectedEvent.id, ...modifiedEvent }))
    }
    calendarApi.refetchEvents()
    handleSidebarClose()
  }

  const handleDeleteEvent = () => {
    if (store.selectedEvent) {
      dispatch(deleteEvent(store.selectedEvent.id))
    }

    // calendarApi.getEventById(store.selectedEvent.id).remove()
    handleSidebarClose()
  }

  const handleStartDate = date => {
    if (date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
    }
  }

  const resetToStoredValues = useCallback(() => {
    if (store.selectedEvent !== null) {
      const event = store.selectedEvent
      setValue('title', event.title || '')
      setValues({
        url: event.url || '',
        title: event.title || '',
        allDay: event.allDay,
        guests: event.extendedProps.guests || [],
        description: event.extendedProps.description || '',
        calendar: event.extendedProps.calendar || 'Business',
        endDate: event.end !== null ? event.end : event.start,
        startDate: event.start !== null ? event.start : new Date()
      })
    }
  }, [setValue, store.selectedEvent])

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '')
    setValues(defaultState)
  }, [setValue])
  useEffect(() => {
    if (store.selectedEvent !== null) {
      resetToStoredValues()
    } else {
      resetToEmptyValues()
    }
  }, [updateEventOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent])

  const PickersComponent = forwardRef(({ ...props }, ref) => {
    return (
      <CustomTextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    )
  })

  const RenderSidebarFooter = () => {
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button variant='tonal' color='secondary' onClick={resetToEmptyValues}>
            Reset
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            Update
          </Button>
          <Button variant='tonal' color='secondary' onClick={resetToStoredValues}>
            Reset
          </Button>
        </Fragment>
      )
    }
  }

  return (
    <Dialog
      open={updateEventOpen}
      onClose={() => handleSidebarClose()}
      fullWidth
      maxWidth='sm'
      scroll='body'
      TransitionComponent={Transition}
      BackdropProps={{ invisible: false }}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DatePickerWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(0)} !important`,
              px: theme => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
              pt: theme => [`${theme.spacing(6)} !important`, `${theme.spacing(8)} !important`]
            }}
          >
            <CustomCloseButton onClick={() => handleSidebarClose()}>
              <Icon icon='tabler:x' fontSize='1.25rem' />
            </CustomCloseButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3 }}>
                Update Booking
              </Typography>
            </Box>
            <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    sx={{ mb: 4 }}
                    label='Name*'
                    onChange={onChange}
                    placeholder='Enter Name'
                    error={Boolean(errors.title)}
                    {...(errors.title && { helperText: errors.title.message })}
                  />
                )}
              />
              <Controller
                name='details'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    sx={{ mb: 4 }}
                    label='Activity'
                    SelectProps={{
                      value: values.calendar,
                      onChange: e => setValues({ ...values, calendar: e.target.value })
                    }}
                  >
                    {store?.activityGroups.length ? (
                      store?.activityGroups?.map((value, index) => (
                        <MenuItem key={index} value={value?.id}>
                          {value?.title}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value=''></MenuItem>
                    )}
                  </CustomTextField>
                )}
              />
              <Box sx={{ mb: 4 }}>
                <DatePicker
                  selectsStart
                  id='event-start-date'
                  endDate={values.endDate}
                  selected={values.startDate}
                  startDate={values.startDate}
                  showTimeSelect={!values.allDay}
                  dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                  customInput={<PickersComponent label='Start Date' registername='startDate' />}
                  onChange={date => setValues({ ...values, startDate: new Date(date) })}
                  onSelect={handleStartDate}
                />
              </Box>
              <Box sx={{ mb: 4 }}>
                <DatePicker
                  selectsEnd
                  id='event-end-date'
                  endDate={values.endDate}
                  selected={values.endDate}
                  minDate={values.startDate}
                  startDate={values.startDate}
                  showTimeSelect={!values.allDay}
                  dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                  customInput={<PickersComponent label='End Date' registername='endDate' />}
                  onChange={date => setValues({ ...values, endDate: new Date(date) })}
                />
              </Box>
              <FormControl sx={{ mb: 4 }}>
                <FormControlLabel
                  label='All Day'
                  control={
                    <Switch
                      checked={values.allDay}
                      onChange={e => setValues({ ...values, allDay: e.target.checked })}
                    />
                  }
                />
              </FormControl>
              <Controller
                name='comment'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    multiline
                    value={value}
                    rows={4}
                    sx={{ mb: 4 }}
                    label='Comment*'
                    onChange={onChange}
                    placeholder='Comment'
                    error={Boolean(errors.details)}
                    {...(errors.details && { helperText: errors.details.message })}
                  />
                )}
              />
              <FormControl sx={{ mb: 4 }}>
                <FormControlLabel
                  label='Add Repeat Booking'
                  checked={repeatBooking}
                  control={<Switch onChange={() => setRepeatBooking(!repeatBooking)} />}
                />
              </FormControl>
              {repeatBooking && (
                <>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}
                  >
                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ mr: 3, width: '100px', color: 'text.secondary' }}>Repeat Every:</Typography>
                      <Controller
                        name='size'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            type='number'
                            value={value}
                            min={1}
                            sx={{ mr: 4 }}
                            defaultValue={1}
                            placeholder='Enter Size'
                            onChange={onChange}
                            error={Boolean(errors.size)}
                            {...(errors.size && { helperText: errors.size.message })}
                          />
                        )}
                      />
                      <Controller
                        name='details'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            select
                            SelectProps={{
                              value: 'day'
                              // onChange: e => setValues({ ...values, calendar: e.target.value })
                            }}
                          >
                            <MenuItem value='day'>Day</MenuItem>
                            <MenuItem value='week'>Week</MenuItem>
                            <MenuItem value='month'>Month</MenuItem>
                          </CustomTextField>
                        )}
                      />
                    </Box>
                  </Box>
                  <Grid container spacing={6}>
                    <Grid item md={8} xs={12}>
                      <DatePicker
                        selectsEnd
                        id='event-end-date'
                        endDate={values.endDate}
                        selected={values.endDate}
                        minDate={values.startDate}
                        startDate={values.startDate}
                        showTimeSelect={!values.allDay}
                        dateFormat={'yyyy-MM-dd hh:mm'}
                        customInput={<PickersComponent label='End Date' registername='endDate' />}
                        onChange={date => setValues({ ...values, endDate: new Date(date) })}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button variant='contained' sx={{ mr: 1 }} type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' onClick={() => handleSidebarClose()}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DatePickerWrapper>
    </Dialog>
    // <Drawer
    //   anchor='right'
    //   open={addEventSidebarOpen}
    //   onClose={handleSidebarClose}
    //   ModalProps={{ keepMounted: true }}
    //   sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
    // >
    //   <Box
    //     className='sidebar-header'
    //     sx={{
    //       p: 6,
    //       display: 'flex',
    //       justifyContent: 'space-between'
    //     }}
    //   >
    //     <Typography variant='h5'>
    //       {store.selectedEvent !== null && store.selectedEvent.title.length ? 'Update Event' : 'Add Event'}
    //     </Typography>
    //     <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //       {store.selectedEvent !== null && store.selectedEvent.title.length ? (
    //         <IconButton
    //           size='small'
    //           onClick={handleDeleteEvent}
    //           sx={{ color: 'text.primary', mr: store.selectedEvent !== null ? 1 : 0 }}
    //         >
    //           <Icon icon='tabler:trash' fontSize='1.25rem' />
    //         </IconButton>
    //       ) : null}
    //       <IconButton
    //         size='small'
    //         onClick={handleSidebarClose}
    //         sx={{
    //           p: '0.375rem',
    //           borderRadius: 1,
    //           color: 'text.primary',
    //           backgroundColor: 'action.selected',
    //           '&:hover': {
    //             backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
    //           }
    //         }}
    //       >
    //         <Icon icon='tabler:x' fontSize='1.25rem' />
    //       </IconButton>
    //     </Box>
    //   </Box>
    //   <Box className='sidebar-body' sx={{ p: theme => theme.spacing(0, 6, 6) }}>
    //     <DatePickerWrapper>
    //       <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
    //         <Controller
    //           name='title'
    //           control={control}
    //           rules={{ required: true }}
    //           render={({ field: { value, onChange } }) => (
    //             <CustomTextField
    //               fullWidth
    //               label='Title'
    //               value={value}
    //               sx={{ mb: 4 }}
    //               onChange={onChange}
    //               placeholder='Event Title'
    //               error={Boolean(errors.title)}
    //               {...(errors.title && { helperText: 'This field is required' })}
    //             />
    //           )}
    //         />
    //         <CustomTextField
    //           select
    //           fullWidth
    //           sx={{ mb: 4 }}
    //           label='Calendar'
    //           SelectProps={{
    //             value: values.calendar,
    //             onChange: e => setValues({ ...values, calendar: e.target.value })
    //           }}
    //         >
    //           <MenuItem value='Personal'>Personal</MenuItem>
    //           <MenuItem value='Business'>Business</MenuItem>
    //           <MenuItem value='Family'>Family</MenuItem>
    //           <MenuItem value='Holiday'>Holiday</MenuItem>
    //           <MenuItem value='ETC'>ETC</MenuItem>
    //         </CustomTextField>
    //         <Box sx={{ mb: 4 }}>
    //           <DatePicker
    //             selectsStart
    //             id='event-start-date'
    //             endDate={values.endDate}
    //             selected={values.startDate}
    //             startDate={values.startDate}
    //             showTimeSelect={!values.allDay}
    //             dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
    //             customInput={<PickersComponent label='Start Date' registername='startDate' />}
    //             onChange={date => setValues({ ...values, startDate: new Date(date) })}
    //             onSelect={handleStartDate}
    //           />
    //         </Box>
    //         <Box sx={{ mb: 4 }}>
    //           <DatePicker
    //             selectsEnd
    //             id='event-end-date'
    //             endDate={values.endDate}
    //             selected={values.endDate}
    //             minDate={values.startDate}
    //             startDate={values.startDate}
    //             showTimeSelect={!values.allDay}
    //             dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
    //             customInput={<PickersComponent label='End Date' registername='endDate' />}
    //             onChange={date => setValues({ ...values, endDate: new Date(date) })}
    //           />
    //         </Box>
    //         <FormControl sx={{ mb: 4 }}>
    //           <FormControlLabel
    //             label='All Day'
    //             control={
    //               <Switch checked={values.allDay} onChange={e => setValues({ ...values, allDay: e.target.checked })} />
    //             }
    //           />
    //         </FormControl>
    //         <CustomTextField
    //           fullWidth
    //           type='url'
    //           id='event-url'
    //           sx={{ mb: 4 }}
    //           label='Event URL'
    //           value={values.url}
    //           placeholder='https://www.google.com'
    //           onChange={e => setValues({ ...values, url: e.target.value })}
    //         />

    //         <CustomTextField
    //           select
    //           fullWidth
    //           label='Guests'
    //           sx={{ mb: 4 }}
    //           SelectProps={{
    //             multiple: true,
    //             value: values.guests,
    //             onChange: e => setValues({ ...values, guests: e.target.value })
    //           }}
    //         >
    //           <MenuItem value='bruce'>Bruce</MenuItem>
    //           <MenuItem value='clark'>Clark</MenuItem>
    //           <MenuItem value='diana'>Diana</MenuItem>
    //           <MenuItem value='john'>John</MenuItem>
    //           <MenuItem value='barry'>Barry</MenuItem>
    //         </CustomTextField>
    //         <CustomTextField
    //           rows={4}
    //           multiline
    //           fullWidth
    //           sx={{ mb: 6.5 }}
    //           label='Description'
    //           id='event-description'
    //           value={values.description}
    //           onChange={e => setValues({ ...values, description: e.target.value })}
    //         />
    //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //           <RenderSidebarFooter />
    //         </Box>
    //       </form>
    //     </DatePickerWrapper>
    //   </Box>
    // </Drawer>
  )
}

export default UpdateEventSidebar
/* eslint-disable */
