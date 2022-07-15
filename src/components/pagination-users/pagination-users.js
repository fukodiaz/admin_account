import React, {Component} from 'react';

import styles from './pagination-users.m.less';
import arrowPrev from './arrow-prev.svg';
import arrowNext from './arrow-next.svg';

class PaginationUsers extends Component {
	state = {
		totalPaginBtns: null,
		arrCountVisBtns: [],
		btnsMain: null,
		flagBtnEllipsis: false,
		activeIdx: 0,
		disabledPrev: false,
		disabledNext: false
	} 

	componentDidUpdate(prevProps, prevState) {
		const {visibleUsersList} = this.props;
		const {totalPaginBtns, arrCountVisBtns, activeIdx} = this.state;
		console.log(visibleUsersList, 'vis');
		if (prevProps.visibleUsersList.length !== visibleUsersList.length) {
			this.setState({totalPaginBtns: visibleUsersList.length ? Math.ceil(visibleUsersList.length/2) : 0});
		}

		if (prevState.totalPaginBtns !== totalPaginBtns) {
			if (totalPaginBtns) {
				for (let i = 1, arr = []; i <= totalPaginBtns && i <= 3; i++) {
					arr = [...arr, i];
					this.setState({arrCountVisBtns:  arr});
				}
			}
			if (!totalPaginBtns) {
				this.setState({arrCountVisBtns: []});
			}
		}

		if (prevState.arrCountVisBtns !== arrCountVisBtns || prevState.activeIdx !== activeIdx) {
			console.log(arrCountVisBtns, 'arrBtns');
			const btns = arrCountVisBtns.map(item => {
				const classBtnMain = activeIdx === item - 1 ? 'activeBtnMain' : 'btnMain';
				
				return(
					<li key={item} className={styles.itemBtnMain}>
						<button type="button" className={styles[classBtnMain]}>
							{item}
						</button>
					</li>	
				);
			});
			this.setState({btnsMain: btns});
		}
	}

	onClickArrow = (direct) => {
		const {totalPaginBtns, activeIdx} = this.state;
		if (direct === 'prev') {
			if (activeIdx - 1 >= 0) {
				this.setState(({activeIdx}) => {
					return {activeIdx: activeIdx - 1} 
				});
				this.setState({disabledNext: false});
			} else {
				this.setState({disabledPrev: true});
			}
		}

		if (direct === 'next') {
			if (activeIdx + 1 < totalPaginBtns) {
				this.setState(({activeIdx}) => {
					return {activeIdx: activeIdx + 1} 
				});
				this.setState({disabledPrev: false});
			} else {
				this.setState({disabledNext: true});
			}
		}
	}

	render() {
		const {visibleUsersList} = this.props;
		const {btnsMain, activeIdx, disabledPrev, disabledNext} = this.state;
		
		return (
			<div>
				<div className={styles.boxPagination}>
					<div className={styles.itemBtnArrow}>
						<button type="button" className={styles.btnArrowPrev}
									onClick={() => this.onClickArrow('prev')}
									disabled={disabledPrev}>
							<p className={styles.svgBoxPrev}>
								<svg width="100%" height="100%">
									<use href={`${arrowPrev}#arrowPrev`}></use>
								</svg>
							</p>
						</button>
					</div>	
					<ul className={styles.pagination}>
						{btnsMain}
					</ul>
					<div className={styles.itemBtnArrow}>
						<button type="button" className={styles.btnArrowNext}
									onClick={() => this.onClickArrow('next')}
									disabled={disabledNext}>
							<p className={styles.svgBoxNext}>
								<svg width="100%" height="100%">
									<use href={`${arrowNext}#arrowNext`}></use>
								</svg>
							</p>
						</button>
					</div>	
				</div>
			</div>
		);
	}
}

export default PaginationUsers;