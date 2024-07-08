import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const LoginRegister = () => {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [registerName, setregisterName] = useState("")
    const [registerAlias, setRegisterAlias] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")

    const [confirmPasswordError, setConfirmPasswordError] = useState(""); //must add this as no validation in our user model

    const navigate = useNavigate()


    const encryptPassword = (password) => {
        const salt = bcrypt.genSaltSync(10); //save this value to mongodb user collection
        const hashedPassword = bcrypt.hashSync(password, salt);
        return {
            'hashedPassword': hashedPassword,
            'salt': salt
        }
    }

    const handleLogin = () => {

        const newLogin = {
            loginEmail,
            loginPassword
        }

        axios.post("http://localhost:8000/api/users/login", newLogin)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                console.log("Login Attempt Sent!");
                navigate("/bright_ideas");
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handleRegister = () => {
        const hashedVariables = encryptPassword(registerPassword)
        const hashedPassword = hashedVariables.hashedPassword;
        const salt = hashedVariables.salt;

        const newUser = {
            registerName,
            registerAlias,
            registerEmail,
            hashedPassword,
            salt
        }

        axios.post("http://localhost:8000/api/users", newUser)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                console.log("Register Attempt Sent!");
                navigate("/bright_ideas");
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="d-flex flex-row">
            {/* register Form */}
            <form onSubmit={handleRegister}>
                <label htmlFor="name"></label>
                <input type="text" className="form-control" id="name" onChange={(e) => (setRegisterName(e.target.value))} placeholder="Name"></input>
                <label htmlFor="alias"></label>
                <input type="text" className="form-control" id="alias" onChange={(e) => (setRegisterAlias(e.target.value))} placeholder="Alias"></input>
                <label htmlFor="register_email"></label>
                <input type="text" className="form-control" id="register_email" onChange={(e) => (setRegisterEmail(e.target.value))} placeholder="Email"></input>
                <label htmlFor="register_password"></label>
                <input type="password" className="form-control" id="register_password" onChange={(e) => (setRegisterPassword(e.target.value))} placeholder="Password"></input>
                <label htmlFor="confirm_password"></label>
                <input type="password" className="form-control" id="confirm_password" onChange={(e) => (setRegisterConfirmPassword(e.target.value))} placeholder="Confirm Password"></input>
                <input type="submit" />
            </form>
            {/* login Form */}
            <form onSubmit={handleLogin}>
                <label htmlFor="login_email"></label>
                <input type="text" className="form-control" id="login_email" onChange={(e) => (setLoginEmail(e.target.value))} placeholder="Email"></input>
                <label htmlFor="login_password"></label>
                <input type="password" className="form-control" id="login_password" onChange={(e) => (setLoginPassword(e.target.value))} placeholder="Password"></input>
                <input type="submit" />
            </form>
        </div>
    );
}
export default LoginRegister;