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
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addField, fetchData } from 'src/store/apps/fields'

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

const AddFieldModel = props => {
  const { open, toggle } = props
  const dispatch = useDispatch()
  const [show, setShow] = useState(open)

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
    size: yup
      .number()
      .typeError('Sets field is required')
      .min(1, obj => showErrors('size', obj.value.length, obj.min))
      .required()
  })

  const defaultValues = {
    title: '',
    details: '',
    size: Number(1)
  }

  const handleClose = () => {
    setValue('size', Number(1))
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

  const onSubmit = data => {
    dispatch(addField({ ...data }))
    toggle()
    reset()
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
              New Field Information
            </Typography>
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
                  placeholder='Main Field'
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
                  sx={{ mb: 4 }}
                  label='Details*'
                  onChange={onChange}
                  placeholder='Description of the field'
                  error={Boolean(errors.details)}
                  {...(errors.details && { helperText: errors.details.message })}
                />
              )}
            />
            <Controller
              name='size'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  type='number'
                  value={value}
                  sx={{ mb: 4 }}
                  min={1}
                  defaultValue={1}
                  label='Sets*'
                  placeholder='Enter Size'
                  onChange={onChange}
                  error={Boolean(errors.size)}
                  {...(errors.size && { helperText: errors.size.message })}
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
          <Button variant='tonal' color='secondary' onClick={() => handleClose()}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddFieldModel
/* eslint-disable */
