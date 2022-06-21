import React, {Component} from 'react';
import {connect} from 'react-redux';

import {openModalCreationNews} from '../../actions';

import ListNews from '../list-news';
import styles from './container-news.m.less';

class ContainerNews extends Component {

	render () {
		const {openModalCreationNews} = this.props;

		return (
			<div className={styles.containerNews}>
				<ListNews />
				<button type="button" className={styles.btnCreateNews}
							onClick={openModalCreationNews}>
					Создать новость
				</button>
				<button type="button" className={styles.btnShowAllNews}
							onClick={() => {}}>
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
	openModalCreationNews: () => dispatch(openModalCreationNews())
});

export default connect(undefined, mapDispatchToProps)(ContainerNews);

