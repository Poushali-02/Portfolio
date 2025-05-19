import React, { useState } from "react";
import './Contacts.css';
import { validateContent } from './contentValidation';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState(''); // form submission status
    const [errors, setErrors] = useState({}); // form validation errors
    const [canSubmit, setCanSubmit] = useState(true); // form submission state
    const [isLoading, setIsLoading] = useState(false); // loading state

    const validateField = (name, value) => {
        switch(name) {
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailPattern.test(value) ? 'Please enter a valid email address' : null;
            case 'name':
                if (value.length < 2) return 'Name must be at least 2 characters long';
                if (!/^[a-zA-Z\s]*$/.test(value)) return 'Name should only contain letters and spaces';
                return null;
            case 'message':
                return validateContent(value);
            default:
                return null;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate on change
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error || undefined
        }));
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setStatus('');
        setIsLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit || isLoading) {
            setStatus('rate-limited');
            return;
        }

        // Final validation of all fields
        const newErrors = {};
        Object.keys(formData).forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setStatus('sending');
        setIsLoading(true);
        setCanSubmit(false);

        try {
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                resetForm();
                // Reset submission ability after 1 minute
                setTimeout(() => setCanSubmit(true), 60000);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
            setIsLoading(false);
            // Reset submission ability after 30 seconds on error
            setTimeout(() => setCanSubmit(true), 30000);
        }
    };

    return (
        <div className='contact'>
            <h2>Contact Me</h2>
            <div className="contact-form">
                <p>Get in touch...</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            maxLength={50}
                            required
                            disabled={isLoading}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            maxLength={100}
                            required
                            disabled={isLoading}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows="5"
                            maxLength={500}
                            required
                            disabled={isLoading}
                        ></textarea>
                        {errors.message && <span className="error">{errors.message}</span>}
                        <span className="char-count">{formData.message.length}/500</span>
                    </div>

                    <button 
                        type="submit" 
                        disabled={!canSubmit || Object.keys(errors).length > 0 || isLoading}
                    >
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>

                    {status === 'success' && (
                        <p className="success-message">Message sent successfully!</p>
                    )}
                    {status === 'error' && (
                        <p className="error-message">Failed to send message. Please try again.</p>
                    )}
                    {status === 'rate-limited' && (
                        <p className="error-message">Please wait before sending another message.</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Contact;