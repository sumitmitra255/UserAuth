import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import axios from 'axios'
import swal from 'sweetalert'
import { deletenote } from '../Functions/deletenote'
import { fetchNoteDetails } from '../Functions/fetchNoteDetails'

export const DisplayNotes = (props) => {
	const { loginToken, savedNote } = props
	const [displayNotes, setDisplayNotes] = useState([])

	useEffect(() => {
		axios
			.get('https://dct-user-auth.herokuapp.com/api/notes', {
				headers: { 'x-auth': loginToken.token },
			})
			.then((response) => {
				if (response.data) {
					setDisplayNotes(response.data)
				} else {
					swal('Oops! Notes retrieve Failed!', response.data.message, 'error')
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
	useEffect(() => {
		if (Object.keys(savedNote).length) {
			setDisplayNotes([...displayNotes, ...savedNote])
		}
	}, [savedNote])

	return (
		<>
			{displayNotes ? (
				<ul>
					{displayNotes.reverse().map((ele, i) => {
						return (
							<>
								<li
									key={i}
									onClick={() => fetchNoteDetails(ele._id, loginToken)}>
									{ele.title}
								</li>
								<Button
									color='primary'
									variant='contained'
									onClick={() =>
										deletenote(ele, loginToken, displayNotes, setDisplayNotes)
									}>
									Delete.
								</Button>
							</>
						)
					})}
				</ul>
			) : (
				'Loading'
			)}
		</>
	)
}
