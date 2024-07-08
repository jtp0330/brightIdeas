
const LoginRegister = () => {

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [registerName, setregisterName] = useState("")
    const [registerAlias, setRegisterAlias] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = () => {
        const newLogin = {
            loginEmail,
            loginPassword
        }

        axios.post("", newLogin)
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
        const newUser = {
            registerName,
            registerAlias,
            registerEmail,
            registerPassword,
            registerConfirmPassword
        }

        axios.post("", newUser)
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
        <div>
            {/* register Form */}
            <form onSubmit={handleRegister}>

            </form>
            {/* login Form */}
            <form onSubmit={handleLogin}>

            </form>
        </div>
    );

}