import React, { useEffect, useState } from "react"
import { Button, Image } from "semantic-ui-react"
import ReactApexChart from "react-apexcharts"
import decode from "jwt-decode"

import { Header } from "./components/Header"
import pizza from "./components/pizza.png"
import server from "./api/server"

const App = () => {
	const [currentUser, setCurrentUser] = useState("")
	const [currentUserLikes, setCurrentUserLikes] = useState(0)
	const [token, setToken] = useState("")
	const [seriesData, setSeriesData] = useState([])
	const [usernames, setUsernames] = useState([])

	const sortUsersByLikes = (data) =>
		data.sort((a, b) => (a.likes < b.likes ? 1 : -1))

	const handleLogin = ({ token, data }) => {
		setToken(token)

		const users = sortUsersByLikes(data)
		setUsernames(users.map((user) => user.username))
		setSeriesData(users.map((user) => user.likes))

		const { username, likes } = decode(token)
		setCurrentUser(username)
		setCurrentUserLikes(likes)
	}

	const handleLogout = () => {
		setCurrentUser("")
		setToken("")
	}

	const likeButtonHandler = async () => {
		if (!token) return alert("Sorry, you must be signed in to show your love!")

		try {
			const response = await server.post(
				"/like",
				{},
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			)

			const users = sortUsersByLikes(response.data.data)
			const user = response.data.user

			setUsernames(users.map((user) => user.username))
			setSeriesData(users.map((user) => user.likes))
			setCurrentUserLikes(user.likes)
		} catch (e) {
			alert("There was an error with your request")
		}
	}

	useEffect(() => {
		try {
			const getAllUserData = async () => {
				let users = await server.get("/getSeedData")

				users = sortUsersByLikes(users.data)

				setUsernames(users.map((user) => user.username))
				setSeriesData(users.map((user) => user.likes))
			}

			getAllUserData()
		} catch (e) {
			alert("There was en error while fetching user data")
		}
	}, [])

	const series = [
		{
			data: seriesData,
		},
	]

	const options = {
		chart: {
			type: "bar",
			height: 350,
		},
		plotOptions: {
			bar: {
				horizontal: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: {
			categories: usernames,
		},
	}

	return (
		<div className="ui fluid container">
			<Header
				currentUser={currentUser}
				likes={currentUserLikes}
				handleLogin={handleLogin}
				handleLogout={handleLogout}
			/>
			<div className="ui middle aligned stackable grid">
				<div className="six wide column">
					<div className="ui center aligned basic segment">
						<Image src={pizza} className="ui centered image" />
						<Button
							content="I Love Pizza!"
							labelPosition="left"
							icon="heart"
							size="big"
							color="red"
							style={{ margin: 30 }}
							onClick={likeButtonHandler}
							data-testid="like-button"
						/>
					</div>
				</div>
				<div className="ten wide column">
					<div className="ui center aligned basic segment">
						<ReactApexChart
							options={options}
							series={series}
							type="bar"
							height={350}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
