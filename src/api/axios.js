import axios from 'axios'

export default axios.create({
    baseURL: 'https://api-team-finder.koyeb.app/api/'
})