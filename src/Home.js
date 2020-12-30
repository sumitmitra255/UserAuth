import { UserLogOutView } from './UserLogOutView'
import { UserLoginView } from './UserLoginView'

export const Home = (props) => {
	const { loginToken } = props
	return (
		<>
			{loginToken ? (
				<>
					<UserLoginView />
					<hr /> <h1 class='navbar'>You Have loggedin.</h1>{' '}
				</>
			) : (
				<>
					<UserLogOutView />
					<hr /> <h1 class='navbar'>You Have LoggedOut</h1>
				</>
			)}
		</>
	)
}
