import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    name: "",
    role: "",
    isAuth: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setname: (state, action) => {
            state.name = action.payload.name;
        },
        loginSuccess: (state, action) => {
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.isAuth = true;
            localStorage.setItem('auth', JSON.stringify({
                name: state.name,
                role: state.role,
                isAuth: state.isAuth
            }))


        },
        logout: (state) => {
            state.isAuth = false;
            state.role = null;
            localStorage.removeItem('auth');
        }
    }
});

export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;