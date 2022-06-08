import React, {Component} from 'react';
import {connect} from 'react-redux';

import { editingPersonalData } from '../../actions';

import pencil from './pencil.svg';
import styles from './form-personal-data.m.less';

class FormPersonalData extends Component {

	render() {
		const {flagEditingPersonal, editingPersonalData} = this.props;
		console.log(flagEditingPersonal, 22);
		let classForm = flagEditingPersonal ? 'formPersonal' : 'formActive';
		let disabled = flagEditingPersonal ? true : false;

		return (
			<div className={styles.containerFormPersonal}>
				<form encType="multipart/form-data" className={styles[`${classForm}`]}>
					<div className={styles.wrapperInputs}>
						<div className={styles.blockPhoto}>
							<label htmlFor="photo" className={styles.labelPhotoPersonal}>
										Загрузить фото
							</label>
							<input type="file" id="photo" name="photo"
										accept="image/jpeg, image/png, image/svg"
										className={styles.inputPhotoPersonal} required disabled={disabled} />
						</div>
						<div className={styles.blockTextData}>
							<div className={styles.blockFIO}>
								<label htmlFor="fio" className={styles.labelTextData}>
									ФИО
								</label>
								<input type="text" name="fio" className={styles.inputTextData} 
											placeholder="Васильев Иван Романович" id="fio" required disabled={disabled} />
							</div>
							<div className={styles.blockEmail}>
								<label htmlFor="email" className={styles.labelTextData}>
									Email
								</label>
								<input type="email" name="email" className={styles.inputTextData} 
											placeholder="vasiliev@gmail.com" id="email" required disabled={disabled} />
							</div>
						</div>
					</div>
					<button type="submit" className={styles.buttonPersonal}>
						Сохранить
					</button>
				</form>
				<button type="button" className={styles.buttonEditing}
							onClick={editingPersonalData}>
					Редактировать
					<p className={styles.svgBox}>
						<svg width="20" height="20">
							<use href={`${pencil}#pencil`}></use>
						</svg>
					</p>
				</button>
			</div>
		);
	}
}

const mapStateToProps = ({flagEditingPersonal}) => ({
	flagEditingPersonal
});

const mapDispatchToProps = (dispatch) => ({
	editingPersonalData: () => dispatch(editingPersonalData())
});

export default connect(mapStateToProps, mapDispatchToProps)(FormPersonalData);
