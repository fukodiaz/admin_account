const initialState = {
	flagEditingPersonal: true,
	flagOpenPersonal: true,

	flagOpenNews: true,

	dataPersonal: null,
	dataPersonalSending: false,
	dataPersonalError: false,

	photoPersonal: null,
	photoPersonalSending: false,
	photoPersonalError: false,

	fio: null,
	email: null,


	flagOpenModalNews: false,
	headingModal: null,

	dataNews: [
		{
			urlImage: 'images/Charleroi.jpg',
			date: new Date().toLocaleDateString(),
			theme: 'Проект расписания ГИА-11'
		},
		{
			urlImage: 'images/Charleroi.jpg',
			date: new Date().toLocaleDateString(),
			theme: 'Проект расписания ГИА-11'
		},
		{
			urlImage: 'images/Charleroi.jpg',
			date: new Date().toLocaleDateString(),
			theme: 'Проект расписания ГИА-11'
		},
		{
			urlImage: 'images/Charleroi.jpg',
			date: new Date().toLocaleDateString(),
			theme: 'Проект расписания ГИА-11'
		},
		{
			urlImage: 'images/Charleroi.jpg',
			date: new Date().toLocaleDateString(),
			theme: 'Проект расписания ГИА-11'
		},
		{
			urlImage: 'images/Charleroi.jpg',
			date: new Date().toLocaleDateString(),
			theme: 'Проект расписания ГИА-11'
		}
	]
};

const openBlock = (state, action) => {
	switch (action.blockName) {
		case 'personalData':
			return {
				flagOpenPersonal: !state.flagOpenPersonal,
				flagEditingPersonal: true
			}
		case 'newsEditing':
			return {
				flagOpenNews: !state.flagOpenNews,
			}
		
		default: return {}
	}
};

const inputValueDefine = (action) => {
	switch (action.fieldName) {
		case 'fio':
			return {
				fio: action.payload
			}
		case 'email':
			return {
				email: action.payload
			}
		default: return {}
	}
};

const reducer = (state = initialState, action) => {

	switch (action.type) {

		case 'EDITING_PERSONAL_DATA': 
			return {
			...state,
			flagEditingPersonal: !state.flagEditingPersonal
			}

		case 'OPEN_BLOCK':
			return {
				...state,
				...openBlock(state, action)
				// flagOpenPersonal: !state.flagOpenPersonal,
				// flagEditingPersonal: true
			}

		case 'POST_DATA_PERSONAL_REQUEST':
			return {
				...state,
				dataPersonal: null,
				dataPersonalSending: true,
				dataPersonalError: false
			}

		case 'POST_DATA_PERSONAL_SUCCESS':
			return {
				...state,
				dataPersonal: action.payload,
				dataPersonalSending: false,
				dataPersonalError: false,
				flagEditingPersonal: true
			}

		case 'POST_DATA_PERSONAL_FAILURE':
			return {
				...state,
				dataPersonal: null,
				dataPersonalSending: false,
				dataPersonalError: action.payload
			}
		
		case 'POST_PHOTO_PERSONAL_REQUEST':
			return {
				...state,
				photoPersonal: null,
				photoPersonalSending: true,
				photoPersonalError: false
			}

		case 'POST_PHOTO_PERSONAL_SUCCESS':
			return {
				...state,
				photoPersonal: action.payload,
				photoPersonalSending: false,
				photoPersonalError: false
			}

		case 'POST_PHOTO_PERSONAL_FAILURE':
			return {
				...state,
				photoPersonal: null,
				photoPersonalSending: false,
				photoPersonalError: action.payload
			}

		case 'INPUT_CHANGED':
			return {
				...state,
				...inputValueDefine(action) 
			}


		//News
		case 'OPEN_MODAL_CREATION_NEWS':
			return {
				...state,
				flagOpenModalNews: !state.flagOpenModalNews,
				headingModal: 'Создать новость'
			}

		default: 
			return state;
	}
};

export default reducer;