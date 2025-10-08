import React from 'react';
import './login.css';
import {useState} from 'react';
import axios from 'axios';


const Login = () => {

    const [name, setName]= useState('');
    const [password, setPassword]= useState('');
    
    const handleSubmit= async ()=>{
        try{
            await axios.post('http://localhost:5000/login', {name:name, password: password});
            setName('');
            setPassword('');
            console.log('login credential sent');
        }catch(error){
            console.error(error);
            console.log("failed to send login creds");
        }
    }


    return (
        <>
        <div className="login-container">
            <h2 className="login-head">Login</h2>
            <div className="login-box">
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="login-input" placeholder="Username" />
                
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="login-input" placeholder="Password" />
                
                <button onClick={handleSubmit} className="login-btn">Login</button>

            </div>
        </div>
        </>
    );
}

export default Login;
