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
						<Menu.Item name="welcome" header as="h3">
							{`Welcome, ${currentUser}`}
						</Menu.Item>
						<Menu.Item name="likes" header as="h3">
							{`You have ${likes} likes`}
						</Menu.Item>
						<Menu.Item name="logout" header as="h3" link onClick={handleLogout}>
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
						>
							<i className="sign-in icon"></i>
							Sign In
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
