import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit'
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
  reducers: {},
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
      state.isLoading=true
      state.isSuccess=false
      state.isError=true
      state.message=action.payload
    })
  }
});

export const {} = ReviewSlice.actions

export default ReviewSlice.reducer

export const reviewText=createAsyncThunk('FETCH/RESPONSE',async(codeSnippet,thunkAPI)=>{
try {
  return await ReviewText(codeSnippet)
} catch (error) {
  let message = error.response.data.message
  return thunkAPI.rejectWithValue(message)
}
})