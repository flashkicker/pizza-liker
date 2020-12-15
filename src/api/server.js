import axios from "axios"

const server = axios.create({
	baseURL: "http://bc4f86c68561.ngrok.io",
})

export default server
