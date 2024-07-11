/* eslint-disable no-unused-vars */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


// eslint-disable-next-line react/prop-types
const LoginRegister = () => {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [name, setName] = useState("")
    const [alias, setAlias] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // const [confirmPasswordError, setConfirmPasswordError] = useState(""); //must add this as no validation in our user model
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})


    const handleLogin = (e) => {
        e.preventDefault()
        const newLogin = {
            loginEmail,
            loginPassword
        }

        axios.post("http://localhost:8000/api/users/login", newLogin)
            .then(data => {
                console.log(data);
                console.log("Login Attempt Sent!");
                // onLogin(data.data)
                localStorage.setItem('user', JSON.stringify(data.data))
                navigate("/bright_ideas");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data)
                console.log(errors) //shows User Not Found -> refer to /backend/users.controllers.js -> line 71
            })
    };

    const HandleRegister = (e) => {
        e.preventDefault()
        // const hashedVariables = encryptPassword(password)
        // setPassword(hashedVariables.hashedPassword);
        // const salt = hashedVariables.salt;

        const newUser = {
            name,
            alias,
            email,
            password,
            confirmPassword
        }

        console.log(newUser);
        //send new data via post request
        axios.post("http://localhost:8000/api/users", newUser)
            .then(resp => {
                console.log(resp.data);
                console.log("Register Attempt Sent!");
                localStorage.setItem('user', JSON.stringify(resp.data))
                navigate("/bright_ideas");
            })
            .catch(err => {
                // console.log(typeof(err.response.data.errors))
                console.log(err.response.data.errors)
                const errs = err.response.data.errors
                // if (!confirmPassword || confirmPassword !== password)
                //     Object.defineProperty(err.response.data.errors,"confirmPassword",{value: "Confirm Password must match Password" });
                setErrors(errs)
                console.log(errors)
            })
    };

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6'>
                    {/* register Form */}
                    <h2>Register</h2>
                    <form onSubmit={HandleRegister}>
                        <div className='form-group'>
                            <label htmlFor="name"></label>
                            <input type="text" className="form-control" id="name" onChange={(e) => (setName(e.target.value))} placeholder="Name"></input>
                            {errors.name && <span style={{ "color": "red" }}><p>{errors.name.message}</p></span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="alias"></label>
                            <input type="text" className="form-control" id="alias" onChange={(e) => (setAlias(e.target.value))} placeholder="Alias"></input>
                            {errors.alias && <span style={{ "color": "red" }}><p>{errors.alias.message}</p></span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="register_email"></label>
                            <input type="text" className="form-control" id="register_email" onChange={(e) => (setEmail(e.target.value))} placeholder="Email"></input>
                            {errors.email && <span style={{ "color": "red" }}><p>{errors.email.message}</p></span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="register_password"></label>
                            <input type="password" className="form-control" id="register_password" onChange={(e) => (setPassword(e.target.value))} placeholder="Password"></input>
                            {errors.password && <span style={{ "color": "red" }}><p>{errors.password.message}</p></span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="confirm_password"></label>
                            <input type="password" className="form-control" id="confirm_password" onChange={(e) => (setConfirmPassword(e.target.value))} placeholder="Confirm Password"></input>
                            {errors.confirmPassword && <span style={{ "color": "red" }}><p>{errors.confirmPassword.message}</p></span>}
                        </div>
                        <button type="submit" className='btn btn-primary mr-2 mt-2'>Register</button>
                    </form>
                </div>
                <div className='col-md-6'>
                    {/* login Form */}
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className='form-group'>
                            <label htmlFor="loginEmail"></label>
                            <input type="text" className="form-control" id="loginEmail" onChange={(e) => (setLoginEmail(e.target.value))} placeholder="Email"></input>
                            {errors.loginEmail && <span style={{ "color": "red" }}><p>{errors.loginEmail}</p></span>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="loginPassword"></label>
                            <input type="password" className="form-control" id="loginPassword" onChange={(e) => (setLoginPassword(e.target.value))} placeholder="Password"></input>
                            {errors.loginPassword && <span style={{ "color": "red" }}><p>{errors.loginPassword}</p></span>}
                        </div>
                        <button type="submit" className='btn btn-success mt-2'>Login</button>
                    </form>
                </div>

            </div>
        </div>
    );
}
export default LoginRegister;