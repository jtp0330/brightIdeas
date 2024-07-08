import {model, Schema} from 'mongoose'

//define User Schema
const UserSchema = new Schema(
    {
        name:{
            type: String,
            required: [true, "First Name is required!"],
            minlength: [2, "Title must be at least 2 characters!"],
            maxlength: [255, "title must be at most 255 characters!"],
            // validate:{
            //     validator: s => !s.includes("mom"),
            //     message: props => `${props.value} should not include a space!`
            // }
        },
        alias:{
            type: String,
            required: [true, "Alias is required!"],
            // minlength: [2, "Title must be at least 2 characters!"],
            // maxlength: [255, "title must be at most 255 characters!"],
            // validate:{
            //     validator: s => !s.includes(" "),
            //     message: props => `${props.value} should not include a space!`
            // }
        },
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
            minlength: [8, "Password must be at least 8 characters!"],
            maxlength: [20, "Password must be at most 20 characters!"]
        },
        // confirmPassword:{
        //     type: String,
        //     required: [true, "Please enter the same password again!"],
        //     //ensure field has same value as password field
        //     validate:{
        //         validator: field => field.match(this.password),
        //         message: "Passwords do not match!"

        //     }
        // },
        
            //salt value, must be stored upon regsiter
            salt:{
                type: String,
                required: [true, "Please enter the same password again!"],
                //ensure field has same value as password field
        }
    },
    {timestamps: true}
);

//initalize schema and make accessible
const User = model("User", UserSchema);
export default User;