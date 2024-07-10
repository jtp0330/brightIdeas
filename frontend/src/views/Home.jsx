import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { createIdea } from '../services/Idea.services'
import UserContext from '../context/UserContext';

const Home = () => {


    //user data
    const { userRef, logout } = useContext(UserContext);
    console.log(userRef)
    const navigate = useNavigate();

    const [ideaData, setIdeaData] = useState({
        content: '',
        userName: 'Anonymous',
        likes: [] // Array to store user IDs who liked the idea
    })
    const [allIdeas, setAllIdeas] = useState([])

    useEffect(() => {
        fetchIdeas()
    }, [ideaData])

    const fetchIdeas = async () => {
        try {
            const ideasFromApi = await getAllIdeas()
            setAllIdeas(ideasFromApi)
        } catch (error) {
            console.log('error fetching ideas', error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setIdeaData({ ...ideaData, [name]: value })
    }

    const handleLogout = () => {
        logout();
        navigate("/main");
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Call createIdea function with the ideaData object
            await createIdea(ideaData)
            console.log('Idea created successfully')
            setIdeaData({ ...ideaData, content: '' }) // Clear the content field after successful submission
        } catch (error) {
            console.error('Error creating idea:', error);
            console.error(error.response.data.errors.content);
            setErrors(error.response.data.errors.content);
            // Handle error state or display an error message to the user
        }
    };

    const [idea, setIdea] = useState({})   //for creating new ideas
    const [ideas, setIdeas] = useState([]) //for displaying all ideas
    const [error, setErrors] = useState({})

    //split frontend of hompage into 3 parts as per the wireframe
    //1. header
    //2. form for create posts
    //3. posts -> contains info mapped from a useEffect request

    return (
        <div className="container">
            <div className="ideasHeader">
                <h1 className="mt-5">Bright Ideas</h1>
                <h3>Welcome {userRef.current ? userRef.current.alias : "user"}</h3>
                <a onClick={handleLogout}>Logout</a>
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
                        
                    {error && <span style={{ "color": "red" }}><p>{error.message}</p></span>}
                    <button type="submit" className='btn btn-primary mt-2'>Post Idea!</button>
                </form>
            </div>
            <div className="ideasMappedIdeas mt-4">
                {allIdeas.length === 0 ? (
                    <p>No ideas yet.</p>
                ) : (
                    <ul className="list-group">
                        {allIdeas.map((idea) => (
                            <li key={idea._id} className="list-group-item mb-2">
                                <strong><Link to={`/users/${idea.userId}`}>{idea.userName}</Link> says: </strong>{idea.content}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
export default Home;

