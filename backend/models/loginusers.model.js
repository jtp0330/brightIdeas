import {model, Schema} from 'mongoose'

//define User Schema
const LoginUserSchema = new Schema(
    {

        email:{
            type: String,
            required: [true, "Please provide a valid email"],
            //should validate with proper email format
            // * = any number of characters
            validate:{
                validator: email => email.match("*@*.com"),
                message: props => `${props.value} is not a valid email!`
            }
        },
        password:{
            type: String,
            required: [true, "Please provide a valid password!"],
        }
    },
    {timestamps: true}
);

//initalize schema and make accessible
const LoginUser = model("LoginUser", LoginUserSchema);
export default LoginUser;