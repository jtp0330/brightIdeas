import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


const UserProfile = () => {
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        fetchUserDetails()
    }, [userDetails]);

    const fetchUserDetails = async () => {
        try {
            const usersFromApi = await getUserById(id)
            setUserDetails(usersFromApi)
            console.log(userDetails)
        } catch (error) {
            console.log('error fetching ideas', error)
        }
    }

    return (
        <div>
            <div classname="header">
                <Link to={``}></Link>
                <Link to={``}></Link>
            </div>
            <div classname="userDetails">
                <p>Name: {userDetails.name}</p>
                <p>Alias: {userDetails.alias}</p>
                <p>Email: {userDetails.email}</p>
            </div>
            <hr />
            <div classname="userPostsLikes"></div>
        </div>
    );
};
export default UserProfile;