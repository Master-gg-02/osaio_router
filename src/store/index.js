import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import lanMacSlice from './counterSlice'

// import * as lanMacActions from './lanMacAction'




// export default{
//   ...lanMacActions,
// }


export default configureStore({
  reducer: {
    counter: counterReducer,
    lanMac:lanMacSlice
  }
})