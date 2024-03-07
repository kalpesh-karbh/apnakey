/* eslint-disable */
import { useState, useEffect, useCallback, forwardRef } from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import Box from '@mui/material/Box'
import CustomTextField from 'src/@core/components/mui/text-field'
import { styled } from '@mui/material/styles'
import Fade from '@mui/material/Fade'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import MuiTabList from '@mui/lab/TabList'
import DatePicker from 'react-datepicker'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import toast from 'react-hot-toast'

import { useDispatch, useSelector } from 'react-redux'
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchEvents } from 'src/store/apps/event'

// ** Custom Table Components Imports
import TableHeader from 'src/views/events/TableHeader'
import AddEventModel from 'src/views/events/AddEventModel'

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2)
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: '#fff !important'
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

const Events = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state?.event)

  // ** State
  const [value, setValue] = useState('')
  const [tabSelect, setTabSelect] = useState('1')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState(new Date())

  const handleChange = (event, newValue) => {
    setTabSelect(newValue)
  }

  // ** Hooks
  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  const renderClient = row => {
    if (row?.downloadableImgUrl) {
      return <CustomAvatar src={row?.downloadableImgUrl} sx={{ mr: 2.5, width: 38, height: 38 }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={'primary'}
          sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
        >
          {getInitials(row?.title)}
        </CustomAvatar>
      )
    }
  }

  const RowOptions = ({ id }) => {
    // ** Hooks
    const dispatch = useDispatch()

    // ** State
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    const handleDelete = () => {
      dispatch(deleteUser(id))
      handleRowOptionsClose()
    }

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='tabler:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            href='/apps/user/view/account'
            onClick={handleRowOptionsClose}
          >
            <Icon icon='tabler:eye' fontSize={20} />
            View
          </MenuItem>
          <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:edit' fontSize={20} />
            Edit
          </MenuItem>
        </Menu>
      </>
    )
  }

  const columns = [
    {
      flex: 0.1,
      headerName: 'ID',
      field: 'id',
      renderCell: ({ row }) => {
        return row.id
      }
    },
    {
      flex: 0.5,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        const { title } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {title}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.3,
      headerName: 'Location',
      field: 'location',
      renderCell: ({ row }) => {
        return row?.address
      }
    },
    {
      flex: 0.15,
      maxWidth: 150,
      headerName: 'Start Time',
      field: 'startDateTime',
      renderCell: ({ row }) => {
        return `${new Date(row.startDateTime).toLocaleDateString('en-GB', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit'
        })}${' '} ${new Date(row.startDateTime).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })}`
      }
    },
    {
      flex: 0.15,
      maxWidth: 150,
      headerName: 'End Time',
      field: 'endDateTime',
      renderCell: ({ row }) => {
        return `${new Date(row?.endDateTime).toLocaleDateString('en-GB', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit'
        })}${' '} ${new Date(row?.endDateTime).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })}`
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row.id} />
    }
  ]

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const toggleAddEventModel = () => {
    setOpen(!open)
  }

  const hideText = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Card>
            <Divider sx={{ m: '0 !important' }} />
            <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddEventModel} />
            <TabContext value={tabSelect}>
              <Box
                sx={{
                  py: 2,
                  px: 3
                }}
              >
                <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <TabList
                    textColor='secondary'
                    backgroundColor='secondary'
                    indicatorColor='secondary'
                    scrollButtons='auto'
                    onChange={handleChange}
                  >
                    <Tab
                      value='1'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize='1.25rem' icon='tabler:clock' />
                          {!hideText && 'Upcoming Events'}
                        </Box>
                      }
                    />
                    <Tab
                      value='2'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize='1.25rem' icon='tabler:history' />
                          {!hideText && 'Past Events'}
                        </Box>
                      }
                    />
                  </TabList>
                </Box>
              </Box>
              <TabPanel value='1'>
                <Typography variant='h4' sx={{ mb: 4 }}>
                  Upcoming Events
                </Typography>
                <DataGrid
                  autoHeight
                  rowHeight={62}
                  rows={store?.data}
                  columns={columns}
                  disableRowSelectionOnClick
                  pageSizeOptions={[10, 25, 50]}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                />
              </TabPanel>
              <TabPanel value='2'>
                <Typography variant='h4' sx={{ mb: 4 }}>
                  Past Events
                </Typography>
                <DataGrid
                  autoHeight
                  rowHeight={62}
                  rows={store?.data}
                  columns={columns}
                  disableRowSelectionOnClick
                  pageSizeOptions={[10, 25, 50]}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                />
              </TabPanel>
            </TabContext>
          </Card>
        </Grid>
        <AddEventModel open={open} toggle={toggleAddEventModel} />
      </Grid>
    </>
  )
}

export default Events
/* eslint-disable */
