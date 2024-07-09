import React from 'react'

export const Home = () => {
    return (<>
        <div className="container">
            <h1 className="mt-5">Bright Ideas</h1>
            <h3>Welcome user</h3>
            <form className="mt-4 mr-3">
                <div className="input-group mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Share your idea..."
                        aria-label="Share your idea"
                        style={{ resize: 'none', minHeight: '50px' }}
                    />
                    <div>
                        <button type="submit" className="btn btn-primary">Idea!</button>
                    </div>
                </div>
            </form>
        </div>
    </>)
}
