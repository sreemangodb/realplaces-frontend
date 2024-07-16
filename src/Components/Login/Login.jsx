import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from '../../data';
import Cookies from 'js-cookie';

const Login = ({setIsLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${base_url}/users/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                alert('Invalid email or password');
            }

            const result = await response.json();
            console.log('Login successful:', result);

const expirationDate = new Date();
expirationDate.setDate(expirationDate.getDate() + 7);
            Cookies.set('userEmail', result.email,  { expires: expirationDate });
            setIsLogin(true);
            navigate('/'); // Adjust the path as needed
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="login">
                <div className="login-in">
                    <h5>Login</h5>
                    <h6>Adventure starts here</h6>
                    <hr />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter Email ID"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="psw"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <ul className="checkbox-list">
                            <li className="left">
                                <input type="checkbox" name="checkbox" defaultChecked /> Remember me
                            </li>
                            <li className="right">
                                <a href="forgot-password.php">Forgot Password?</a>
                            </li>
                        </ul>
                        <button type="submit">Login</button>
                        <p>
                            New on our platform? <Link to="/registration">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
