import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <>
        <div className="load-container">
            <div className="load-box">
                <p className="load-text"><div className="loader"></div>Loading...</p>
            </div>
        </div>
        </>
    );
}

export default Loading;
