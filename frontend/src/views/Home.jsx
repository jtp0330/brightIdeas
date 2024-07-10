import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createIdea, getAllIdeas, updateIdeaById } from '../services/Idea.services'
import UserContext from '../context/UserContext';

const Home = () => {
    //user data
    const { userRef, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const [ideaData, setIdeaData] = useState({
        content: '',
        userName: 'Anonymous',
        likes: [] // Array to store user properties {ID,name,alias} who liked the idea
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
    }

    const handleLike = async (ideaId) => {
        try {
            // Find the idea in allIdeas array by its ID
            const ideaToUpdate = allIdeas.find(idea => idea._id === ideaId);

            // Check if the current user has already liked the idea
            if (!ideaToUpdate.likes.includes(userRef.current._id)) {
                // Update idea data with the current user's ID added to likes
                const updatedLikes = [...ideaToUpdate.likes, {
                    "_id": userRef.current._id,
                    "name": userRef.current.name,
                    "alias": userRef.current.alias
                }];

                // Call the updateIdeaById function with the updated likes array
                await updateIdeaById(ideaId, { ...ideaToUpdate, likes: updatedLikes });

                // Update allIdeas state with the updated idea
                const updatedIdeas = allIdeas.map(idea =>
                    idea._id === ideaId ? { ...idea, likes: updatedLikes } : idea
                );
                setAllIdeas(updatedIdeas);

                // Fetch updated list of ideas after liking/unliking
                fetchIdeas();
            } else {
                console.log('You have already liked this idea.');
            }
        } catch (error) {
            console.error('Error liking idea:', error);
            // Handle error state or display an error message to the user
        }
    }


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
                    />
                    {/* {error && <span style={{ "color": "red" }}><p>{error.message}</p></span>} */}
                    <button type="submit" className='btn btn-primary mt-2'>Post Idea!</button>
                </form>
            </div>
            <div className="ideasMappedIdeas mt-4">
                {allIdeas.length === 0 ? (
                    <p>No ideas yet.</p>
                ) : (
                    allIdeas.map((idea) => (
                        <div key={idea._id} className="row mb-3">
                            <div className="col-md-10">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <strong><Link to={`/users/${idea.userId}`}>{idea.userName}</Link> says:</strong>
                                        </h5>
                                        <p className="card-text">{idea.content}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="d-flex flex-column align-items-center">
                                    <button
                                        className="btn btn-outline-primary btn-sm mb-2"
                                        onClick={() => handleLike(idea._id)}
                                        disabled={idea.likes.includes(userRef.current._id)}>
                                        Like
                                    </button>
                                    <span>{idea.likes.length} {idea.likes.length === 1 ? 'like' : 'likes'}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default Home

