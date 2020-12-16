import axios from "axios"

const server = axios.create({
	baseURL: "https://pizza-liker-backend.herokuapp.com",
})

export default server
