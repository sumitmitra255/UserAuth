import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
export const UserLoginNav = (props) => {
	return (
		<div class='navbar'>
			<Breadcrumbs aria-label='breadcrumb'>
				<Link to='/home'>Home</Link>|<Link to='/account'>Account </Link>|
				<Link to='/notes'>Notes </Link>
				<Link to='/logout'>Logout </Link>
			</Breadcrumbs>
		</div>
	)
}
