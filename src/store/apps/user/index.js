/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
// import axios from 'axios'
import AxiosInstance from 'src/configs/AxiosInstance'
import { PROFILE, CONTACTS, PAYMENT } from 'src/configs/Endpoints'

// ** Fetch Account Details
export const fetchData = createAsyncThunk('appUsers/fetchData', async () => {
  const response = await AxiosInstance.get(PROFILE)
  if (response.status != 200) {
    popMsg('something went wrong please try again', 'Error')
  }
  return response.data
})

// ** Update Profile
export const updateProfile = createAsyncThunk('appUsers/updateProfile', async (data, { getState, dispatch }) => {
  const response = await AxiosInstance.put(PROFILE, {
    data
  })
  if (response.status === 200) {
    popMsg('Account Update Successfully', 'Success')
    await dispatch(fetchData())
  } else {
    popMsg('something went wrong', 'Error')
  }
  return response.data
})

// **Add Contact
export const addContact = createAsyncThunk('appUsers/addContact', async (data, { getState, dispatch }) => {
  const response = await AxiosInstance.post(CONTACTS, {
    data
  })
  if (response.status === 200) {
    popMsg('Contact Add Successfully', 'Success')
    await dispatch(fetchData())
  } else {
    popMsg('something went wrong', 'Error')
  }
  return response.data
})

// ** Delete Contact
export const deleteContact = createAsyncThunk('appUsers/deleteContact', async (id, { getState, dispatch }) => {
  const response = await AxiosInstance.delete(CONTACTS, {
    data: id
  })
  if (response.status === 200) {
    popMsg('Contact Deleted Successfully', 'Success')
    await dispatch(fetchData())
  } else {
    popMsg('something went wrong', 'Error')
  }
  return response.data
})

// ** Fetch Payment Details
export const fetchPayment = createAsyncThunk('appUsers/fetchPayment', async params => {
  const response = await AxiosInstance.get(PAYMENT)
  if (response.status != 200) {
    popMsg('something went wrong please try again', 'Error')
  }
  return response.data
})

// ** Update Payment Details
export const updatePayment = createAsyncThunk('appUsers/updatePayment', async (data, { getState, dispatch }) => {
  const response = await AxiosInstance.post(PAYMENT, {
    data
  })
  if (response.status === 200) {
    popMsg('Payment Method Update Successfully', 'Success')
    await dispatch(fetchData())
  } else {
    popMsg('something went wrong', 'Error')
  }
  return response.data
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    contacts: [],
    payment: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
      state.contacts = action.payload.contacts
    })
    builder.addCase(fetchPayment.fulfilled, (state, action) => {
      state.payment = action.payload
    })
  }
})

export default appUsersSlice.reducer
/* eslint-disable */
