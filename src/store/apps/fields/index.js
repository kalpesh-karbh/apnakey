/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import AxiosInstance from 'src/configs/AxiosInstance'
import { FIELD } from 'src/configs/Endpoints'
import popMsg from 'src/configs/popup'

// ** Fetch Fields
export const fetchData = createAsyncThunk('appFields/fetchData', async () => {
  const response = await AxiosInstance.get(FIELD)
  if (response.status != 200) {
    popMsg('something went wrong please try again', 'Error')
  }
  return response.data
})

// ** Add Field
export const addField = createAsyncThunk('appFields/addField', async (data, { dispatch }) => {
  const response = await AxiosInstance.put(`${FIELD}?title=${data?.title}&details=${data?.details}&size=${data?.size}`)
  if (response.status === 200) {
    popMsg('Field Add Successfully', 'Success')
    dispatch(fetchData())
  } else {
    popMsg('Form is not entered correctly', 'Error')
  }
  return response.data
})

export const appFieldsSlice = createSlice({
  name: 'appFields',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default appFieldsSlice.reducer
/* eslint-disable */
