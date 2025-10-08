import React, { useState } from 'react';
import axios from 'axios';
import './superadmin.css';

const Superadmin = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [fieldType, setFieldType] = useState('Text');
    const [options, setOptions] = useState('');
    const [fields, setFields] = useState([]);
    const [role, setRole] = useState('Both');
    const [responses, setResponses] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const sendTemplate = async (e) => {
        e.preventDefault();
        try {
            const feilds = fields.map(field => ({
                label: field.name,
                type: field.type,
                options: field.options
            }));
            const template = { title, description, feilds, role };
            await axios.post('http://localhost:5000/template', template);
            console.log('Template sent successfully');
            setTitle('');
            setDescription('');
            setFields([]);
            setRole('Both');
        } catch (error) {
            console.error('Failed to send template:', error);
        }
    };

    const addField = () => {
        if (fieldName) {
            const newField = {
                name: fieldName,
                type: fieldType,
                options: (fieldType === 'Options' || fieldType === 'Radio') ? options.split(',').map(opt => opt.trim()) : []
            };
            setFields([...fields, newField]);
            setFieldName('');
            setOptions('');
        }
    };

    const fetchResponses = async () => {
        setShowPopup(true);
        try {
            const response = await axios.get('http://localhost:5000/response');
            setResponses(response.data || []);
        } catch (error) {
            console.error('Failed to fetch responses:', error);
            setResponses([]);
        }
    };

    const deleteResponse = async (index) => {
        try {
            await axios.delete(`http://localhost:5000/response/${index}`);
            setResponses(responses.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Failed to delete response:', error);
        }
    };

    const deleteCurrentTemplate = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/template');
            console.log('Template deleted successfully');
            alert('Current template deleted successfully');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert('There is no template to delete');
            } else {
                console.error('Failed to delete template:', error);
                alert('Failed to delete template');
            }
        }
    };

    return (
        <>
        <div className="template-container">
                <h2 className="subheads">Create Dynamic Form</h2>
                <div className="button-container">
                    <button className="responses-btn" type="button" onClick={fetchResponses}>See Responses</button>
                    <button className="responses-btn" type="button" onClick={deleteCurrentTemplate}>Delete Template</button>
                </div>
            <div className="template-box">
            <form onSubmit={sendTemplate}>
            
            <label className="template-label">Title</label>
            <input 
                className="template-input" 
                placeholder="Title of the form"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            
            <label className="template-label">Description of Form</label>
            <input 
                className="template-input" 
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            
            <h3 className="subheadh3">Fields</h3>

            <label className="template-label">Field Name</label>
            <input 
                className="template-input" 
                placeholder="Field Name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
            />
            
            <label className="template-label">Select Field type</label>
            <select 
                className="template-select"
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
            >
                <option>Text</option>
                <option>Textarea</option>
                <option>Number</option>
                <option>Email</option>
                <option>Options</option>
                <option>Radio</option>
            </select>

            {(fieldType === 'Options' || fieldType === 'Radio') && (
                <div className="options-input">
                    <label className="template-label">Options (comma separated)</label>
                    <input 
                        className="template-input"
                        placeholder="Option1, Option2, Option3"
                        value={options}
                        onChange={(e) => setOptions(e.target.value)}
                    />
                </div>
            )}

            <button type="button" className="add-field-btn" onClick={addField}>Add Field</button>

            <br/>
            <br/>
            <label className="template-label">Field Box</label>
            <div className="field-box">
                {fields.map((field, index) => (
                    <div key={index} className="field-item">
                        <span>{field.name} ({field.type})</span>
                        {field.options.length > 0 && <span> - {field.options.join(', ')}</span>}
                    </div>
                ))}
            </div>

            <label className="template-label">Send to Role</label>
            <select 
                className="template-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option>User</option>
                <option>Admin</option>
                <option>Both</option>
            </select>

            <button className="submit-btn" type="submit">Create Template</button>

            </form>

            <div className="preview-form">
                <h3 className="subheadsh2">Preview</h3>
                <div className="preview-content">
                    <h4>{title || 'Form Title'}</h4>
                    <p>{description || 'Form Description'}</p>
                    {fields.map((field, index) => (
                        <div key={index} className="preview-field">
                            <label>{field.name}</label>
                            {field.type === 'Options' ? (
                                <select>
                                    {field.options.map((opt, i) => <option key={i}>{opt}</option>)}
                                </select>
                            ) : field.type === 'Radio' ? (
                                <div>
                                    {field.options.map((opt, i) => (
                                        <label key={i} className="radio-option">
                                            <input type="radio" name={field.name} value={opt} />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            ) : field.type === 'Textarea' ? (
                                <textarea rows="4" />
                            ) : (
                                <input type={field.type.toLowerCase()} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="popup-header">
                            <h3>Form Responses</h3>
                            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
                        </div>
                        <div className="responses-list">
                            {responses.length > 0 ? (
                                responses.map((response, index) => (
                                    <div key={index} className="response-item">
                                        <div className="response-header">
                                            <h4>Response {index + 1} - {response.role || 'Unknown'}</h4>
                                            <button 
                                                className="delete-response-btn" 
                                                onClick={() => deleteResponse(index)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        {Object.entries(response).filter(([key]) => key !== 'role').map(([key, value]) => (
                                            <p key={key}><strong>{key}:</strong> {value}</p>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <p>No responses yet</p>
                            )}
                        </div>
                    </div>
                </div>
            )}



        </div>
        </>
    );
}

export default Superadmin;
