import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
export const UserLogOutNav = (props) => {
	return (
		<div class='navbar'>
			<Breadcrumbs aria-label='breadcrumb'>
				<Link to='/login'>Login</Link>|<Link to='/register'>Register</Link>|
				<Link to='/home'>Home</Link>|
			</Breadcrumbs>
		</div>
	)
}
