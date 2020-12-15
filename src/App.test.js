import { render, screen } from "@testing-library/react"
import App from "./App"
import ApexCharts from "apexcharts"
import ReactApexChart from "react-apexcharts"

jest.mock("react-apexcharts", () =>
	jest.fn(() => {
		return null
	})
)
jest.mock("apexcharts", () => ({
	exec: jest.fn(() => {
		return new Promise((resolve, reject) => {
			resolve("uri")
		})
	}),
}))

test("renders learn react link", () => {
	const { debug } = render(<App />)
	debug()
	// const linkElement = screen.getByText(/learn react/i);
	// expect(linkElement).toBeInTheDocument();
})
