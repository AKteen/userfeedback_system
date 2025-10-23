import React from 'react';
import './login.css';
import { useState } from 'react';
import axios from 'axios';




import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/user/userSlice";

const Login = () => {




    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector((state) => state.auth.isAuth);
    const role = useSelector((state) => state.auth.role);

    const handleSubmit = async (e) => {
        e.preventDefault();
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

            console.log("role", user.role);


            // Update Redux state
            dispatch(loginSuccess({ role: user.role, name: user.name }));


            switch (user.role) {
            case "admin":
                navigate("/admin", { replace: true });
                break;
            case "user":
                navigate("/user", { replace: true });
                break;
            case "superadmin":
                navigate("/superadmin", { replace: true });
                break;
            default:
                navigate("/", { replace: true });
        }


            // Clear form
            setEmail('');
            setPassword('');

            // Redirect based on role


        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: server error");
        }
    }

    const goToLogin= ()=>{
        navigate("/register", {replace: true  });
    }

    

    return (
        <>
            <div className="login-container">
                <h2 className="login-head">Login</h2>
                <div className="login-box">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" placeholder="Email" />

                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" placeholder="Password" />

                    <button onClick={handleSubmit} className="login-btn">Login</button>

                </div>
                <button className="register-btn" onClick={goToLogin}>New? Register user</button>
            </div>
        </>
    );
}

export default Login;
