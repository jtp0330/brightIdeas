import { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getIdeaById } from '../services/Idea.services'


const LikeStatus = () => {
    const [idea, setIdea] = useState({})
    const { id } = useParams();
    const navigate = useNavigate()
    const [loggedInuser, setLoggedInUser] = useState({})

    useEffect(() => {
        // fetchIdea()
        getIdeaById(id)
            .then((resp) => {
                console.log(resp)
                setIdea(resp)
            }).catch(err => {
                console.log(err);
            })

        //check for user data in local storage
        const currentUser = localStorage.getItem('user');
        if (currentUser) {
            const loggedInUser = JSON.parse(currentUser);
            setLoggedInUser(loggedInUser);
        }
    }, []);

    const handleLogout = () => {
        setUser({});
        localStorage.clear();
        navigate("/main");
    }

    return (
        < div className="d-flex flex-column gap-5 container" >
            <div className="header d-flex flex-row justify-content-end gap-3">
                <a href="/bright_ideas">Bright Ideas</a>
                <a href={handleLogout}>Logout</a>
            </div>
            <div className="ideaContent">
                <p className="card-text">{idea.content}</p>
            </div>

            <div className="d-flex flex-column likedPeople">
                <h3>People who liked this post:</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Alias</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {idea.likes &&
                            idea.likes.map((userData, index) => (

                                < tr key={index} >
                                    <td><Link to={`/users/${userData._id}`}>{userData.alias}</Link></td>
                                    < td > {userData.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div >
        </div >
    )
};
export default LikeStatus;