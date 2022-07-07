import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import {fetchUsersData} from '../../actions';

import styles from './users-table.m.less';
import pencil from './pencil.svg';
import trash from './trash.svg';

class UsersTable extends Component {

	componentDidMount() {
		this.props.fetchUsersData();
	}

	createRow = (userData, idx) => {
		const {entityId, fio, department, position, email, phone, password} = userData;

		return (
			<tr key={entityId} className={styles.rowTbodyUser}>
				<td className={styles.userIndex}>{++idx}</td>
				<td className={styles.userFIO}>{fio}</td>
				<td className={styles.userDepartment}>{department}</td>
				<td className={styles.userPhone}>{phone}</td>
				<td className={styles.userEmail}>{email}</td>
				<td className={styles.userPassword}>{password}</td>
				<td className={styles.userActions}>
					<button type="button" className={styles.buttonEditing}
							onClick={() => {}}>
						<p className={styles.svgBoxEditing}>
							<svg width="100%" height="100%">
								<use href={`${pencil}#pencil`}></use>
							</svg>
						</p>
					</button>
					<button type="button" className={styles.buttonDel}
							onClick={() => {}}>
						<p className={styles.svgBoxDel}>
							<svg width="100%" height="100%">	
								<use href={`${trash}#trash`}></use>
							</svg>
						</p>
					</button>
				</td>
			</tr>
		);
	}

	render() {
		const {usersList, usersListError} = this.props;
		console.log(usersList, 44);
		console.log(usersListError, 22);
		const contentUsers = usersList ?  usersList.map(this.createRow) : null;
		return (
			<table className={styles.tableUsers}>
				<thead>
					<tr className={styles.rowTheadUsers}>
						<th className={styles.userHindex}>№</th>
						<th className={styles.userHFIO}>ФИО</th>
						<th className={styles.userHdepartment}>Структурное подразделение</th>
						<th className={styles.userHphone}>Телефон</th>
						<th className={styles.userHemail}>Почта</th>
						<th className={styles.userHpassword}>Пароль</th>
						<th className={styles.userHactions}>Действия</th>
					</tr>
				</thead>
				<tbody>
					{contentUsers}
				</tbody>
			</table>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	getUsers: adminAccountService.getUsers,
});

const mapStateToProps = ({usersList, usersListError}) => ({
	usersList, usersListError
});

const mapDispatchToProps = (dispatch, {getUsers}) => ({
	fetchUsersData: () => fetchUsersData(getUsers, dispatch)()
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(UsersTable);