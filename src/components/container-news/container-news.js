import React, {Component} from 'react';
import {connect} from 'react-redux';

import {openModalCreationNews, showAllNews} from '../../actions';
import { openModal } from '../../utils';

import ListNews from '../list-news';
import styles from './container-news.m.less';

class ContainerNews extends Component {

	createNews = () => {
		this.props.openModalCreationNews();
		openModal('[class^="modalBox"]');
	};

	render () {
		const {showAllNews} = this.props;

		return (
			<div className={styles.containerNews}>
				<ListNews />
				<button type="button" className={styles.btnCreateNews}
							onClick={this.createNews}>
					Создать новость
				</button>
				<button type="button" className={styles.btnShowAllNews}
							onClick={showAllNews}>
					Показать все новости
				</button>
			</div>
		);
	}
}

// const mapStateToProps = (state) => ({
// 	//flagModalCreationNews
// });

const mapDispatchToProps = (dispatch) => ({
	openModalCreationNews: () => dispatch(openModalCreationNews()),
	showAllNews: () => dispatch(showAllNews())
});

export default connect(undefined, mapDispatchToProps)(ContainerNews);

