import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL: 'http://localhost:8000/'
})

//create


//read

export const getUserById = async (id) => {
    console.log('hit outside')
    try {
        const res = await USER_INSTANCE.get(`/users/${id}`)
        console.log('hit inside')
        return res.data
    } catch (error) { throw error }
}

//update

export const updateUserById = async (id, userData) => {
    console.log('outside update')
    try {
        const res = await USER_INSTANCE.put(`users/${id}/edit`, userData)
        console.log('inside update')
        return res.data
    } catch (error) { throw error }
}

//delete

export const deleteUserById = async (id) => {
    try {
        const res = await USER_INSTANCE.delete(`/users/${id}`)
        return res.data
    } catch (error) { throw error }
}