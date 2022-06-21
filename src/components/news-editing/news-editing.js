import React, {Component} from 'react';
import {connect} from 'react-redux';
import { openBlock } from '../../actions';

import ContainerNews from '../container-news';

import styles from './news-editing.m.less';

class NewsEditing extends Component {

	render() {
		const {flagOpenNews, openBlock} = this.props;
		let contentNews = flagOpenNews ? <ContainerNews /> : null;

		return (
			<li>
				<button className={styles.buttonNewsEditing}
							onClick={openBlock}>
					<h2 className={styles.headerNewsEditing}>
						Редактирование новостей
					</h2>
				</button>
				{contentNews}
			</li>
		);
	}
}

const mapStateToProps = ({flagOpenNews}) => ({
	flagOpenNews
});

const mapDispatchToProps = (dispatch) => ({
	openBlock: () => dispatch(openBlock('newsEditing'))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsEditing);