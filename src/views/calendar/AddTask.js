/* eslint-disable */
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
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

const AddTask = props => {
  // ** Props
  const { store, dispatch, addEvent, updateEvent, calendarApi, handleSelectEvent, addTaskOpen, handleAddTaskToggle } =
    props

  // ** States
  const [values, setValues] = useState(defaultState)

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
    handleAddTaskToggle()
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
  }, [addTaskOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent])

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

  // const RenderSidebarFooter = () => {
  //   if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
  //     return (
  //       <Fragment>
  //         <Button type='submit' variant='contained' sx={{ mr: 4 }}>
  //           Add
  //         </Button>
  //         <Button variant='tonal' color='secondary' onClick={resetToEmptyValues}>
  //           Reset
  //         </Button>
  //       </Fragment>
  //     )
  //   } else {
  //     return (
  //       <Fragment>
  //         <Button type='submit' variant='contained' sx={{ mr: 4 }}>
  //           Update
  //         </Button>
  //         <Button variant='tonal' color='secondary' onClick={resetToStoredValues}>
  //           Reset
  //         </Button>
  //       </Fragment>
  //     )
  //   }
  // }

  return (
    <Dialog
      open={addTaskOpen}
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
                Add Task
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
              <Box sx={{ mb: 4 }}>
                <DatePicker
                  id='task-date-time'
                  selected={values.startDate}
                  showTimeSelect={true}
                  dateFormat={'yyyy-MM-dd hh:mm'}
                  customInput={<PickersComponent label='Date & Time' registername='startDate' />}
                  onChange={date => setValues({ ...values, startDate: new Date(date) })}
                  onSelect={handleStartDate}
                />
              </Box>
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
  )
}

export default AddTask
/* eslint-disable */
