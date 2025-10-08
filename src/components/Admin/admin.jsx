import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const User = () => {
    const [template, setTemplate] = useState(null);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        fetchTemplate();
    }, []);

    const fetchTemplate = async () => {
        try {
            const response = await axios.get('http://localhost:5000/template');
            const templates = response.data.templates || [];
            
            // Filter templates for User role
            const userTemplate = templates.find(template => 
                template.role === 'Admin' || template.role === 'Both'
            );
            
            setTemplate(userTemplate || null);
        } catch (error) {
            console.error('Failed to fetch template:', error);
        }
    };

    const handleInputChange = (fieldName, value) => {
        setResponses(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const sendResponse = async () => {
        try {
            const responseData = {
                ...responses,
                role: 'Admin'
            };
            await axios.post('http://localhost:5000/response', responseData);
            console.log('Response sent successfully');
            setResponses({});
        } catch (error) {
            console.error('Failed to send response:', error);
        }
    };

    return (
        <>
        <div className="user-container">
            <h2 className="user-head">Admin Form</h2>
            <div className="user-box">
                {template ? (
                    <div className="form-content">
                        <h3>{template.title}</h3>
                        <p>{template.description}</p>
                        {template.feilds.map((field, index) => (
                            <div key={index} className="form-field">
                                <label>{field.label}</label>
                                {field.type === 'Options' ? (
                                    <select 
                                        value={responses[field.label] || ''}
                                        onChange={(e) => handleInputChange(field.label, e.target.value)}
                                    >
                                        <option value="">Select an option</option>
                                        {field.options.map((opt, i) => (
                                            <option key={i} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                ) : field.type === 'Radio' ? (
                                    <div>
                                        {field.options.map((opt, i) => (
                                            <label key={i} className="radio-label">
                                                <input 
                                                    type="radio" 
                                                    name={field.label} 
                                                    value={opt}
                                                    checked={responses[field.label] === opt}
                                                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                                                />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                ) : field.type === 'Textarea' ? (
                                    <textarea 
                                        value={responses[field.label] || ''}
                                        onChange={(e) => handleInputChange(field.label, e.target.value)}
                                        rows="4"
                                    />
                                ) : (
                                    <input 
                                        type={field.type.toLowerCase()}
                                        value={responses[field.label] || ''}
                                        onChange={(e) => handleInputChange(field.label, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                        <button className="submit-response-btn" onClick={sendResponse}>
                            Submit Response
                        </button>
                    </div>
                ) : (
                    <p className="no-forms-text">No forms available</p>
                )}
            </div>
        </div>
        </>
    );
}

export default User;
