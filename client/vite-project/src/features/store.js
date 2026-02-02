import { configureStore } from "@reduxjs/toolkit";
import review from './review/ReviewSlice'
const store =configureStore({
    reducer:{review}
})

export default store