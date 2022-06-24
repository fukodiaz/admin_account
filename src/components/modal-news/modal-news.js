import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import {newsImageRequested, newsImagePosted, 
			newsImageError, newsDataRequested, 
			newsDataPosted, newsDataError} from '../../actions';

import FormNews from '../form-news';
import {onClickModalBox, hideModal} from '../../utils';
import styles from './modal-news.m.less';

class ModalNews extends Component {

	state = { nameFileImage: null };

	handleKeyDown = (e) => {
		if (e.code === 'Escape' && document.querySelector('[class^="modalBox"]').style.display === 'block') {
			hideModal('[class^="modalBox"]');
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		this.props.newsDataRequested();

		this.props.postNewsData(formData)
			.then(data => {
				this.props.newsDataPosted(data); 
				console.log(data, '222ggg');
			})
			.catch(error => {this.props.newsDataError(error); console.log(error, '444ererer');})
			.finally(() => {
				e.target.reset();
				hideModal('[class^="modalBox"]');
			});
	}

	onChangeImage = (e) => {
		e.preventDefault();

		if (e.target.files[0]) {
			const formData = new FormData();
			formData.append('image', e.target.files[0]);
			this.props.newsImageRequested();

			this.props.postNewsImage(formData)
				.then(data => {
					this.props.newsImagePosted(data); 
					console.log(data, '222ggg', data.image);
					if (data.image !== null) {
						this.setState({nameFileImage: data.nameFileImage});
					}
				})
				.catch(error => {this.props.newsImageError(error); console.log(error, '444ererer');});
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}


	render() {
		const {flagOpenModalNews, headingModal} = this.props;
		//const classModalNews = flagOpenModalNews ? 'openedModalBox' : 'hiddenModalNews'; 
		return (
			<div className={styles.modalBox}
					onClick={(e) => onClickModalBox('[class^="modalBox"]', e)}>
				<div className={styles.modalNewsDialog}>
					<div className={styles.modalNewsContent}>
						<h3 className={styles.headingModal}>
							{headingModal}
						</h3>
						<FormNews onChangeImage={this.onChangeImage} handleSubmit={this.handleSubmit}
									nameFileImage={this.state.nameFileImage} />
					</div>
				</div>
			</div>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	postNewsImage: adminAccountService.postNewsImage,
	postNewsData: adminAccountService.postNewsData
});

const mapStateToProps = ({flagOpenModalNews, headingModal, newsImage, newsData}) => ({
	flagOpenModalNews, headingModal, 
	newsImage, newsData
});

const mapDispatchToProps = (dispatch) => ({
	newsImageRequested: () => dispatch(newsImageRequested()),
	newsImagePosted: (data) => dispatch(newsImagePosted(data)),
	newsImageError: (error) => dispatch(newsImageError(error)),
	newsDataRequested: () => dispatch(newsDataRequested()),
	newsDataPosted: (data) => dispatch(newsDataPosted(data)),
	newsDataError: (error) => dispatch(newsDataError(error)),
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ModalNews);