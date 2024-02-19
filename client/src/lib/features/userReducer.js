import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        data: null,
     },
    reducers: {
        setUserData: (state, action) => { 
            state.data = action.payload
         },
        clearUserData: (state) => { 
            state.data = null;
        },
    },
})

// Extract and export each action creator by name
export const { setUserData, clearUserData } = userSlice.actions
// Export the reducer, either as a default or named export
export default userSlice.reducer