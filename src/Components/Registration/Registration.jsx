import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from '../../data';

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        image_profile:'null',
        phone: '',
        email: '',
        password: '',
    });

    const [nonForm, setNonForm] = useState({
        confirmPassword: '',
        agreeToTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name in formData) {
            setFormData({
                ...formData,
                [name]: value
            });
        } else {
            setNonForm({
                ...nonForm,
                [name]: type === 'checkbox' ? checked : value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (formData.password !== nonForm.confirmPassword) {
        //     alert('Passwords do not match!');
        //     return;
        // }

        if (!nonForm.agreeToTerms) {
            alert('You must agree to the terms and conditions!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            alert("Successfully Registered Please Login Now")
            navigate('/login')
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="login">
                <div className="login-in">
                    <h5>Registration</h5>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Enter Mobile Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Enter Email ID"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={nonForm.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <ul className="checkbox-list">
                            <li className="left">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    checked={nonForm.agreeToTerms}
                                    onChange={handleChange}
                                />{' '}
                                I agree to <a href="#">privacy policy and terms</a>
                            </li>
                        </ul>
                        <button type="submit">Register</button>
                        <div className="signin">
                            <p>
                                Already have an account? <Link to="/login">Log In</Link>.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Registration;
