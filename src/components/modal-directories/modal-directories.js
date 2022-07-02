import React, {Component} from 'react';
import {connect} from 'react-redux';

import {compose, withAdminAccountService} from '../hoc';
import { openModalDirectories, inputChanged, additInputChanged } from '../../actions';
import {onClickModalBox, hideModal, addZerosToNum} from '../../utils';

import FormDirectories from '../form-directories';
import styles from './modal-directories.m.less';

class ModalDirectories extends Component {

	handleKeyDown = (e) => {
		if (e.code === 'Escape' && document.querySelector('[class^="modalDirectories"]').style.display === 'block') {
			hideModal('[class^="modalDirectories"]');
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	createLabel = ({id}, idx, arr, flagAddit=false) => {
		const additLabel = flagAddit ? <p className={styles.additLabel}>добавить</p> : null;
		return (
			<li key={id} className={styles.itemLabel}>
				<label htmlFor={id} className={styles.labelTitle}>
					{additLabel}
					<span>{addZerosToNum(id, 1000)}</span>
				</label>
			</li>
		);
	}

	createAdditLabel = ({id}, idx, arr, flagAddit=true) => {
		if (idx === 0) {
			return this.createLabel({['id']: ++id}, idx, arr, flagAddit);
		}
	}

	createInput = ({id, title=''}, idx, arr, read=true, onChange) => {

		return (
			<li key={id} className={styles.itemInput}>
				<input type='text' name={`title${id}`} 
						id={id} value={title} readOnly={read}
						onChange={(e) => onChange(e.target.value)}
						className={styles.inputTitle} />
			</li>
		);
	}

	createAdditInput = ({id}, idx, arr) => {
		const {additTitle, onChange} = this.props;
		if (idx === 0) {
			return this.createInput({['id']: ++id, title: additTitle}, idx, arr, false, onChange);
		}
	}

	render() {
		const {labelSearch, list, type, visibleList, inputChanged, searchTitle} = this.props;
		const contentLabels = visibleList ? visibleList.map(this.createLabel) : null;
		const contentInputs = visibleList ? visibleList.map(this.createInput) : null;
		const additLabel = type === 'extendable' && visibleList ? 
									visibleList.map(this.createAdditLabel) : null;
		const additInput = type === 'extendable' && visibleList ? 
									visibleList.map(this.createAdditInput) : null;
		
		return(
			<div className={styles.modalDirectories}
					onClick={(e) => onClickModalBox('[class^="modalDirectories"]', e)}>
				<div className={styles.modalNewsDialog}>
					<div className={styles.modalNewsContent}>
						<FormDirectories labelSearch={labelSearch} list={list} type={type}
									contentLabels={contentLabels} contentInputs={contentInputs}
									additLabel={additLabel} additInput={additInput} 
									inputChanged={inputChanged} searchTitle={searchTitle} />
					</div>
				</div>
			</div>
		);
	}
}

const mapMethodsToProps = (adminAccountService) => ({
	putTitleDirectory: adminAccountService.putTitleDirectory
});

const mapStateToProps = ({labelSearchDirect,listTitleDirect,typeDirect,
									visibleListTitle, searchTitle, additTitle}) => ({
	labelSearch: labelSearchDirect,
	list: listTitleDirect,
	type: typeDirect,
	visibleList: visibleListTitle,
	searchTitle, additTitle
});

const mapDispatchToProps = (dispatch) => ({
	inputChanged: (fieldName, value) => dispatch(inputChanged(fieldName, value)),
	onChange: (value) => dispatch(additInputChanged(value))
});

export default compose(
	withAdminAccountService(mapMethodsToProps),
	connect(mapStateToProps, mapDispatchToProps)
)(ModalDirectories);