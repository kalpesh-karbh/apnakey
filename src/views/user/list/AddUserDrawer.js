// @ts-ignore
// ** React Imports
import { forwardRef } from 'react'

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

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
// import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
// import { addUser } from 'src/store/apps/user'

// const showErrors = (field, valueLen, min) => {
//   if (valueLen === 0) {
//     return `${field} field is required`
//   } else if (valueLen > 0 && valueLen < min) {
//     return `${field} must be at least ${min} characters`
//   } else {
//     return ''
//   }
// }

// const Header = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(6),
//   justifyContent: 'space-between'
// }))

// const schema = yup.object().shape({
//   company: yup.string().required(),
//   billing: yup.string().required(),
//   country: yup.string().required(),
//   email: yup.string().email().required(),
//   contact: yup
//     .number()
//     .typeError('Contact Number field is required')
//     .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
//     .required(),
//   fullName: yup
//     .string()
//     .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
//     .required(),
//   username: yup
//     .string()
//     .min(3, obj => showErrors('Username', obj.value.length, obj.min))
//     .required()
// })

// const defaultValues = {
//   email: '',
//   company: '',
//   country: '',
//   billing: '',
//   fullName: '',
//   username: '',
//   contact: Number('')
// }

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** State

  // const [plan, setPlan] = useState('basic')
  // const [role, setRole] = useState('subscriber')

  // ** Hooks
  // const dispatch = useDispatch()
  // const store = useSelector(state => state.user)

  // const {
  //   reset,
  //   control,
  //   setValue,
  //   setError,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm({
  //   defaultValues,
  //   mode: 'onChange',
  //   resolver: yupResolver(schema)
  // })

  // const onSubmit = data => {
  //   if (store.allData.some(u => u.email === data.email || u.username === data.username)) {
  //     store.allData.forEach(u => {
  //       if (u.email === data.email) {
  //         setError('email', {
  //           message: 'Email already exists!'
  //         })
  //       }
  //       if (u.username === data.username) {
  //         setError('username', {
  //           message: 'Username already exists!'
  //         })
  //       }
  //     })
  //   } else {
  //     dispatch(addUser({ ...data, role, currentPlan: plan }))
  //     toggle()
  //     reset()
  //   }
  // }

  const handleClose = () => {
    // setPlan('basic')
    // setRole('subscriber')
    // setValue('contact', Number(''))
    toggle()

    // reset()
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

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        maxWidth='md'
        scroll='body'
        onClose={() => handleClose()}
        TransitionComponent={Transition}
        onBackdropClick={() => handleClose()}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => handleClose()}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
              New Field Information
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={12} xs={12}>
              <CustomTextField fullWidth label='Title' placeholder='Main Field' />
            </Grid>
            <Grid item sm={12} xs={12}>
              <CustomTextField fullWidth label='Details' placeholder='Description of the field' multiline />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth defaultValue='1' label='Sets' min='0' />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 1 }} onClick={() => handleClose()}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={() => handleClose()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SidebarAddUser
