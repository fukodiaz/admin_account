import React from 'react';

import { hideModal } from '../../utils';
import styles from './form-news.m.less';
import download from './download.svg';

const FormNews = (props) => {
	const {onChangeImage, nameFileImage='', handleSubmit} = props;

	return (
		<div className={styles.containerFormNews}>
			<form encType="multipart/form-data" className={styles.formNews}
						onSubmit={handleSubmit}>
				<div className={styles.blockTheme}>
					<label htmlFor="theme" className={styles.labelThemeNews}>
						Тема
					</label>
					<input type="text" name="theme" 
								onChange={() => {}}
								//value={fio} 
								className={styles.inputThemeNews} 
								placeholder="Введите текст" 
								id="theme" required />
				</div>
				<div className={styles.blockTextNews}>
					<label htmlFor="text" className={styles.labelTextNews}>
						Текст
					</label>
					<textarea name="text" className={styles.textareaNews}
								placeholder="Введите текст"
								id="text" required />
				</div>

				<div className={styles.blockImageNews}>
					<div className={styles.boxLinkImage}>
						<label htmlFor="link" className={styles.labelLinkImage}>
							Ссылка
						</label>
						<input type="url" name="url" 
									onChange={() => {}}
									//value={fio} 
									className={styles.inputLinkImage} 
									placeholder="Вставьте ссылку" 
									id="link" />
					</div>
					<div className={styles.boxFileImage}>
						<label htmlFor="image" className={styles.labelFileImage}>
							<p>Загрузить изображение</p>
							<p className={styles.nameFileImage}>
								{nameFileImage}
							</p>
							<p className={styles.svgBoxDownload}>
								<svg width="100%" height="100%">	
									<use href={`${download}#download`}></use>
								</svg>
							</p>
						</label>
						<input type="file" name="image"
									onChange={onChangeImage}
									//value={fio} 
									className={styles.inputFileImage} 
									id="image" accept="image/jpeg, image/png" />
					</div>
				</div>
				<div className={styles.boxButtons}>
					<button type="submit" className={styles.btnSubmitNews}>
						Сохранить
					</button>
					<button type="button" className={styles.btnCancel}
								onClick={() => hideModal('[class^="modalBox"]')}>
						Отмена
					</button>
				</div>
			</form>
		</div>
	);
};

export default FormNews;