import React, { useState } from "react"
import { Menu } from "semantic-ui-react"
import AuthModal from "./AuthModal"

export const Header = ({ currentUser, likes, handleLogin, handleLogout }) => {
	const [open, setOpen] = useState(false)
	const [modalType, setModalType] = useState("")

	const openModal = (type) => {
		setOpen(true)
		setModalType(type)
	}

	const closeModal = () => {
		setOpen(false)
		setModalType("")
	}

	return (
		<Menu pointing borderless stackable>
			<Menu.Item header as="h2">
				<i className="heart icon"></i>
				Pizza Liker
			</Menu.Item>
			<Menu.Menu position="right">
				{currentUser.length ? (
					<>
						<Menu.Item name="welcome" header as="h3" data-testid="welcome">
							{`Welcome, ${currentUser}`}
						</Menu.Item>
						<Menu.Item name="likes" header as="h3" data-testid="likes">
							{`You have ${likes} likes`}
						</Menu.Item>
						<Menu.Item
							name="logout"
							header
							as="h3"
							link
							onClick={handleLogout}
							data-testid="signout"
						>
							<i className="sign-out icon"></i>
							Signout
						</Menu.Item>
					</>
				) : (
					<>
						<Menu.Item
							name="signup"
							header
							as="h3"
							link
							onClick={() => openModal("signup")}
							data-testid="signup"
						>
							<i className="pencil alternative icon"></i>
							Signup
						</Menu.Item>
						<Menu.Item
							name="signin"
							header
							as="h3"
							link
							onClick={() => openModal("signin")}
							data-testid="signin"
						>
							<i className="sign-in icon"></i>
							Signin
						</Menu.Item>
					</>
				)}
			</Menu.Menu>
			<AuthModal
				type={modalType}
				onClose={closeModal}
				visible={open}
				handleLogin={handleLogin}
			/>
		</Menu>
	)
}
