import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';



const LikeStatus = () => {
    const [idea, setIdea] = useState({})
    const { id } = useParams();
    useEffect(() => {
        fetchIdea()
    }, [idea]);

    const fetchIdea = async () => {
        try {
            const ideasFromApi = await getIdeaById(id)
            setIdea(ideasFromApi)
        } catch (error) {
            console.log('error fetching ideas', error)
        }
    }
    const handleLogout = () => {
        logout();
        navigate("/main");
    }

    return (
        <div className="d-flex flex-column container">
            <div className="header d-flex flex-row">
                <a href="/bright_ideas">Bright Ideas</a>
                <a href={handleLogout}>Logout</a>
            </div>
            <div className="ideaContent">
                <p className="card-text">{idea.content}</p>
            </div>

            <div className="d-flex flex-columhn likedPeople">
                <h3>People who liked this post:</h3>
                {/* loop through likes array and get id,alias, and name */}
                <table>
                    <thead>
                        <th>Alias</th>
                        <th>Name</th>
                    </thead>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    )
};
export default LikeStatus;