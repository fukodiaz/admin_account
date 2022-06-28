import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import {newsDeleteRequested, newsDeleted, newsDeleteError} from '../../actions';

import {onClickModalBox, hideModal} from '../../utils';
import styles from './modal-confirm.m.less';

const ModalConfirm = (props) => {
	const {deleteNews, IdNewsDeleted, newsDeleteRequested,
			newsDeleted, newsDeleteError} = props;

	const handleKeyDown = (e) => {
		if (e.code === 'Escape' && document.querySelector('[class^="modalConfirm"]').style.display === 'block') {
			hideModal('[class^="modalConfirm"]');
		}
	};

	const confirmDelete = (IdNewsDeleted) => {
		newsDeleteRequested();
		deleteNews(IdNewsDeleted)
			.then((data) => {
				newsDeleted(data);
				console.log(data, '222del');
			})
			.catch((error) => {newsDeleteError(error); console.log(error, '444erDel');})
			.finally(() => hideModal('[class^="modalConfirm"]'));
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<div className={styles.modalConfirm}
					onClick={(e) => onClickModalBox('[class^="modalConfirm"]', e)}>
			<div className={styles.modalNewsDialog}>
				<div className={styles.modalNewsContent}>
					<h3 className={styles.headingModal}>
						Вы действительно хотите удалить новость ?
					</h3>
					<div className={styles.boxButtons}>
						<button type="submit" className={styles.btnConfirm}
									onClick={() => confirmDelete(IdNewsDeleted)}>
							Ок
						</button>
						<button type="button" className={styles.btnCancel}
									onClick={() => hideModal('[class^="modalConfirm"]')}>
							Отмена
						</button>
				</div>
				</div>
			</div>
		</div>
	);
};

const mapMethodsToProps = (adminAccountService) => ({
	deleteNews: adminAccountService.deleteNews
});

const mapStateToProps = ({IdNewsDeleted}) => ({
	IdNewsDeleted
});

const mapDispatchToProps = (dispatch) => ({
	newsDeleteRequested: () => dispatch(newsDeleteRequested()),
	newsDeleted: (data) => dispatch(newsDeleted(data)),
	newsDeleteError: (error) => dispatch(newsDeleteError(error)),
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ModalConfirm);

