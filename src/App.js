import './App.css'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './Components/Login.js'
import Register from './Components/Register.js'
import { Home } from './Components/Home'
import { Account } from './Components/Account'
import { Logout } from './Components/Logout'
import { UserLogOutNav } from './Navigation/UserLogOutNav'
import { UserLoginNav } from './Navigation/UserLoginNav'
import Notes from './Components/Notes.js'
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
					<Redirect to='/loginnav' />
				</>
			) : (
				<>
					<ParticlesBg type='lines' bg={true} />
					<Redirect to='/logoutnav' />
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
				path='/notes'
				render={(props) =>
					loginToken ? (
						<Notes loginToken={loginToken} />
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
			<Route exact path='/loginnav' render={(props) => <UserLoginNav />} />
			<Route exact path='/logoutnav' render={(props) => <UserLogOutNav />} />
			<br />
			<hr />
		</Router>
	)
}

export default App
