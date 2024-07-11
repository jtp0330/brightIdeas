
import { useNavigate, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllUsers, getUserById } from '../services/UserServices';
import { getAllIdeas } from '../services/Idea.services';


const UserProfile = () => {
    const { id } = useParams();
    const [allUsers, setAllUsers] = useState([])
    const [user, setUser] = useState({})
    const [allIdeas, setAllIdeas] = useState([])
    const [numPosts, setNumPosts] = useState(0)
    const [numLikes, setNumLikes] = useState(0)

    const navigate = useNavigate();

    const handleLogout = () => {
        setUser({});
        localStorage.clear();
        navigate('/main');
    };

    const handleNumPosts = (name) => {
        let numPosts = 0;
        allIdeas.map(
            (idea) => {
                if (idea.userName === name)
                    numPosts++;
            }
        )
        return numPosts;
    }
    const handleNumLikes = (name) => {
        let numLikes = 0;

        allIdeas.map(
            (idea) => {
                let ideaString = JSON.stringify(idea.likes)
                if (ideaString.includes(name))
                    numLikes++;
            }
        )
        return numLikes;
    }
    //gets all users in db
    useEffect(() => {
        getAllUsers()
            .then(res => {
                setAllUsers(res)
            })
            .catch((error) => { throw error })
        getUserById(id)
            .then(resp => {
                console.log(resp)
                setUser(resp)
            })
            .catch(err => {
                console.log(err)
            })
        getAllIdeas()
            .then(res => {
                setAllIdeas(res)
                console.log(user)

                console.log(posts, likes)
            })
            .catch((error) => { throw error })

        let posts = handleNumPosts(user.alias)
        let likes = handleNumLikes(user.alias)
        setNumPosts(posts)
        setNumLikes(likes)
    }, [allIdeas])



    return (<>
        < div className="d-flex flex-column gap-5 container" >
            <div className="header d-flex flex-row justify-content-end gap-3 p-3">
                <a href="/bright_ideas">Bright Ideas</a>
                <button className='btn btn-danger' onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="container mt-5">
                <div className="card">
                    <h1 className="card-header">User Profile</h1>
                    <div className="card-body">
                        <p className="card-text"><strong>Name:</strong> {user.name}</p>
                        <p className="card-text"><strong>Alias:</strong> {user.alias}</p>
                        <p className="card-text"><strong>Email:</strong> {user.email}</p>
                        <hr />
                        <p className="card-text"><strong>Total Number of Posts:</strong> {numPosts}</p>
                        <p className="card-text"><strong>Total Number of Likes:</strong> {numLikes}</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default UserProfile