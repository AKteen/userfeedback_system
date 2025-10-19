import React from 'react';
import './login.css';
import {useState} from 'react';
import axios from 'axios';


import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/user/userSlice";

const Login = () => {

    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const handleSubmit= async ()=>{
        try {
            // Call backend login API
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password
            });

            console.log("Response from backend:", response.data);

            // Extract user object from response
            const user = response.data.user;
            if (!user || !user.role) {
                alert("Login failed: invalid credentials or role missing");
                return;
            }

            // Update Redux state
            dispatch(loginSuccess({ role: user.role }));

            // Clear form
            setEmail('');
            setPassword('');

            // Redirect based on role
            if (user.role === "admin") {
                navigate("/admin");
            } else if (user.role === "user") {
                navigate("/user");
            
            } else if (user.role === "superadmin") {
                navigate("/superadmin");
            } else {
                alert("Login failed: unknown role");
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: server error");
        }
    }


    return (
        <>
        <div className="login-container">
            <h2 className="login-head">Login</h2>
            <div className="login-box">
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="login-input" placeholder="Email" />
                
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="login-input" placeholder="Password" />
                
                <button onClick={handleSubmit} className="login-btn">Login</button>

            </div>
        </div>
        </>
    );
}

export default Login;
