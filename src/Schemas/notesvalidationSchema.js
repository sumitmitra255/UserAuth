import * as yup from 'yup'

export const notesvalidationSchema = yup.object({
	title: yup
		.string('Title Must be String')
		.min(1, 'Title should be of minimum 1 characters length')
		.required('Title is required'),
	body: yup
		.string('Body Must be String')
		.min(1, 'Body should be of minimum 1 characters length')
		.required('Body is required'),
})
