import React, {Component} from 'react';
import {connect} from 'react-redux';

import { editingPersonalData } from '../../actions';
import {compose, withAdminAccountService} from '../hoc';
import {
	dataPersonalRequested,
	dataPersonalPosted,
	dataPersonalError } from '../../actions';

import pencil from './pencil.svg';
import styles from './form-personal-data.m.less';

class FormPersonalData extends Component {

	state = {
		image: null
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const objForm = JSON.stringify(Object.fromEntries(formData.entries(formData)));
		this.props.dataPersonalRequested();
		//this.props.postingDataPersonal(objForm);
		this.props.postDataPersonal(formData)
			.then(data => {
				this.props.dataPersonalPosted(data); 
				console.log(data, '222ggg', data.photo);
				this.setState({image: (<img src={`data:${data.imagePhotoType};base64, ${data.photo}`} alt="ffff" />)});
				//this.state.image = <image src={`data:image/png;base64, ${data.photo}`} alt="ffff" />;
			})
			.catch(error => {this.props.dataPersonalError(error); console.log(error, '444ererer');});
	}

	render() {
		const {flagEditingPersonal, editingPersonalData} = this.props;
		console.log(flagEditingPersonal, 22);
		let classForm = flagEditingPersonal ? 'formPersonal' : 'formActive';
		let disabled = flagEditingPersonal ? true : false;

		return (
			<div className={styles.containerFormPersonal}>
				<form encType="multipart/form-data" className={styles[`${classForm}`]}
							onSubmit={this.handleSubmit}>
					<div className={styles.wrapperInputs}>
						<div className={styles.blockPhoto}>
							<label htmlFor="photo" className={styles.labelPhotoPersonal}>
										Загрузить фото
							</label>
							<input type="file" id="photo" name="photo"
										accept="image/jpeg, image/png"
										className={styles.inputPhotoPersonal} disabled={disabled} />
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
				{this.state.image}
			</div>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	postDataPersonal: adminAccountService.postDataPersonal
});

const mapStateToProps = ({flagEditingPersonal}) => ({
	flagEditingPersonal
});

const mapDispatchToProps = (dispatch) => ({
	editingPersonalData: () => dispatch(editingPersonalData()),
	//postingDataPersonal: (data) => postingDataPersonal(postDataPersonal, dispatch)(data),
	dataPersonalRequested: () => dispatch(dataPersonalRequested()),
	dataPersonalPosted: (data) => dispatch(dataPersonalPosted(data)),
	dataPersonalError: (error) => dispatch(dataPersonalError(error))
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(FormPersonalData);
