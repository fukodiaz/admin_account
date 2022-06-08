import React, {Component} from 'react';

import styles from './management-users.m.less';

class ManagementUsers extends Component {

	render() {

		return (
			<li>
				<button className={styles.buttonManagementUsers}>
					<h2 className={styles.headerManagementUsers}>
						Управление пользователями
					</h2>
				</button>
			</li>
		);
	}
}

export default ManagementUsers;