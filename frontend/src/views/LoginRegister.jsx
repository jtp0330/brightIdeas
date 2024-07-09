import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import bcrypt from 'bcryptjs'


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
        const newLogin = {
            loginEmail,
            loginPassword
        }

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
        const hashedVariables = encryptPassword(password)
        setPassword(hashedVariables.hashedPassword);
        const salt = hashedVariables.salt;
        //send new data via post request
        axios.post("http://localhost:8000/api/users", {
            name,
            alias,
            email,
            password,
            salt
        })
        .then(resp =>{
                console.log(resp.data);
                console.log("Register Attempt Sent!");
                navigate("/bright_ideas");
        })
        .catch(err => {
            // console.log(typeof(err.response.data.errors))
            console.log(err.response.data)
            // if (!confirmPassword || confirmPassword !== password)
            //     Object.defineProperty(err.response.data.errors,"confirmPassword",{value: "Confirm Password must match Password" });
            setErrors(err.response.data)
            console.log(errors)
        })
    };

    return (
        <div className="d-flex flex-row">
            {/* register Form */}
            <form onSubmit={handleRegister}>
                <label htmlFor="name"></label>
                <input type="text" className="form-control" id="name" onChange={(e) => (setName(e.target.value) )} placeholder="Name"></input>
                {errors.errors && <span style={{ "color": "red" }}><p>{errors.errors.name.message}</p></span>}
                <label htmlFor="alias"></label>
                <input type="text" className="form-control" id="alias" onChange={(e) => ( setAlias(e.target.value) )} placeholder="Alias"></input>
                {errors.errors && <span style={{ "color": "red" }}><p>{errors.errors.alias.message}</p></span>}
                <label htmlFor="register_email"></label>
                <input type="text" className="form-control" id="register_email" onChange={(e) => ( setEmail(e.target.value) )} placeholder="Email"></input>
                {errors.errors && <span style={{ "color": "red" }}><p>{errors.errors.email.message}</p></span>}
                <label htmlFor="register_password"></label>
                <input type="password" className="form-control" id="register_password" onChange={(e) => ( setPassword(e.target.value) )} placeholder="Password"></input>
                {errors.errors && <span style={{ "color": "red" }}><p>{errors.errors.password.message}</p></span>}
                <label htmlFor="confirm_password"></label>
                <input type="password" className="form-control" id="confirm_password" onChange={(e) => ( setConfirmPassword(e.target.value) )} placeholder="Confirm Password"></input>
                {/* {errors.confirmPassword && <span style={{ "color": "red" }}><p>{errors.confirmPassword.message}</p></span>} */}
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