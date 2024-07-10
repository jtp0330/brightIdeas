import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { createIdea, getAllIdeas } from '../services/Idea.services'

export const Home = ({ user }) => {

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Call createIdea function with the ideaData object
            await createIdea(ideaData)
            console.log('Idea created successfully')
            setIdeaData({ ...ideaData, content: '' }) // Clear the content field after successful submission
        } catch (error) {
            console.error('Error creating idea:', error)
            // Handle error state or display an error message to the user
        }
    }

    return (
        <div className="container">
            <div className="ideasHeader">
                <h1 className="mt-5">Bright Ideas</h1>
                <h3>Welcome {user.userName}</h3>
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
                        required
                    />
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
    )
}

