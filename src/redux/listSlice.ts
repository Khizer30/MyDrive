import { createSlice } from "@reduxjs/toolkit" ;

export const listSlice = createSlice({
  name: "list",
  initialState: 
  { 
    value: "[]" 
  },
  reducers: 
  {
    setList: (state: any, action: any): void =>
    {
      state.value = action.payload ;
    }
  }
})

// Exports
export const { setList } = listSlice.actions ;
export default listSlice.reducer ;