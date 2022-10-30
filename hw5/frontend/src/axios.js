import axios from 'axios';

const instance = axios.create
    ({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
    try {
        const { data: { msg } } = await instance.post('./start')
        return msg
    } catch (error) {
        throw new Error('Network Error(HTTP:500)! Contact the server owner')
    }
}

const guess = async (number) => {
    try {
        const { data: { msg } } = await instance.get('/guess', { params: { number } })
        return msg
    } catch (error) {
        let msg = `${number} is not a legal input.`
        return msg
    }
}

const restart = async () => {
    try {
        const { data: { msg } } = await instance.post('./restart')
        return msg
    } catch (error) {
        throw new Error('Network Error(HTTP:500)! Contact the server owner')
    }
}

const shoot = async (rockstatus) => {
    try {
        const { data: { msg, oppon } } = await instance.get('/shoot', { params: { rockstatus } })
        return {msg, oppon}
    } catch (error) {
        throw new Error('Network Error(HTTP:500)! Contact the server owner')
    }
}
export { startGame, guess, restart, shoot }