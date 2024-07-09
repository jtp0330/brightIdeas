
import React, { useState } from 'react'
import { createIdea } from '../services/Idea.services'


export const Home = () => {
    const [ideaData, setIdeaData] = useState({
        content: '',
        userName: 'Anonymous',
        likes: [] // Array to store user IDs who liked the idea
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setIdeaData({ ...ideaData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Call createIdea function with the ideaData object
            await createIdea(ideaData);
            console.log('Idea created successfully')
            setIdeaData({ ...ideaData, content: '' }) // Clear the content field after successful submission
        } catch (error) {
            console.error('Error creating idea:', error);
            // Handle error state or display an error message to the user
        }
    };

    return (
        <>
            <div className="container">
                <h1 className="mt-5">Bright Ideas</h1>
                <h3>Welcome user</h3>
                <form className="mt-4" onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary">Idea!</button>
                </form>
            </div>
        </>
    );
};

