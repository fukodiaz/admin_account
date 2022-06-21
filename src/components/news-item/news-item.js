import React from 'react';

import styles from './news-item.m.less';
import pencil from './pencil.svg';
import trash from './trash.svg';

const NewsItem = ({urlImage, date, theme}) => {

	return (
		<li key={(Math.random()*100).toFixed(0)}
				className={styles.newsItem}>
			<div className={styles.boxNews}>
				<img src={urlImage} alt="photo news"
						className={styles.imageNews}/>
				<p className={styles.dateNews}>
					{date}
				</p>
				<p className={styles.themeNews}>
					{theme}
				</p>
				<button type="button" //className={styles.buttonEditing}
						onClick={() => {}}>
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