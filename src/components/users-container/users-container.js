import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import {filterOffices, openModalNewUser, inputChanged,
			onSearchUsers} from '../../actions'; 
import {openModal} from '../../utils';

import ListBtnsOffices from '../list-btns-offices';
import BoxSearchUsers from '../box-search-users';
import UsersTable from '../users-table';
import ModalUser from '../modal-user';
import ModalConfirm from '../modal-confirm';
import PaginationUsers from '../pagination-users';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import styles from './users-container.m.less';

class UsersContainer extends Component {

	addUser = () => {
		this.props.openModalNewUser();
		openModal('[class^="modalUser"]');
	}

	render() {
		const {listOffices, filterOffices, isActiveOffice,
				inputChanged, onSearch, searchUsers,
				visibleUsersList} = this.props;
		
		return (
			<div>
				<div className={styles.boxBtnsOffices}>
					<ListBtnsOffices listOffices={listOffices} filterOffices={filterOffices}
								isActiveOffice={isActiveOffice} />
					<button type="button" className={styles.btnAddUser}
								onClick={this.addUser}>
						Добавить пользователя
					</button>
				</div>
				<BoxSearchUsers inputChanged={inputChanged} 
						onSearch={onSearch} searchUsers={searchUsers} />
				<UsersTable />
				<ModalUser />
				<ModalConfirm />
				<PaginationUsers visibleUsersList={visibleUsersList} />
			</div>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	//getDataDirectories: adminAccountService.getDataDirectories,
});

const mapStateToProps = ({listOffices, isActiveOffice, searchUsers, 
	visibleUsersList}) => ({
	listOffices, isActiveOffice,
	searchUsers, visibleUsersList
});

const mapDispatchToProps = (dispatch) => ({
	filterOffices: (id) => dispatch(filterOffices(id)),
	openModalNewUser: () => dispatch(openModalNewUser()),
	inputChanged: (fieldName, value) => dispatch(inputChanged(fieldName, value)),
	onSearch: () => dispatch(onSearchUsers())
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer);