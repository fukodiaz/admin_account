import React, {Component} from 'react';
import {connect} from 'react-redux';
import { openItemList } from '../../actions';

import FormPersonalData from '../form-personal-data';

import styles from './personal-data.m.less';

class PersonalData extends Component {

	render() {

		const {flagOpenItem, openItemList} = this.props;
		let contentItemList = flagOpenItem ? <FormPersonalData /> : null;

		return (
			<li>
				<button className={styles.buttonPersonalData}
							onClick={openItemList}>
					<h2 className={styles.headerPersonalData}>
						Персональные данные
					</h2>
				</button>
				{contentItemList}
			</li>
		);
	}
}

const mapStateToProps = ({flagOpenItem}) => ({
	flagOpenItem
});

const mapDispatchToProps = (dispatch) => ({
	openItemList: () => dispatch(openItemList())
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);