import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';

import NewsItem from '../news-item';
import styles from './list-news.m.less';

class ListNews extends Component {

	createNewsItem = (data) => {
		return <NewsItem {...data} />;
	}

	render() {
		const {dataNews} = this.props;
		
		return (
			<ul className={styles.listNews}>
				{dataNews.map(this.createNewsItem)}
			</ul>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	//postDataPersonal: adminAccountService.postDataPersonal,
});

const mapStateToProps = ({dataNews}) => ({
	dataNews
});

const mapDispatchToProps = (dispatch) => ({
	// dataPersonalRequested: () => dispatch(dataPersonalRequested()),
	// dataPersonalPosted: (data) => dispatch(dataPersonalPosted(data)),
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ListNews);

