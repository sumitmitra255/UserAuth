import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Redirect } from 'react-router-dom'
import { UserLoginView } from './UserLoginView'
import swal from 'sweetalert'
export const Account = (props) => {
	const { loginToken } = props
	const [details, setDetails] = useState({})
	useEffect(() => {
		axios
			.get('http://dct-user-auth.herokuapp.com/users/account', {
				headers: { 'x-auth': loginToken.token },
			})
			.then((response) => {
				if (response.data) {
					setDetails(response.data)
				} else {
					swal('Server is LOST. Please Try Again after Sometime!', '', 'error')
				}
			})
			.catch((err) => {
				swal(
					'Server is LOST. Please Try Again after Sometime!',
					err.message,
					'error'
				)
			}, [])
	}, [])
	return (
		<>
			<UserLoginView />
			<br />
			<hr />
			<div class='Login-container'>
				Id : {details._id} <br />
				Username : {details.username}
				<br />
				Emails :{details.email}
				<br />
				CreatedAt :{details.createdAt}
			</div>
		</>
	)
}
