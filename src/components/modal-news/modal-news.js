import React, {Component} from 'react';
import {connect} from 'react-redux';

import styles from './modal-news.m.less';

class ModalNews extends Component {

	render() {
		const {flagOpenModalNews, headingModal} = this.props;
		const classModalNews = flagOpenModalNews ? 'openedModalNews' : 'hiddenModalNews'; 
		return (
			<div className={styles[classModalNews]}>
				<div className={styles.modalNewsDialog}>
					<div className={styles.modalNewsContent}>
						<h3 className={styles.headingModal}>
							{headingModal}
						</h3>
						
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



