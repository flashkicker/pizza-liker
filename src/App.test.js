import { fireEvent, render, waitFor } from "@testing-library/react"
import App from "./App"

jest.mock("react-apexcharts")
jest.mock("apexcharts")

const username = "John"
const password = "redredred"

test("Clicking like button without authentication should show alert", () => {
	const { getByTestId } = render(<App />)
	global.alert = jest.fn()

	const likeButton = getByTestId("like-button")
	fireEvent.click(likeButton)

	expect(global.alert).toHaveBeenCalledTimes(1)
})

test("User can sign up with username and password, like pizza 5 times and signout", async () => {
	const { getByTestId, getByPlaceholderText, queryByText } = render(<App />)

	const signupButton = getByTestId("signup")
	fireEvent.click(signupButton)

	const modal = getByTestId("auth-modal")
	await waitFor(() => modal)

	const usernameInput = getByPlaceholderText("Enter your username here...")
	const passwordInput = getByPlaceholderText("Enter your password here...")

	fireEvent.change(usernameInput, { target: { value: username } })
	fireEvent.change(passwordInput, { target: { value: password } })

	const confirmButton = getByTestId("confirm-modal")
	fireEvent.click(confirmButton)

	await waitFor(() => {
		expect(queryByText(`Welcome, ${username}`)).toBeInTheDocument()
	})

	const welcomeText = queryByText(`Welcome, ${username}`)
	const likesText = queryByText(new RegExp("You have", "i"))
	const likes = likesText.innerHTML.split(" ")[2]

	expect(welcomeText).toBeInTheDocument()

	const likeButton = getByTestId("like-button")
	fireEvent.click(likeButton)

	await waitFor(() => {
		expect(queryByText(`You have ${likes} likes`)).toBeInTheDocument()
	})

	const signoutButton = getByTestId("signout")
	fireEvent.click(signoutButton)

	fireEvent.click(likeButton)
	expect(global.alert).toHaveBeenCalledTimes(1)
})

test("User can sign in with same username and password and like pizza", async () => {
	const { getByTestId, getByPlaceholderText, queryByText } = render(<App />)

	const signinButton = getByTestId("signin")
	fireEvent.click(signinButton)

	const modal = getByTestId("auth-modal")
	await waitFor(() => modal)

	const usernameInput = getByPlaceholderText("Enter your username here...")
	const passwordInput = getByPlaceholderText("Enter your password here...")

	fireEvent.change(usernameInput, { target: { value: username } })
	fireEvent.change(passwordInput, { target: { value: password } })

	const confirmButton = getByTestId("confirm-modal")
	fireEvent.click(confirmButton)

	await waitFor(() => {
		expect(queryByText(`Welcome, ${username}`)).toBeInTheDocument()
	})

	const welcomeText = queryByText(`Welcome, ${username}`)
	const likesText = queryByText(new RegExp("You have", "i"))
	const likes = likesText.innerHTML.split(" ")[2]

	expect(welcomeText).toBeInTheDocument()

	const likeButton = getByTestId("like-button")
	fireEvent.click(likeButton)

	await waitFor(() => {
		expect(queryByText(`You have ${likes} likes`)).toBeInTheDocument()
	})
})
