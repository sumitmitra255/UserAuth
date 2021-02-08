import axios from 'axios';
import swal from 'sweetalert';

export const fetchNoteDetails = (noteid, loginToken) => {
	axios
		.get(`https://dct-user-auth.herokuapp.com/api/notes/${noteid}`, {
			headers: { 'x-auth': loginToken.token },
		})
		.then((response) => {
			swal(`${response.data.title}`, `${response.data.body}`);
		})
		.catch((err) => {
			swal(
				'Server is LOST. Please Try Again after Sometime!',
				err.message,
				'error'
			);
		}, []);
};
