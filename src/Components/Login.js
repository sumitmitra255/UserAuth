import React from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import axios from 'axios'
import { validationSchema } from '../Schemas/validationSchema'
import { UserLogOutNav } from '../Navigation/UserLogOutNav'
import swal from 'sweetalert'
import '../App.css'
const Login = (props) => {
	const { setLoginToken, regitrationStatus } = props

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios
				.post('http://dct-user-auth.herokuapp.com/users/login', values)
				.then((response) => {
					if (response.data.token) {
						setLoginToken(response.data)
						localStorage.setItem('user', JSON.stringify(response.data))
					} else {
						swal('Oops! Login Failed!', response.data.errors, 'error')
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
			<UserLogOutNav />
			<div class='Login-container'>
				{regitrationStatus ? (
					<h1>
						<br />
						User Is registered Sucesfully! Please Login
					</h1>
				) : (
					''
				)}

				<form onSubmit={formik.handleSubmit}>
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
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<Button color='primary' variant='contained' fullWidth type='submit'>
						Submit
					</Button>
				</form>
			</div>
		</>
	)
}
export default Login
