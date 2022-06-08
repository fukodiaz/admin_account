import React, {Component} from 'react';

import styles from './management-directories.m.less';

class ManagementDirectories extends Component {

	render() {

		return (
			<li>
				<button className={styles.buttonDirectories}>
					<h2 className={styles.headerDirectories}>
						Управление справочниками
					</h2>
				</button>
			</li>
		);
	}
}

export default ManagementDirectories;