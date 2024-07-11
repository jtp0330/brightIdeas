// import { useState, useContext, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { createIdea, deleteIdeaById, getAllIdeas, updateIdeaById } from '../services/Idea.services'

// const Home = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState({});
//     const [ideaData, setIdeaData] = useState({
//         content: '',
//         userName: '',
//         likes: [] // Array to store user properties {ID,name,alias} who liked the idea
//     })
//     const [allIdeas, setAllIdeas] = useState([]);


//     useEffect(() => {
//         fetchIdeas()
//         //check for user data in local storage
//         const currentUser = localStorage.getItem('user');
//         if (currentUser) {
//             const loggedInUser = JSON.parse(currentUser);
//             console.log('logged in user', loggedInUser)
//             setUser(loggedInUser);
//             console.log('user', user)
//         }
//     }, [])

//     useEffect(() => {
//         setIdeaData({ ...ideaData, userName: user.alias || '' })
//     }, [user.alias])

//     const fetchIdeas = async () => {
//         try {
//             const ideasFromApi = await getAllIdeas()
//             setAllIdeas(ideasFromApi)
//         } catch (error) {
//             console.log('error fetching ideas', error)
//         }
//     }

//     const handleChange = (event) => {
//         const { name, value } = event.target
//         setIdeaData({ ...ideaData, [name]: value })
//     }

//     const handleLogout = () => {
//         setUser({});
//         localStorage.clear();
//         navigate("/main");
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         try {
//             // setIdeaData({ ...ideaData, userName: user.alias || 'anonymous' })
//             // Call createIdea function with the ideaData object
//             await createIdea(ideaData)
//             console.log('Idea created successfully')
//             setIdeaData({ ...ideaData, content: '' }) // Clear the content field after successful submission
//             fetchIdeas()
//         } catch (error) {
//             console.log('Error creating idea:', error);
//             console.log(error.response.data.errors.content);
//         }
//     }

//     const handleLike = async (ideaId) => {
//         try {
//             // Find the idea in allIdeas array by its ID
//             const ideaToUpdate = allIdeas.find(idea => idea._id === ideaId);
//             // Check if the current user has already liked the idea
//             if (!ideaToUpdate.likes.includes(user._id)) {
//                 // Update idea data with the current user's ID added to likes
//                 const updatedLikes = [...ideaToUpdate.likes, {
//                     "_id": user._id,
//                     "name": user.name,
//                     "alias": user.alias
//                 }];
//                 // Call the updateIdeaById function with the updated likes array
//                 await updateIdeaById(ideaId, { ...ideaToUpdate, likes: updatedLikes });
//                 // Update allIdeas state with the updated idea
//                 const updatedIdeas = allIdeas.map(idea =>
//                     idea._id === ideaId ? { ...idea, likes: updatedLikes } : idea
//                 );
//                 setAllIdeas(updatedIdeas);
//                 // Fetch updated list of ideas after liking/unliking
//                 fetchIdeas();
//             } else {
//                 console.log('You have already liked this idea.');
//             }
//         } catch (error) {
//             console.error('Error liking idea:', error);
//             // Handle error state or display an error message to the user
//         }
//     }

//     const handleDelete = async (id) => {
//         try {
//             await deleteIdeaById(id)
//             const updatedIdeas = allIdeas.filter(idea => idea._id !== id)
//             setAllIdeas(updatedIdeas)
//         } catch (error) {
//             console.log('Error deleting idea', error)
//         }
//     }


//     return (
//         <div className="container">
//             <div className="ideasHeader">
//                 <h1 className="mt-5">Bright Ideas</h1>
//                 <h3>Welcome {user.alias}</h3>
//                 <a onClick={handleLogout}>Logout</a>
//             </div>
//             <div className="ideasForm">
//                 <form onSubmit={handleSubmit} className="form-group">
//                     <textarea
//                         className="form-control"
//                         placeholder="Share your idea..."
//                         aria-label="Share your idea"
//                         name="content"
//                         value={ideaData.content}
//                         onChange={handleChange}
//                         style={{ resize: 'none', minHeight: '50px' }}
//                     />
//                     {/* {error && <span style={{ "color": "red" }}><p>{error.message}</p></span>} */}
//                     <button type="submit" className='btn btn-primary mt-2'>Post Idea!</button>
//                 </form>
//             </div>
//             <div className="ideasMappedIdeas mt-4">
//                 {allIdeas.length === 0 ? (
//                     <p>No ideas yet.</p>
//                 ) : (
//                     allIdeas.map((idea) => (
//                         <div key={idea._id} className="row mb-3">
//                             <div className="col-md-10">
//                                 <div className="card">
//                                     <div className="card-body">
//                                         <h5 className="card-title">
//                                             <strong><Link to={`/users/${idea.userId}`}>{idea.userName}</Link> says:</strong>
//                                         </h5>
//                                         <p className="card-text">{idea.content}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-md-2">
//                                 <div className="d-flex flex-column align-items-center">
//                                     <button
//                                         className="btn btn-outline-primary btn-sm mb-2"
//                                         onClick={() => handleLike(idea._id)}
//                                         disabled={idea.likes.includes(user._id)}>
//                                         Like
//                                     </button>
//                                     <span>{idea.likes.length}
//                                         <Link to={`/bright_ideas/${idea._id}`}>
//                                             {idea.likes.length === 1 ? 'person like this' : 'people likes this'}
//                                         </Link>
//                                     </span>
//                                     {idea.userName === user.alias && (
//                                         <button
//                                             className='btn btn-danger btn-sm mt-2'
//                                             onClick={() => handleDelete(idea._id)}>Delete

//                                         </button>
//                                     )

//                                     }
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     )
// }
// export default Home

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createIdea, deleteIdeaById, getAllIdeas, updateIdeaById } from '../services/Idea.services';
import { getAllUsers } from '../services/UserServices';

