import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    userRole: null,
    isAuth: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action)=>{
            state.userRole= action.payload.role;
            state.isAuth = true;
        },
        logout: (state)=>{
            state.isAuth= false;
            state.userRole= null;
        }
    }
});

export const {logout, loginSuccess}= authSlice.actions;
export default authSlice.reducer;