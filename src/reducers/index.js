const initialState = {
	flagEditingPersonal: true,
	flagOpenItem: true,
};


const reducer = (state = initialState, action) => {

	switch (action.type) {

		case 'EDITING_PERSONAL_DATA': 
			return {
			...state,
			flagEditingPersonal: !state.flagEditingPersonal
			}

		case 'OPEN_ITEM_LIST':
			return {
				...state,
				flagOpenItem: !state.flagOpenItem,
				flagEditingPersonal: true
			}
		

		default: 
			return state;
	}
};

export default reducer;