const Home = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [ideaData, setIdeaData] = useState({
        content: '',
        userName: '',
        likes: [] // Array to store user properties {ID,name,alias} who liked the idea
    })
    const [allIdeas, setAllIdeas] = useState([])
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        fetchIdeas();
        // Check for user data in local storage
        const currentUser = localStorage.getItem('user');
        if (currentUser) {
            const loggedInUser = JSON.parse(currentUser);
            setUser(loggedInUser);
        }
    }, []);

    useEffect(() => {
        setIdeaData({ ...ideaData, userName: user.alias || '' });
    }, [user.alias]);

    useEffect(() => {
        getAllUsers()
            .then(res => {
                console.log(res)
                setAllUsers(res)
            })
            .catch((error) => { throw error })
    }, [])

    console.log(user)

    const fetchIdeas = async () => {
        try {
            const ideasFromApi = await getAllIdeas();
            setAllIdeas(ideasFromApi);
        } catch (error) {
            console.log('Error fetching ideas', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setIdeaData({ ...ideaData, [name]: value });
    };

    const handleLogout = () => {
        setUser({});
        localStorage.clear();
        navigate('/main');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createIdea(ideaData);
            console.log('Idea created successfully');
            setIdeaData({ ...ideaData, content: '' }); // Clear the content field after successful submission
            fetchIdeas();
        } catch (error) {
            console.log('Error creating idea:', error);
            console.log(error.response.data.errors.content);
        }
    };

    const handleLike = async (ideaId) => {
        try {
            const ideaToUpdate = allIdeas.find((idea) => idea._id === ideaId);
            if (!ideaToUpdate.likes.includes(user._id)) {
                const updatedLikes = [...ideaToUpdate.likes, {
                    _id: user._id,
                    name: user.name,
                    alias: user.alias
                }];
                await updateIdeaById(ideaId, { ...ideaToUpdate, likes: updatedLikes });
                const updatedIdeas = allIdeas.map((idea) =>
                    idea._id === ideaId ? { ...idea, likes: updatedLikes } : idea
                );
                setAllIdeas(updatedIdeas);
                fetchIdeas();
            } else {
                console.log('You have already liked this idea.');
            }
        } catch (error) {
            console.error('Error liking idea:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteIdeaById(id);
            const updatedIdeas = allIdeas.filter((idea) => idea._id !== id);
            setAllIdeas(updatedIdeas);
        } catch (error) {
            console.log('Error deleting idea', error);
        }
    };

    return (
        <div className='container'>
            <div className='ideasHeader mt-5 d-flex justify-content-between align-items-center'>
                <div className='text-left'>
                    <h3>Welcome {user.alias}</h3>
                </div>
                {/* <div className='text-center'>
                    <h1>Bright Ideas</h1>
                </div> */}
                <div className='text-right'>
                    <button className='btn btn-danger' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="ideasForm">
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            placeholder="Share your idea..."
                            aria-label="Share your idea"
                            name="content"
                            value={ideaData.content}
                            onChange={handleChange}
                            style={{ resize: 'none', minHeight: '50px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">
                        Post Idea!
                    </button>
                </form>
            </div>
            <div className="ideasMappedIdeas mt-4">
                {allIdeas.length === 0 ? (
                    <p>No ideas yet.</p>
                ) : (
                    allIdeas.map((idea) => (
                        <div key={idea._id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <strong>
                                        <Link to={`/users/${idea.userName}`}>{idea.userName}</Link> says:
                                    </strong>
                                </h5>
                                <p className="card-text">{idea.content}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => handleLike(idea._id)}
                                        disabled={idea.likes.includes(user._id)}
                                    >
                                        Like
                                    </button>
                                    <span>
                                        {idea.likes.length}{' '}
                                        <Link to={`/bright_ideas/${idea._id}`}>
                                            {idea.likes.length === 1 ? 'person likes this' : 'people like this'}
                                        </Link>
                                    </span>
                                    {idea.userName === user.alias && (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(idea._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;

