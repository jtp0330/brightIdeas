import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


const UserProfile = () => {
    const [userDetails, setUserDetails] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    // const [user, setUser] = userState({});
    
    useEffect(() => {
        fetchUserDetails()
        //not sure if we need this here, but adding just in case
        // const currentUser = localStorage.getItem('user');
        // if(currentUser){
        //     const loggedInUser = JSON.parse(currentUser);
        //     setUser(loggedInUser);
        // }
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
            <div className="header">
                <Link to={``}></Link>
                <Link to={``}></Link>
            </div>
            <div className="userDetails">
                <p>Name: {userDetails.name}</p>
                <p>Alias: {userDetails.alias}</p>
                <p>Email: {userDetails.email}</p>
            </div>
            <hr />
            <div className="userPostsLikes"></div>
        </div>
    );
};
export default UserProfile;