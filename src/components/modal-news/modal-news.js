import React, {Component} from 'react';
import {connect} from 'react-redux';

import FormNews from '../form-news';
import {onClickModalBox, hideModal} from '../../utils';
import styles from './modal-news.m.less';

class ModalNews extends Component {

	handleKeyDown = (e) => {
		if (e.code === 'Escape' && document.querySelector('[class^="modalBox"]').style.display === 'block') {
			hideModal('[class^="modalBox"]');
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
						<FormNews />
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = ({flagOpenModalNews, headingModal}) => ({
	flagOpenModalNews, 
	headingModal
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ModalNews);