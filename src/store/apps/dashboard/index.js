// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import AxiosInstance from 'src/configs/AxiosInstance'
import { REPORT } from 'src/configs/Endpoints'

// ** Fetch Dashboard Statics
export const fetchData = createAsyncThunk('appDashboard/fetchData', async () => {
  const response = await AxiosInstance.get(`${REPORT}`)

  return response.data
})

export const appDashboardSlice = createSlice({
  name: 'appDashboard',
  initialState: {
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.allData = action.payload
    })
  }
})

export default appDashboardSlice.reducer
