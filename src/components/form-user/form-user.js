import React from 'react';

import styles from './form-user.m.less'

const FormUser = (props) => {
	const {heading} = props;
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
					<div className={styles.containerInputPosition}>
						<input type="text" name="position_user" 
									//onChange={(e) => inputChanged('searchTitle', e.target.value)}
									//value={searchTitle}
									className={styles.inputPositionUser} 
									placeholder="Должность" />
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
					<div className={styles.containerInputDepartment}>
						<input type="text" name="department_user" 
									//onChange={(e) => inputChanged('searchTitle', e.target.value)}
									//value={searchTitle}
									className={styles.inputDepartmentUser} 
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