import React, {Component} from 'react';

import styles from './news-editing.m.less';

class NewsEditing extends Component {

	render() {

		return (
			<li>
				<button className={styles.buttonNewsEditing}>
					<h2 className={styles.headerNewsEditing}>
						Редактирование новостей
					</h2>
				</button>
			</li>
		);
	}
}

export default NewsEditing;