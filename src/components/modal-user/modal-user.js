import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import { inputChanged } from '../../actions';
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
		const {heading, currentDepartments, positions, inputChanged,
				position, department} = this.props;
		const dataOptionsDepartments = currentDepartments ? 
						currentDepartments.map(data => ({'value':data, 'label': data})) : null;
		const dataOptionsPositions = positions ? 
						positions.map(data => ({'value':data, 'label': data})) : null;

		return(
			<div className={styles.modalUser}
					onClick={(e) => onClickModalBox('[class^="modalUser"]', e)}>
				<div className={styles.modalUserDialog}>
					<div className={styles.modalUserContent}>
						<FormUser heading={heading} dataOptionsDepartments={dataOptionsDepartments}
									inputChanged={inputChanged} dataOptionsPositions={dataOptionsPositions}
									position={position} department={department} />
					</div>
				</div>
			</div>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	//putTitleDirectory: adminAccountService.putTitleDirectory
});

const mapStateToProps = ({headingModalUser, currentDepartments, 
	listPositions, position, department}) => ({
	heading: headingModalUser,
	currentDepartments,
	positions: listPositions,
	position, department
	
});

const mapDispatchToProps = (dispatch) => ({
	inputChanged: (fieldName, value) => dispatch(inputChanged(fieldName, value)),
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
