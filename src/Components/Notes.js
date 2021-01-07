import { UserLoginNav } from '../Navigation/UserLoginNav.js'
import React, { useState } from 'react'
import { AddNote } from './AddNote'
import { DisplayNotes } from './DisplayNotes'

const Notes = (props) => {
	const { loginToken } = props
	const [savedNote, setSavedNote] = useState([{}])

	return (
		<>
			<UserLoginNav />
			<div className='Notes-container'>
				<br />
				<AddNote loginToken={loginToken} setSavedNote={setSavedNote} />
				<DisplayNotes loginToken={loginToken} savedNote={savedNote} />
			</div>
		</>
	)
}
export default Notes
