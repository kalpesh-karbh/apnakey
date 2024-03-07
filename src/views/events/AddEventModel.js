/* eslint-disable */
// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import Icon from 'src/@core/components/icon'
import CustomTextField from 'src/@core/components/mui/text-field'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addEvent } from 'src/store/apps/event'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import firebase from 'firebase/compat/app'
import popMsg from 'src/configs/popup'
import { isObjEmpty, isUserLoggedIn } from 'src/configs/utils'

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

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}))

const AddEventModel = props => {
  const { open, toggle } = props
  const dispatch = useDispatch()
  const [show, setShow] = useState(open)
  const [branchId] = useState(isUserLoggedIn())
  const [imgSrc, setImgSrc] = useState('/images/misc/upload-light.png')
  const [inputValue, setInputValue] = useState('')
  const [file, setFile] = useState(null)
  const [ageRestricted, setAgeRestricted] = useState(false)
  const [startPicker, setStartPicker] = useState(new Date())
  const [endPicker, setEndPicker] = useState(new Date())
  const [entryPicker, setEntryPicker] = useState(new Date())
  const [list, setList] = useState([{ title: '', details: '', cost: 0, maxTickets: 0, perUser: 0 }])

  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
      setFile(files[0])
      if (reader.result !== null) {
        setInputValue(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/images/misc/upload-light.png')
  }

  const showErrors = (field, valueLen, min) => {
    if (valueLen == 0) {
      return `${field} field is required`
    } else if (valueLen > 0 && valueLen < min) {
      return `${field} must be at least ${min} characters`
    } else {
      return ''
    }
  }

  const schema = yup.object().shape({
    title: yup.string().required(),
    details: yup.string().required(),
    address: yup.string().required(),
    startTime: yup.string().required(),
    endTime: yup.string().required(),
    entryTime: yup.string(),
    ageRestricted: yup.boolean(),
    imgUrl: yup.mixed(),
    tickets: yup.array().of(
      yup.object().shape({
        title: yup.string().required(),
        cost: yup.number().required(),
        maxTickets: yup.number().required(),
        perUser: yup.number().required(),
        details: yup.string()
      })
    )
  })

  const defaultValues = {
    title: '',
    details: '',
    address: '',
    startTime: '',
    endTime: '',
    entryTime: '',
    ageRestricted: false,
    imgUrl: '',
    tickets: []
  }

  const handleClose = () => {
    reset()
    toggle()
  }

  const {
    reset,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tickets',
    fields: [{ title: '', cost: 1, maxTickets: 1, perUser: 1, details: '' }]
  })

  const formatDateTime = time => {
    const year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()

    let hour = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()

    if (month < 10) {
      month = `0${month}`
    }
    if (day < 10) {
      day = `0${day}`
    }

    if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    return `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`
  }

  const createFileName = () => {
    const timestamp = Math.floor(Date.now() / 1000)
    const filename = `${timestamp}${branchId}.jpg`
    return filename
  }

  const formatEntryTime = time => {
    let hour = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()

    if (hour < 10) {
      hour = `0${hour}`
    }
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    return `${hour}:${minutes}:${seconds}`
  }

  const uploadImg = path => {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = firebase?.storage()
    // Create a storage reference from our storage service
    const storageRef = storage?.ref()
    if (file) {
      storageRef
        .child('events')
        .child(path)
        .put(file)
        .then(snapshot => {
          console.log('successfully added img')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const onSubmit = data => {
    if (isObjEmpty(errors) && startPicker < endPicker) {
      const fileName = createFileName()
      uploadImg(fileName)
      const params = {
        title: data.title,
        details: data.details,
        address: data.location,
        startTime: formatDateTime(startPicker),
        endTime: formatDateTime(endPicker),
        entryTime: formatEntryTime(entryPicker),
        ageRestricted,
        imgUrl: fileName,
        tickets: data?.tickets
      }
      console.log(params)
      // dispatch(addEvent(params))
      // toggle()
      // reset()
    } else {
      popMsg('form has been filled in incorrectly', 'Error')
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      fullWidth
      maxWidth='sm'
      scroll='body'
      TransitionComponent={Transition}
      BackdropProps={{ invisible: false }}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(0)} !important`,
            px: theme => [`${theme.spacing(3)} !important`, `${theme.spacing(3)} !important`],
            pt: theme => [`${theme.spacing(6)} !important`, `${theme.spacing(8)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => handleClose()}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Create New Event
            </Typography>
          </Box>
          <Box sx={{ p: theme => theme.spacing(0, 6, 6), display: 'flex', alignItems: 'center' }}>
            <ImgStyled src={imgSrc} alt='Profile Pic' />
            <div>
              <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Upload Event Image
                <input
                  hidden
                  type='file'
                  value={inputValue}
                  accept='image/png, image/jpeg'
                  onChange={handleInputImageChange}
                  id='account-settings-upload-image'
                />
              </ButtonStyled>
              <ResetButtonStyled color='secondary' variant='tonal' onClick={handleInputImageReset}>
                Reset
              </ResetButtonStyled>
              <Typography sx={{ mt: 4, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 3MB.</Typography>
            </div>
          </Box>
          <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label='Title*'
                  onChange={onChange}
                  placeholder='Go Karting Platform 3A'
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
                  fullWidth
                  value={value}
                  multiline
                  rows={4}
                  sx={{ mb: 4 }}
                  label='Details*'
                  onChange={onChange}
                  placeholder='Description of the activity'
                  error={Boolean(errors.details)}
                  {...(errors.details && { helperText: errors.details.message })}
                />
              )}
            />
            <Controller
              name='address'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  sx={{ mb: 4 }}
                  label='Location*'
                  onChange={onChange}
                  placeholder='Address'
                  error={Boolean(errors.address)}
                  {...(errors.address && { helperText: errors.address.message })}
                />
              )}
            />
            <Grid container spacing={6}>
              <Grid item md={6} xs={12}>
                <FormControlLabel
                  control={<Switch name='ageRestricted' onChange={() => setAgeRestricted(!ageRestricted)} />}
                  label='Only over 18s'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  name='entryTime'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='time'
                      value={entryPicker}
                      sx={{ mb: 4 }}
                      label='Last Entry Time'
                      placeholder='Enter Size'
                      onChange={e => {
                        setEntryPicker(e.target.value)
                        onChange(e.target.value)
                      }}
                      error={Boolean(errors.entryTime)}
                      {...(errors.entryTime && { helperText: errors.entryTime.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  name='startTime'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='datetime-local'
                      value={startPicker}
                      sx={{ mb: 4 }}
                      label='Start Date and Time*'
                      onChange={e => {
                        onChange(e.target.value)
                        setStartPicker(e.target.value)
                      }}
                      error={Boolean(errors.startTime)}
                      {...(errors.startTime && { helperText: errors.startTime.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  name='endTime'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='datetime-local'
                      value={endPicker}
                      sx={{ mb: 4 }}
                      label='End Date and Time*'
                      onChange={e => {
                        onChange(e.target.value)
                        setEndPicker(e.target.value)
                      }}
                      error={Boolean(errors.endTime)}
                      {...(errors.endTime && { helperText: errors.endTime.message })}
                    />
                  )}
                />
              </Grid>
            </Grid>
            {fields.map((item, index) => (
              <Card sx={{ p: 4, mb: 2 }}>
                <Grid container spacing={6} key={item.id}>
                  <Grid item md={12} xs={12}>
                    <Controller
                      name={`tickets[${index}].title`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          sx={{ mt: 4 }}
                          label={`Ticket Title*`}
                          onChange={onChange}
                          error={Boolean(errors.tickets?.[index]?.title)}
                          {...(errors.tickets?.[index]?.title && {
                            helperText: errors.tickets?.[index]?.title.message
                          })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Controller
                      name={`tickets[${index}].cost`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          type='number'
                          value={value}
                          label={`Ticket Cost*`}
                          onChange={onChange}
                          error={Boolean(errors.tickets?.[index]?.cost)}
                          {...(errors.tickets?.[index]?.cost && {
                            helperText: errors.tickets?.[index]?.cost.message
                          })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Controller
                      name={`tickets[${index}].maxTickets`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          type='number'
                          value={value}
                          label={`Total Tickets*`}
                          onChange={onChange}
                          error={Boolean(errors.tickets?.[index]?.maxTickets)}
                          {...(errors.tickets?.[index]?.maxTickets && {
                            helperText: errors.tickets?.[index]?.maxTickets.message
                          })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Controller
                      name={`tickets[${index}].perUser`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          type='number'
                          value={value}
                          label={`Tickets allowed Per Customer*`}
                          onChange={onChange}
                          error={Boolean(errors.tickets?.[index]?.perUser)}
                          {...(errors.tickets?.[index]?.perUser && {
                            helperText: errors.tickets?.[index]?.perUser.message
                          })}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Controller
                      name={`tickets[${index}].details`}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          multiline
                          rows={4}
                          sx={{ mb: 4 }}
                          label={`Ticket Details`}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12} container spacing={6} justifyContent='center'>
                    <Button variant='outlined' color='error' onClick={() => remove(index)}>
                      <Icon icon='fluent:delete-24-filled' fontSize='1rem' /> Delete
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            ))}
            <Grid item md={6} xs={12}>
              <Button
                variant='outlined'
                color='primary'
                sx={{ mt: 4 }}
                onClick={() => append({ title: '', cost: 1, maxTickets: 1, perUser: 1, details: '' })}
              >
                Add Ticket
              </Button>
            </Grid>
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
          <Button variant='tonal' color='secondary' onClick={() => handleClose()}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddEventModel
/* eslint-disable */
