import { UserLogOutNav } from '../Navigation/UserLogOutNav'
import { UserLoginNav } from '../Navigation/UserLoginNav'

export const Home = (props) => {
	const { loginToken } = props
	return (
		<>
			{loginToken ? (
				<>
					<UserLoginNav />
					<hr /> <h1 class='navbar'>You Have loggedin.</h1>{' '}
				</>
			) : (
				<>
					<UserLogOutNav />
					<hr /> <h1 class='navbar'>You Have LoggedOut</h1>
				</>
			)}
		</>
	)
}
