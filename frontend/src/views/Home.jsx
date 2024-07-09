import { useState } from 'react';
import axios from 'axios'


const Home = () => {

    const [idea, setIdea] = useState({})   //for creating new ideas
    const [ideas, setIdeas] = useState([]) //for displaying all ideas
    const HandleIdeaCreate = (e) => {
        e.preventDefault()

        const testUser = {
            "userName": "test",
            "content": idea
        }
        //testing the create feature
        axios.post("http://localhost:8000/api/bright_ideas", testUser)
            .then(resp => {
                console.log(resp.data)
                console.log("idea created")
            })
            .catch(err => {
                console.log(err)
            })
    }
    //split frontend of hompage into 3 parts as per the wireframe
    //1. header
    //2. form for create posts
    //3. posts -> contains info mapped from a useEffect request

    return (
        <div className="ideasHome">

            <div className="ideasHeader"></div>
            <div className="ideasForm">
                <form onSubmit={HandleIdeaCreate}>
                    <label htmlFor="content"></label>
                    <input type="text" className="form-control" id="content" onChange={(e) => (setIdea(e.target.value))} placeholder="Post Something Witty here..."></input>
                    {/* {errors.loginEmail && <span style={{ "color": "red" }}><p>{errors.loginEmail}</p></span>} */}
                    <input type="submit" />
                </form>
            </div>
            {/* //may want to make these ideas into a separate component with the following:
            //1. user who created post says
            //2. the idea content
            //3. Like Link
            //4. Number of people like this p element that contains a link to the idea's like status */}
            <div className="ideasMappedIdeas"></div>


        </div>



    );
};
export default Home;