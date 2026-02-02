import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ReviewText } from './ReviewService';

const initialState = {
    review: null,
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:'',
    
}

const ReviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    clearReview: (state) => {
      state.review = null
      state.isError = false
      state.message = ''
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(reviewText.pending,(state,action)=>{
      state.isLoading=true
      state.isSuccess=false
      state.isError=false
    })
    .addCase(reviewText.fulfilled,(state,action)=>{
      state.isLoading=false
      state.isSuccess=true
      state.review=action.payload
      state.isError=false
    })
    .addCase(reviewText.rejected,(state,action)=>{
      state.isLoading=false
      state.isSuccess=false
      state.isError=true
      state.message=action.payload
    })
  }
});

export const { clearReview } = ReviewSlice.actions

export default ReviewSlice.reducer

export const reviewText=createAsyncThunk('FETCH/RESPONSE',async(codeSnippet,thunkAPI)=>{
try {
  return await ReviewText(codeSnippet)
} catch (error) {
  const message = error.response?.data?.message ?? error.message ?? 'Request failed. Please try again.'
  return thunkAPI.rejectWithValue(message)
}
})