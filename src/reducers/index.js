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

	newsList: null,
	newsListLoading: false,
	newsListError: false,
	visibleNewsList: null,
	flagAllNews: true,

	newsImage: null,
	newsImageSending: false,
	newsImageError: false,

	newsData: null,
	newsDataSending: false,
	newsDataError: false,
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

const defineVisibleNews = (state) => {
	switch (state.flagAllNews) {
		case true:
			return state.newsList
		case false:
			return state.newsList.slice(0, 3)
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

		case 'FETCH_NEWS_LIST_REQUEST':
			return {
				...state,
				newsList: null,
				newsListLoading: true,
				newsListError: false,
			}
			
		case 'FETCH_NEWS_LIST_SUCCESS':
			return {
				...state,
				newsList: action.payload,
				newsListLoading: false,
				newsListError: false,
				visibleNewsList: action.payload.slice(0, 3)
			}

		case 'FETCH_NEWS_LIST_FAILURE':
			return {
				...state,
				newsList: null,
				newsListLoading: false,
				newsListError: action.payload,
			}

		case 'SHOW_ALL_NEWS':
			return {
				...state,
				flagAllNews: !state.flagAllNews,
				visibleNewsList: defineVisibleNews(state)
			}

		case 'POST_NEWS_IMAGE_REQUEST':
			return {
				...state,
				newsImage: null,
				newsImageSending: true,
				newsImageError: false
			}

		case 'POST_NEWS_IMAGE_SUCCESS':
			return {
				...state,
				newsImage: action.payload,
				newsImageSending: false,
				newsImageError: false
			}

		case 'POST_NEWS_IMAGE_FAILURE':
			return {
				...state,
				newsImage: null,
				newsImageSending: false,
				newsImageError: action.payload
			}

		case 'POST_NEWS_DATA_REQUEST':
			return {
				...state,
				//newsData: null,
				newsDataSending: true,
				newsDataError: false
			}

		case 'POST_NEWS_DATA_SUCCESS':
			return {
				...state,
				//newsData: action.payload,
				newsList: action.payload,
				newsDataSending: false,
				newsDataError: false
			}

		case 'POST_NEWS_DATA_FAILURE':
			return {
				...state,
				//newsData: null,
				newsDataSending: false,
				newsDataError: action.payload
			}

		default: 
			return state;
	}
};

export default reducer;