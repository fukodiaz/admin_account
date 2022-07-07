import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import { hideModal, onClickModalBox } from '../../utils';

import FormUser from '../form-user';
import styles from './modal-user.m.less';

class ModalUser extends Component {
	handleKeyDown = (e) => {
		if (e.code === 'Escape' && document.querySelector('[class^="modalUser"]').style.display === 'block') {
			hideModal('[class^="modalUser"]');
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	render() {
		const {heading} = this.props;

		return(
			<div className={styles.modalUser}
					onClick={(e) => onClickModalBox('[class^="modalUser"]', e)}>
				<div className={styles.modalUserDialog}>
					<div className={styles.modalUserContent}>
						<FormUser heading={heading} />
					</div>
				</div>
			</div>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	//putTitleDirectory: adminAccountService.putTitleDirectory
});

const mapStateToProps = ({headingModalUser}) => ({
	heading: headingModalUser,
	
});

const mapDispatchToProps = (dispatch) => ({
	// inputChanged: (fieldName, value) => dispatch(inputChanged(fieldName, value)),
	// onChange: (data) => dispatch(additInputChanged(data)),
	// addIdAdditInput: (id) => dispatch(addIdAdditInput(id)),
	// putTitleRequested: () => dispatch(putTitleRequested()),
	// putTitleSuccess: (data) => dispatch(putTitleSuccess(data)),
	// putTitleError: (error) => dispatch(putTitleError(error))
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ModalUser);
