import React, { useState, useEffect } from 'react'
import axios from 'axios'
export const Logout = (props) => {
	const { loginToken, setLoginToken } = props
	useEffect(() => {
		axios
			.delete('http://dct-user-auth.herokuapp.com/users/logout', {
				headers: { 'x-auth': loginToken.token },
			})
			.then((response) => {
				setLoginToken('')
				localStorage.removeItem('user')
			})
			.catch((err) => {
				console.log(err.message)
			}, [])
	}, [])

	return <></>
}
