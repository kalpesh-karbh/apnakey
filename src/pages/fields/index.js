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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/apps/fields'

// ** Custom Table Components Imports
import TableHeader from 'src/views/field/TableHeader'
import AddFieldModel from 'src/views/field/AddFieldModel'

const Fields = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state?.field)

  // ** State
  const [filterName, setFilterName] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [open, setOpen] = useState(false)

  // ** Hooks
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch, store])

  const columns = [
    {
      flex: 0.15,
      maxWidth: 80,
      headerName: 'ID',
      field: 'id',
      renderCell: ({ row }) => {
        return row.id
      }
    },
    {
      flex: 0.15,
      maxWidth: 300,
      headerName: 'Title',
      field: 'title',
      renderCell: ({ row }) => {
        return row?.title
      }
    },
    {
      flex: 0.15,
      maxWidth: 120,
      field: 'Size',
      headerName: 'size',
      renderCell: ({ row }) => {
        return row?.size
      }
    },
    {
      flex: 0.15,
      minWidth: 190,
      field: 'Details',
      headerName: 'details',
      renderCell: ({ row }) => {
        return row?.details
      }
    }
  ]

  const handleFilter = useCallback(val => {
    setFilterName(val)
  }, [])

  const toggleAddFieldModel = () => {
    setOpen(!open)
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={filterName} handleFilter={handleFilter} toggle={toggleAddFieldModel} />
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
        </Card>
      </Grid>
      <AddFieldModel open={open} toggle={toggleAddFieldModel} />
    </Grid>
  )
}

export default Fields
/* eslint-disable */
