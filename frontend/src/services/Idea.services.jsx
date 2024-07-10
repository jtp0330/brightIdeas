/* eslint-disable no-useless-catch */
import axios from 'axios'

const IDEA_INSTANCE = axios.create({
    baseURL: 'http://localhost:8000/api/'
})

//create

export const createIdea = async ideaData => {
    try {
        console.log("services")
        const res = await IDEA_INSTANCE.post('/bright_ideas', ideaData)

        return res.data
    } catch (error) { throw error }
}

//read

export const getAllIdeas = async () => {
    try {
        const res = await IDEA_INSTANCE.get('/bright_ideas')
        return res.data
    } catch (error) { throw error }
}

export const getIdeaById = async (id) => {
    try {
        const res = await IDEA_INSTANCE.get(`/bright_ideas/${id}`)
        return res.data
    } catch (error) { throw error }
}

//update

export const updateIdeaById = async (id, ideaData) => {
    try {
        const res = await IDEA_INSTANCE.put(`bright_ideas/${id}/edit`, ideaData)
        return res.data
    } catch (error) { throw error }
}

//delete

export const deleteIdeaById = async (ideaId) => {
    try {
        const res = await IDEA_INSTANCE.delete(`/${ideaId}`)
        return res.data
    } catch (error) { throw error }
}


