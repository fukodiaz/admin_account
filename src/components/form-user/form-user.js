import React from 'react';

import SelectItems from '../select-items';
import styles from './form-user.m.less'

const FormUser = (props) => {
	const {heading, dataOptionsDepartments, inputChanged, 
			dataOptionsPositions, position, department} = props;
	const contentHeading = heading === 'headingNewUser' ? 
				<span>Добавить сотрудника <br /> выбранного управления</span> : null;
	
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
						<SelectItems 	value={position} name="position_user"
									dataOptions={dataOptionsPositions}
									inputChanged={inputChanged} height={167}
									placeholder="Должность" isSearchable={false} />
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
						<SelectItems 	value={department} name="department_user"
									dataOptions={dataOptionsDepartments}
									inputChanged={inputChanged} isSearchable={false}
									placeholder="Подразделение" />
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