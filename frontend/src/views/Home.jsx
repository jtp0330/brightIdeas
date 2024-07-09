import { useState } from 'react';
import axios from 'axios'
import { createIdea } from '../services/Idea.services'

const Home = () => {
  
  //from jason_home////////
  
      const [ideaData, setIdeaData] = useState({
        content: '',
        userName: 'Anonymous',
        likes: [] // Array to store user IDs who liked the idea
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setIdeaData({ ...ideaData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Call createIdea function with the ideaData object
            await createIdea(ideaData);
            console.log('Idea created successfully')
            setIdeaData({ ...ideaData, content: '' }) // Clear the content field after successful submission
        } catch (error) {
            console.error('Error creating idea:', error);
            console.error(error.response.data.errors.content);
            setErrors(error.response.data.errors.content);
            // Handle error state or display an error message to the user
        }
    };
  ///////////////////////////////

    const [idea, setIdea] = useState({})   //for creating new ideas
    const [ideas, setIdeas] = useState([]) //for displaying all ideas
    const [error, setErrors] = useState({})

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

            <div className="ideasHeader">
                 <h1 className="mt-5">Bright Ideas</h1>
                 <h3>Welcome user</h3>
            </div>
            <div className="ideasForm">
                <form onSubmit={handleSubmit} className="form-group">

                        <textarea
                            className="form-control"
                            placeholder="Share your idea..."
                            aria-label="Share your idea"
                            name="content"
                            value={ideaData.content}
                            onChange={handleChange}
                            style={{ resize: 'none', minHeight: '50px' }}
                        />
                {error && <span style={{ "color": "red" }}><p>{error.message}</p></span>}

                    
                    <input type="submit" className="btn btn-primary" />
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
}
export default Home;

