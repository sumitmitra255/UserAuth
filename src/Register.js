import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { validationSchema } from './validationSchema'
import { UserLogOutView } from './UserLogOutView'
import swal from 'sweetalert'
const Register = (props) => {
	const { setRegitrationStatus } = props
	const [registered, setRegistered] = useState(false)
	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios
				.post('http://dct-user-auth.herokuapp.com/users/register', values)
				.then((response) => {
					if (response.data._id) {
						swal(
							'Whoa!',
							`Dear ${response.data.username} Your Registration is Sucessful!`,
							'success'
						)
						setRegistered(true)
						setRegitrationStatus(true)
					} else {
						swal('Oops! Registrations Failed!', response.data.message, 'error')
					}
				})
				.catch((err) => {
					swal(
						'Server is LOST. Please Try Again after Sometime!',
						err.message,
						'error'
					)
				}, [])
		},
	})

	return (
		<>
			<UserLogOutView />
			<div class='Login-container'>
				{registered ? (
					<Redirect to='/login' />
				) : (
					<>
						<form onSubmit={formik.handleSubmit}>
							<TextField
								fullWidth
								id='username'
								name='username'
								label='username'
								type='text'
								value={formik.values.username}
								onChange={formik.handleChange}
								error={
									formik.touched.username && Boolean(formik.errors.username)
								}
								helperText={formik.touched.username && formik.errors.username}
							/>
							<TextField
								fullWidth
								id='email'
								name='email'
								label='Email'
								placeholder='abc@xyz.com'
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
							/>
							<TextField
								fullWidth
								id='password'
								name='password'
								label='Password'
								type='password'
								value={formik.values.password}
								onChange={formik.handleChange}
								error={
									formik.touched.password && Boolean(formik.errors.password)
								}
								helperText={formik.touched.password && formik.errors.password}
							/>
							<Button
								color='primary'
								variant='contained'
								fullWidth
								type='submit'>
								Submit
							</Button>
						</form>
					</>
				)}
			</div>
		</>
	)
}
export default Register
