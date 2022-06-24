import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import {newsListRequested, newsListLoaded,
			newsListError} from '../../actions';

import NewsItem from '../news-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import styles from './list-news.m.less';

class ListNews extends Component {
	
	componentDidMount() {
		const {getNewsList, newsListRequested, 
					newsListLoaded, newsListError} = this.props;

		newsListRequested();
		getNewsList()
			.then((data) => {
				newsListLoaded(data);
				console.log(data, '333newsss');})
			.catch((error) => {
				newsListError(error);
				console.log(error, 404);
			});
	}

	createNewsItem = (data) => {
		return <NewsItem {...data} />;
	}

	render() {
		const {visibleNewsList, newsListLoading, newsListError} = this.props;
		const contentListNews = visibleNewsList ? visibleNewsList.map(this.createNewsItem) : null;
		console.log(visibleNewsList, 777);

		if (newsListLoading) { 
			return( 
			<div className={styles.boxAdditional}>
				<Spinner />
			</div> )} 
		//if (newsListError) { return <ErrorIndicator />}
		return (
			<ul className={styles.listNews}>
				{contentListNews}
			</ul>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	getNewsList: adminAccountService.getNewsList,
});

const mapStateToProps = ({visibleNewsList, newsListLoading, newsListError}) => ({
	visibleNewsList, newsListLoading, newsListError
});

const mapDispatchToProps = (dispatch) => ({
	newsListRequested: () => dispatch(newsListRequested()),
	newsListLoaded: (data) => dispatch(newsListLoaded(data)),
	newsListError: (error) => dispatch(newsListError(error))
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ListNews);

