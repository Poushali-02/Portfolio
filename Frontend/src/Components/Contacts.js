import React, { useState } from "react";
import './Contacts.css';
import { validateContent } from './contentValidation';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submission started');
        setErrors({});

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /@.*\./;
        if (!emailRegex.test(formData.email)) {
            setErrors(prev => ({
                ...prev,
                email: 'Please enter a valid email address'
            }));
            return;
        }

        // Content validation for abusive messages
        const contentError = validateContent(formData.message);
        if (contentError) {
            setErrors(prev => ({
                ...prev,
                message: contentError
            }));
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                alert('Message sent successfully!');
            } else {
                throw new Error(data.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="contact">
            <h2>Contact Me</h2>
            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows="5"
                            required
                        ></textarea>
                        {errors.message && <p className="error-message">{errors.message}</p>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>

                    {status === 'success' && (
                        <p className="success-message">Message sent successfully!</p>
                    )}
                    {status === 'error' && (
                        <p className="error-message">Failed to send message. Please try again.</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Contact;