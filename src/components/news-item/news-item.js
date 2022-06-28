import React from 'react';

import styles from './news-item.m.less';
import pencil from './pencil.svg';
import trash from './trash.svg';

const NewsItem = ({image, imageType, date, theme, entityId, editNewsItem}) => {

	return (
		<li key={entityId}
				className={styles.newsItem}>
			<div className={styles.boxNews}>
				<img src={`data:${imageType};base64, ${image}`} alt="photo news"
						className={styles.imageNews}/>
				<p className={styles.dateNews}>
					{date}
				</p>
				<p className={styles.themeNews}>
					{theme}
				</p>
				<button type="button" //className={styles.buttonEditing}
						onClick={editNewsItem}>
					<p className={styles.svgBoxEdit}>
						<svg width="100%" height="100%">
							<use href={`${pencil}#pencil`}></use>
						</svg>
					</p>
				</button>
				<button type="button" //className={styles.buttonEditing}
						onClick={() => {}}>
					<p className={styles.svgBoxDelete}>
						<svg width="100%" height="100%">	
							<use href={`${trash}#trash`}></use>
						</svg>
					</p>
				</button>
			</div>
		</li>
	);
};

export default NewsItem;