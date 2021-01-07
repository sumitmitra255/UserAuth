import React from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import axios from 'axios'
import swal from 'sweetalert'
import { notesvalidationSchema } from '../Schemas/notesvalidationSchema'
export const AddNote = (props) => {
	const { loginToken, setSavedNote } = props
	const formik = useFormik({
		initialValues: {
			title: '',
			body: '',
		},
		validationSchema: notesvalidationSchema,
		onSubmit: (values) => {
			axios
				.post('http://dct-user-auth.herokuapp.com/api/notes', values, {
					headers: { 'x-auth': loginToken.token },
				})
				.then((response) => {
					if (response.data._id) {
						swal('Whoa!', `Dear user Your Notes Save is Sucessful!`, 'success')
						setSavedNote([response.data])
					} else {
						swal('Oops! Notes Save Failed!', response.data.message, 'error')
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
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id='title'
					name='title'
					label='title'
					type='text'
					value={formik.values.title}
					onChange={formik.handleChange}
					error={formik.touched.title && Boolean(formik.errors.title)}
					helperText={formik.touched.title && formik.errors.title}
				/>
				<TextField
					fullWidth
					multiline
					id='body'
					name='body'
					label='body'
					type='text'
					placeholder='enter your notes body'
					value={formik.values.body}
					onChange={formik.handleChange}
					error={formik.touched.body && Boolean(formik.errors.body)}
					helperText={formik.touched.body && formik.errors.body}
				/>
				<Button color='primary' variant='contained' fullWidth type='submit'>
					Save
				</Button>
			</form>
		</>
	)
}
