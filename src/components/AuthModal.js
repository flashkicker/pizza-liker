import React, { useState } from "react"
import { Button, Modal, Form } from "semantic-ui-react"

import server from "../api/server"

const AuthModal = ({ type, onClose, visible, handleLogin }) => {
	const [state, setState] = useState({
		username: "",
		password: "",
	})

	const clearForm = () => setState({ username: "", password: "" })

	const handleModalClose = () => {
		onClose()
		clearForm()
	}

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		try {
			const response = await server.post(`/${type}`, {
				username: state.username,
				password: state.password,
			})

			handleLogin(response.data)
			handleModalClose()
		} catch (e) {
			alert("There was an error with your request")
		}
	}

	return (
		<Modal
			onClose={handleModalClose}
			open={visible}
			size="tiny"
			data-testid="auth-modal"
		>
			<Modal.Header>{type === "signup" ? "Sign Up" : "Sign In"}</Modal.Header>
			<Modal.Content>
				<Form>
					<Form.Field>
						<label>Username</label>
						<Form.Input
							placeholder="Enter your username here..."
							name="username"
							value={state.username}
							onChange={handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<Form.Input
							placeholder="Enter your password here..."
							name="password"
							value={state.password}
							onChange={handleChange}
							type="password"
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button
					content="Cancel"
					labelPosition="left"
					icon="close"
					onClick={handleModalClose}
					negative
					data-testid="close-modal"
				/>
				<Button
					content={type === "signup" ? "Confirm" : "Sign In"}
					labelPosition="left"
					icon="checkmark"
					onClick={handleSubmit}
					positive
					data-testid="confirm-modal"
				/>
			</Modal.Actions>
		</Modal>
	)
}

export default AuthModal
