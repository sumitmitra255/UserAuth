import './App.css'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './Login.js'
import Register from './Register.js'
import { Home } from './Home'
import { Account } from './Account'
import { Logout } from './Logout'
import { UserLogOutView } from './UserLogOutView'
import { UserLoginView } from './UserLoginView'
import ParticlesBg from 'particles-bg'
function App() {
	const [loginToken, setLoginToken] = useState(
		localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''
	)
	const [regitrationStatus, setRegitrationStatus] = useState(false)
	return (
		<Router>
			<h1 class='navbar'>User Auth</h1>
			<br />
			<hr />
			{loginToken ? (
				<>
					<ParticlesBg type='lines' bg={true} />
					<Redirect to='/loginview' />
				</>
			) : (
				<>
					<ParticlesBg type='lines' bg={true} />
					<Redirect to='/logoutView' />
				</>
			)}
			{/* All the routes in the app are here */}
			<Route
				exact
				path='/login'
				render={(props) => (
					<Login
						setLoginToken={setLoginToken}
						regitrationStatus={regitrationStatus}
					/>
				)}
			/>
			<Route
				exact
				path='/register'
				render={(props) => (
					<Register setRegitrationStatus={setRegitrationStatus} />
				)}
			/>
			<Route
				exact
				path='/home'
				render={(props) => <Home loginToken={loginToken} />}
			/>
			<Route
				exact
				path='/account'
				render={(props) =>
					loginToken ? (
						<Account loginToken={loginToken} />
					) : (
						<Redirect to='/login' />
					)
				}
			/>
			<Route
				exact
				path='/logout'
				render={(props) => (
					<Logout loginToken={loginToken} setLoginToken={setLoginToken} />
				)}
			/>
			<Route exact path='/loginview' render={(props) => <UserLoginView />} />
			<Route exact path='/logoutview' render={(props) => <UserLogOutView />} />
			<br />
			<hr />
		</Router>
	)
}

export default App
