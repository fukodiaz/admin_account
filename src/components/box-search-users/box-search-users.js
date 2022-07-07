import React from 'react';

import styles from './box-search-users.m.less';

const BoxSearchUsers = ({}) => {

	return (
		<div className={styles.boxSearchUsers}>
			<input type="search" name="searchUsers" 
								//onChange={(e) => inputChanged('searchTitle', e.target.value)}
								//value={searchTitle}
								className={styles.inputSearchUsers} 
								placeholder="ФИО + email" />
			<button type="button" className={styles.btnSearchUsers}>
				Поиск
			</button>
		</div>
	);
};

export default BoxSearchUsers;