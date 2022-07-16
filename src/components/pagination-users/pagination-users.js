import React, {Component} from 'react';

import styles from './pagination-users.m.less';
import arrowPrev from './arrow-prev.svg';
import arrowNext from './arrow-next.svg';

class PaginationUsers extends Component {
	state = {
		totalPaginBtns: null,
		range: 3, //quantity of visible main buttons
		//start: 1, // index of a first main button
		arrCountVisBtns: [],
		btnsMain: null,
		flagBtnEllipsis: false,
		//activeIdx: 0,
		disabledPrev: false,
		disabledNext: false
	} 

	defineAbledBtnArrow = (activeIdx, totalPaginBtns) => {
		if (activeIdx === 0) {
			this.setState({disabledPrev: true});
			if (totalPaginBtns === 1) {
				this.setState({disabledNext: true});
			}
		} else {
			this.setState({disabledPrev: false});
		}
		if ((activeIdx + 1) === totalPaginBtns) {
			this.setState({disabledNext: true});
		} else {
			this.setState({disabledNext: false});
		}
	}

	componentDidMount() {
		this.defineAbledBtnArrow(this.props.activeIdx, this.state.totalPaginBtns);
	}

	componentDidUpdate(prevProps, prevState) {
		const {visibleUsersList, activeIdx, start, onBtnPagin} = this.props;
		const {totalPaginBtns, range, arrCountVisBtns} = this.state;
		console.log(visibleUsersList, 'vis');
		if (prevProps.visibleUsersList.length !== visibleUsersList.length) {
			this.setState({totalPaginBtns: visibleUsersList.length ? Math.ceil(visibleUsersList.length/2) : 0});
		}

		if (prevState.totalPaginBtns !== totalPaginBtns || prevProps.start !== start) {
			if (totalPaginBtns) {
				for (let i = start, arr = []; i <= totalPaginBtns && arr.length < range; i++) {
					arr = [...arr, i];
					this.setState({arrCountVisBtns:  arr});
				}
			}
			if (!totalPaginBtns) {
				this.setState({arrCountVisBtns: []});
			}
		}

		if (prevState.arrCountVisBtns !== arrCountVisBtns || prevProps.activeIdx !== activeIdx) {
			const btns = arrCountVisBtns.map(item => {
				const classBtnMain = activeIdx === item - 1 ? 'activeBtnMain' : 'btnMain';
				
				return(
					<li key={item} className={styles.itemBtnMain}>
						<button type="button" className={styles[classBtnMain]}
									onClick={() => onBtnPagin(item - 1)}>
							{item}
						</button>
					</li>	
				);
			});
			this.setState({btnsMain: btns});
		}

		if (prevProps.activeIdx !== activeIdx || prevProps.visibleUsersList !== visibleUsersList) {
			this.defineAbledBtnArrow(this.props.activeIdx, this.state.totalPaginBtns);
		}
	}

	onClickArrow = (direct) => {
		const {totalPaginBtns, range} = this.state;
		const { activeIdx, onBtnArrow, start} = this.props;
		if (direct === 'prev') {
			if (activeIdx - 1 >= 0) {
				// this.setState(({activeIdx}) => {
				// 	return {activeIdx: activeIdx - 1} 
				// });
				onBtnArrow({activeIdxShift: -1});

				if (start >= activeIdx + 1) {
					// this.setState(({start}) => {
					// 	return {start: start - 1} 
					// });
					onBtnArrow({startShift: -1});
				}
			}
		}

		if (direct === 'next') {
			if (activeIdx + 1 < totalPaginBtns) {
				// this.setState(({activeIdx}) => {
				// 	return {activeIdx: activeIdx + 1} 
				// });
				onBtnArrow({activeIdxShift: 1});

				if ((range + start) <= (activeIdx + 2)) {
					// this.setState(({start}) => {
					// 	return {start: start + 1} 
					// });
					onBtnArrow({startShift: 1});
				}
			} 
		}
	}

	render() {
		const {visibleUsersList} = this.props;
		const {btnsMain, activeIdx, disabledPrev, disabledNext, totalPaginBtns} = this.state;
		const	contentBtnArrowPrev = totalPaginBtns ? (
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
					</div>) : null;
		const contentBtnArrowNext = totalPaginBtns ? (
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
					</div>) : null;

		return (
			<div>
				<div className={styles.boxPagination}>
					{contentBtnArrowPrev}
					<ul className={styles.pagination}>
						{btnsMain}
					</ul>
					{contentBtnArrowNext}
				</div>
			</div>
		);
	}
}

export default PaginationUsers;