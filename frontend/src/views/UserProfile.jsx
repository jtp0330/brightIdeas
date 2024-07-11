import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllUsers } from '../services/UserServices';
import { all } from 'axios';


const UserProfile = () => {
    const { id: alias } = useParams();
    const [allUsers, setAllUsers] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        getAllUsers()
            .then(res => {
                setAllUsers(res)
            })
            .catch((error) => { throw error })
    }, [])
    console.log(allUsers)

    useEffect(() => {
        console.log(allUsers)
        if (allUsers.length > 0) {
            const matchedUser = allUsers.find(user => user.alias === alias)
            if (matchedUser) {
                setUser(matchedUser)
            } else {
                setUser(null)
            }
        }
    }, [allUsers, alias])

    console.log(user)

    return (<>
        <div className="container mt-5">
            <div className="card">
                <h1 className="card-header">User Profile</h1>
                <div className="card-body">
                    <p className="card-text"><strong>Name:</strong> {user.name}</p>
                    <p className="card-text"><strong>Alias:</strong> {user.alias}</p>
                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>

    </>)
}
export default UserProfile