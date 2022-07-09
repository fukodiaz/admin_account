import React from 'react';
import Select from 'react-select';

import styles from './form-user.m.less'

const FormUser = (props) => {
	const {heading, dataOptionsDepartments, inputChanged, 
			dataOptionsPositions, position, department} = props;
	const contentHeading = heading === 'headingNewUser' ? 
				<span>Добавить сотрудника <br /> выбранного управления</span> : null;
	const dot = (color = 'rgba(0,0,0,.7)') => ({
		color,
		fontSize: '15px',
		paddingLeft: '1px',
		paddingRight: 20
	});

	const selectStyles = (height=104) => ({
		input: styles => ({...styles, ...dot()}),
		placeholder: styles => ({...styles, ...dot()}),
		indicatorSeparator: (styles) => ({display:'none'}),
		control: (base, state) => ({
			...base,
			position: 'relative',
			boxShadow: 'none',
			border: state.isFocused ? '1px solid rgba(23, 135, 247, 0.4)' 
											: '1px solid rgba(160, 158, 158, 0.7)',
			outline: state.isFocused ? '2px solid rgba(23, 135, 247, 0.4) !important' : 'none',
			outlineOffset: '-2px',
			'&:hover': {
				borderColor: state.isFocused ? 'rgba(23, 135, 247, 0.4)' 
									: 'rgba(138, 136, 136, 0.4) !important',
				outline: state.isFocused ? '2px solid rgba(23, 135, 247, 0.4) !important' 
													:'1px solid rgba(138, 136, 136, 0.4) !important',
			},

			':after, :before': {
				content:'""',
				position: 'absolute',
				zIndex: 999,
				top: 19,
				right: 6,
				width: 9,
				height: 2,
				transform: 'rotate(-45deg)',
				backgroundColor: state.isFocused ? 'rgb(163,163,163)' : '#cccccc',
				'&:hover': {
					backgroundColor: 'rgb(163,163,163)'
				}
			},
			':before': {
				right: 12,
				transform: 'rotate(45deg)',
			},
		}),
		dropdownIndicator: base => ({
			...base,
			display:'none'
		}),
		menu: (provided, state) => ({
			...provided,
			width: '100%',
			padding: 0,
			fontSize: '15px',
		}),
		menuList: base => ({
			...base,
			maxHeight: height//104, 
		}),
		singleValue: (provided) => {
			return { ...provided, ...dot(), color:'#000' };
		},
		option: (provided, state) => ({
			...provided,
			color: '#000',
			lineHeight: '20px',
			backgroundColor: state.isSelected ? 'rgba(160, 158, 158, 0.2)' : '#fff',
			padding: '9px 11px 10px',
			margin: 0,
			borderBottom: '1px solid rgba(160, 158, 158, 0.4)',
			borderTop: '1px solid rgba(160, 158, 158, 0.1)',
			':first-child': {
				borderTop: 'none'
			},
			':last-child': {
				borderBottom: 'none'
			},
			'&:hover': {
				backgroundColor: 'rgba(160, 158, 158, 0.2)'
			}
		}),
	});

	const stylesPositions = selectStyles(167);
	const stylesDepartments = selectStyles();
	
	return (
		<div className={styles.boxFormUser}>
			<form className={styles.formUser}
					onSubmit={() => {}}>
				<h3 className={styles.headingFormUser}>
					{contentHeading}
				</h3>
				<div className={styles.boxInputsUser}>
					<div className={styles.containerInputFIO}>
						<input type="text" name="fio_user" 
									//onChange={(e) => inputChanged('searchTitle', e.target.value)}
									//value={searchTitle}
									className={styles.inputFIOUser} 
									placeholder="ФИО" />
					</div>
					<div className={styles.containerSelectPosition}>
						<Select 	value={position} name="position_user"
									options={dataOptionsPositions}
									onChange={(opt)=> inputChanged('position_user', opt)}
									placeholder="Должность" className={styles.selectPosition}
									styles={stylesPositions} isSearchable={false}>
						</Select>
					</div>
					<div className={styles.containerInputEmail}>
						<input type="email" name="email_user" 
									//onChange={(e) => inputChanged('searchTitle', e.target.value)}
									//value={searchTitle}
									className={styles.inputEmailUser} 
									placeholder="Почта" />
					</div>
					<div className={styles.containerInputPhone}>
						<input type="tel" name="phone_user" 
									//onChange={(e) => inputChanged('searchTitle', e.target.value)}
									//value={searchTitle}
									className={styles.inputPhoneUser} 
									placeholder="Телефон" />
					</div>
					<div className={styles.containerSelectDepartment}>
						<Select 	value={department} name="department_user"
									options={dataOptionsDepartments}
									onChange={(opt)=> inputChanged('department_user', opt)}
									placeholder="Подразделение" className={styles.selectDepartment}
									styles={stylesDepartments} isSearchable={false}
									menuListHeight='120px'>
						</Select>
					</div>
					<div className={styles.containerInputPassword}>
						<input type="password" name="password_user" 
									//onChange={(e) => inputChanged('searchTitle', e.target.value)}
									//value={searchTitle}
									className={styles.inputPasswordUser} 
									placeholder="Пароль" />
					</div>
				</div>

				<div className={styles.boxBtnsFormUser}>
					<button type="submit" className={styles.btnSubmitFormUser}>
						Сохранить
					</button>
				</div>
			</form>
		</div>
	);
};

export default FormUser;