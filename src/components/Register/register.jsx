import React from 'react';
import './register.css';

import { useState } from 'react';
import axios from 'axios';


import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";



const Register = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const register = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/register', {
                name,
                email,
                password,
                role: 'user'
            });

            console.log('User registered successfully:', res.data);
            navigate('/');
        }catch(error){
            console.error("Register failed:", error.message);
        }
    }


    return (
        <>
            <div className="login-container">
                <h2 className="login-head">SignUp</h2>
                <div className="login-box">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="login-input" placeholder="Name" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" placeholder="Email" />

                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" placeholder="Password" />

                    <button onClick={register} className="login-btn">Register</button>

                </div>
            </div>
        </>
    );
}

export default Register;
