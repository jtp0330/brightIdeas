
import { useEffect,useState } from 'react'
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
        setLoggedInUser({});
        localStorage.clear();
        navigate("/main");
    }
    //remove duplicate entries from likes array in called idea
    const removeDuplicates = () => {
        let displayedUsers = idea.likes && idea.likes.map(JSON.stringify)
        let displayedUserSet = new Set(displayedUsers)
        return Array.from(displayedUserSet).map(JSON.parse)
    }
    const uniqueDisplayedUsers = removeDuplicates();


    return (
        < div className="d-flex flex-column gap-5 container" >
            <div className="header d-flex flex-row justify-content-end gap-3 p-3">
                <a href="/bright_ideas">Bright Ideas</a>
                <button className='btn btn-danger' onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="card mb-3">
                <div className="card-body">
                    <p className="card-text">
                        <strong>{idea.userName}</strong> says: {idea.content}
                    </p>
                </div>
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
                        {uniqueDisplayedUsers &&
                            uniqueDisplayedUsers.map((userData, index) => (
                                < tr key={index}>
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