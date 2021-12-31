import { createSlice } from '@reduxjs/toolkit'


export const lanMacSlice = createSlice({
  name: 'lanmac',
  initialState: {
    value: '123'
  },
  reducers: {
    changeLanMac: (state, action) => {
      // state.value = action.payload
      state.push(action.payload)

    }
  }
})

// Action creators are generated for each case reducer function
export const { changeLanMac } = lanMacSlice.actions

export default lanMacSlice.reducer
