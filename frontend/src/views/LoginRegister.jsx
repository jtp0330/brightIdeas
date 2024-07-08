import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import bcrypt from 'bcryptjs'


const LoginRegister = () => {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [registerName, setRegisterName] = useState("")
    const [registerAlias, setRegisterAlias] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")

    // const [confirmPasswordError, setConfirmPasswordError] = useState(""); //must add this as no validation in our user model
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()


    const encryptPassword = (password) => {
        const salt = bcrypt.genSaltSync(10); //save this value to mongodb user collection
        const hashedPassword = bcrypt.hashSync(password, salt);
        return {
            'hashedPassword': hashedPassword,
            'salt': salt
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        const newLogin = JSON.stringify({
            loginEmail,
            loginPassword
        })

        axios.post("http://localhost:8000/api/users/login", newLogin)
            .then(data => {
                console.log(data);
                console.log("Login Attempt Sent!");
                navigate("/bright_ideas");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data)
                console.log(errors) //shows User Not Found -> refer to /backend/users.controllers.js -> line 71
            })
    };

    const handleRegister = (e) => {
        e.preventDefault()
        const hashedVariables = encryptPassword(registerPassword)
        const hashedPassword = hashedVariables.hashedPassword;
        const salt = hashedVariables.salt;

        const newUser = JSON.stringify({
            registerName,
            registerAlias,
            registerEmail,
            hashedPassword,
            salt
        })
        console.log(newUser);
        axios.post("http://localhost:8000/api/users", newUser)
        .then(resp =>{
                console.log(resp.data);
                console.log("Register Attempt Sent!");
                navigate("/bright_ideas");
        })
        .catch(err => {
            console.log(err.response)
            if (!registerConfirmPassword || registerConfirmPassword !== registerPassword)
                err.response.data.errors += { confirmPassword: 'Confirm Password must match Password' }
            setErrors(err.response.data.errors)
            console.log(errors)
        })
    };

    return (
        <div className="d-flex flex-row">
            {/* register Form */}
            <form onSubmit={handleRegister}>
                <label htmlFor="name"></label>
                {errors.name && <span style={{ "color": "red" }}><p>{errors.name.message}</p></span>}
                <input type="text" className="form-control" id="name" onChange={(e) => (setRegisterName(e.target.value) )} placeholder="Name"></input>
                <label htmlFor="alias"></label>
                {errors.alias && <span style={{ "color": "red" }}><p>{errors.alias.message}</p></span>}
                <input type="text" className="form-control" id="alias" onChange={(e) => ( setRegisterAlias(e.target.value) )} placeholder="Alias"></input>
                <label htmlFor="register_email"></label>
                {errors.email && <span style={{ "color": "red" }}><p>{errors.email.message}</p></span>}
                <input type="text" className="form-control" id="register_email" onChange={(e) => ( setRegisterEmail(e.target.value) )} placeholder="Email"></input>
                <label htmlFor="register_password"></label>
                {errors.password && <span style={{ "color": "red" }}><p>{errors.password.message}</p></span>}
                <input type="password" className="form-control" id="register_password" onChange={(e) => ( setRegisterPassword(e.target.value) )} placeholder="Password"></input>
                <label htmlFor="confirm_password"></label>
                {errors.confirmPassword && <span style={{ "color": "red" }}><p>{errors.confirmPassword.message}</p></span>}
                <input type="password" className="form-control" id="confirm_password" onChange={(e) => ( setRegisterConfirmPassword(e.target.value) )} placeholder="Confirm Password"></input>
                <input type="submit" />
            </form>
            {/* login Form */}
            <form onSubmit={handleLogin}>
                <label htmlFor="loginEmail"></label>
                <input type="text" className="form-control" id="loginEmail" onChange={(e) => (setLoginEmail(e.target.value))} placeholder="Email"></input>
                {errors.email && <span style={{ "color": "red" }}><p>{errors.email}</p></span>}
                <label htmlFor="loginPassword"></label>
                {errors.password && <span style={{ "color": "red" }}><p>{errors.password}</p></span>}
                <input type="password" className="form-control" id="loginPassword" onChange={(e) => (setLoginPassword(e.target.value))} placeholder="Password"></input>
                <input type="submit" />
            </form>
        </div>
    );
}
export default LoginRegister;