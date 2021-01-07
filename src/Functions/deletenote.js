import axios from 'axios';
import _ from 'lodash';
import swal from 'sweetalert';

export const deletenote = (delnote, loginToken, displayNotes, setDisplayNotes) => {
	swal(
		'Please Confirm if you want to delete',
		'Please press Ok! If you sure about deleting the note',
		'info'
	).then((value) => {
		if (value) {
			axios
				.delete(`http://dct-user-auth.herokuapp.com/api/notes/${delnote._id}`, {
					headers: { 'x-auth': loginToken.token },
				})
				.then((response) => {
					if (response.data._id) {
						swal(
							'Deleted:)',
							`Dear user Your Notes deletion is Sucessful!`,
							'success'
						);
						let newDisplayNotes = _.remove(displayNotes, function (n) {
							return n._id !== response.data._id;
						});
						setDisplayNotes(newDisplayNotes.reverse());
					} else {
						swal('Oops! Notes deletion Failed!', response.data.message, 'error');
					}
				})
				.catch((err) => {
					swal(
						'Server is LOST. Please Try Again after Sometime!',
						err.message,
						'error'
					);
				}, []);
		}
	});
};
