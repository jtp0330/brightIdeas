import {model, Schema} from 'mongoose'

//define Book Schema
const IdeaSchema = new Schema(
    {
        userName:{
            type: String,
            required: [true, "Title is required!"],
            minlength: [2, "Title must be at least 2 characters!"],
            maxlength: [255, "title must be at most 255 characters!"],
            validate:{
                validator: s => !s.includes(" "),
                message: props => `${props.value} should not include a space!`
            }
        },
        content:{
            type: String,
            required: [true, "An idea must have content!"]
            // minlength: [5, "Content name must be at least 5 characters!"],
            // maxlength: [255, "Author name must be at most 255 characters!"]
        },
        // //have a likes counter for faster retrival
        // likesCount:{
        //     type: Number,
        //     default:0
        // },
        //keep reference of likes
        likes:{
            type:Array,
            default: []
        }
    },
    {timestamps: true}
);

//initalize schema and make accessible
const Idea = model("Idea", IdeaSchema);
export default Idea;