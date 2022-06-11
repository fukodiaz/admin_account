const initialState = {
	flagEditingPersonal: true,
	flagOpenItem: true,

	dataPersonalPosted: {},
	dataPersonalSending: false,
	dataPersonalError: false
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

		case 'POST_DATA_PERSONAL_REQUEST':
			return {
				...state,
				dataPersonalPosted: {},
				dataPersonalSending: true,
				dataPersonalError: false
			}

		case 'POST_DATA_PERSONAL_SUCCESS':
			return {
				...state,
				dataPersonalPosted: action.payload,
				dataPersonalSending: false,
				dataPersonalError: false
			}

		case 'POST_DATA_PERSONAL_FAILURE':
			return {
				...state,
				dataPersonalPosted: {},
				dataPersonalSending: false,
				dataPersonalError: action.payload
			}
		

		default: 
			return state;
	}
};

export default reducer;