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

	fio: '',
	email: '',


	flagOpenModalNews: false,
	headingModal: null,
	methodNews: null,
	entityId: null,

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

	newsPutInit: false,
	newsPutError: false,

	newsDeleteInit: false,
	newsDeleteError: false,

	theme: '',
	text: '',
	urlImage: '',
	nameFileImage: '',
	flagImageFile: false,

	IdNewsDeleted: null,

	//directories
	flagOpenDirectories: true,

	directoriesList: null,
	directoriesLoading: false,
	directoriesError: false,
	visibleDirectories: null,

	labelSearchDirect: null,
	listTitleDirect: null,
	typeDirect: null,
	visibleListTitle: null,

	searchTitle: '',
	additTitle: ''

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
				flagOpenNews: !state.flagOpenNews
			}

		case 'directories':
			return {
				flagOpenDirectories: !state.flagOpenDirectories
			}
		
		default: return {}
	}
};

const inputValueDefine = (state, {fieldName, payload}) => {
	switch (fieldName) {
		case 'fio':
			return {
				fio: payload
			}
		case 'email':
			return {
				email: payload
			}
		case 'theme': 
			return {
				theme: payload
			}
		case 'text': 
			return {
				text: payload
			}
		case 'url': 
			return {
				urlImage: payload
			}
		case 'searchTitle': 
			return {
				searchTitle: payload,
				visibleListTitle:	defineVisibleListTitle(searchTitles(state.listTitleDirect, payload), 5)
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

function defineVisibleListTitle(listTitle, quantity) {
	return listTitle.sort((a, b) => b.id - a.id).slice(0, quantity);
}

function searchTitles(listTitles, term) {
	if (term === '') {
		return listTitles;
	}

	return listTitles.map(item => item)
							.filter(({title}) => title.toLowerCase()
																.indexOf(term.toLowerCase()) > -1);
}


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
				...inputValueDefine(state, action) 
			}


		//News
		case 'OPEN_MODAL_CREATION_NEWS':
			return {
				...state,
				flagOpenModalNews: !state.flagOpenModalNews,
				headingModal: 'Создать новость',
				methodNews: 'POST',
				theme: '',
				text: '',
				urlImage: '',
				nameFileImage: '',
				flagImageFile: false
			}

		case 'OPEN_MODAL_EDIT_NEWS':
			return {
				...state,
				headingModal: 'Редактировать новость',
				methodNews: 'PUT',
				entityId: action.payload.entityId,
				theme: action.payload.theme || '',
				text: action.payload.text || '',
				urlImage: action.payload.urlImage || '',
				nameFileImage: action.payload.nameFileImage || null,
				flagImageFile: false
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
				newsImageError: false,
				flagImageFile: false
			}

		case 'POST_NEWS_IMAGE_SUCCESS':
			return {
				...state,
				newsImage: action.payload,
				newsImageSending: false,
				newsImageError: false,
				nameFileImage: action.payload.nameFileImage,
				flagImageFile: true
			}

		case 'POST_NEWS_IMAGE_FAILURE':
			return {
				...state,
				newsImage: null,
				newsImageSending: false,
				newsImageError: action.payload,
				flagImageFile: false
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
				visibleNewsList: action.payload.slice(0, 3),
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


		case 'PUT_NEWS_REQUEST':
			return {
				...state,
				newsPutInit: true,
				newsPutError: false,
			}
	
		case 'PUT_NEWS_SUCCESS':
			return {
				...state,
				newsList: action.payload,
				visibleNewsList: action.payload.slice(0, 3),
				newsPutInit: false,
				newsPutError: false
			}

		case 'PUT_NEWS_FAILURE':
			return {
				...state,
				newsPutInit: false,
				newsPutError: action.payload
			}

		case 'DELETE_NEWS_REQUEST':
			return {
				...state,
				newsDeleteInit: true,
				newsDeleteError: false,
			}

		case 'DELETE_NEWS_SUCCESS':
			return {
				...state,
				newsList: action.payload,
				visibleNewsList: action.payload.slice(0, 3),
				newsDeleteInit: false,
				newsDeleteError: false
			}

		case 'DELETE_NEWS_FAILURE':
			return {
				...state,
				newsDeleteInit: false,
				newsDeleteError: action.payload
			}

		case 'ADD_ID_NEWS_DELETED':
			return {
				...state,
				IdNewsDeleted: action.payload
			}


		// directories
		case 'FETCH_DIRECTORIES_REQUEST':
			return {
				...state,
				directoriesList: null,
				directoriesLoading: true,
				directoriesError: false,
				visibleDirectories: null
			}

		case 'FETCH_DIRECTORIES_SUCCESS':
			return {
				...state,
				directoriesList: action.payload,
				directoriesLoading: false,
				directoriesError: false,
				//visibleDirectories: action.paylaod.slice(0, 3)
			}

		case 'FETCH_DIRECTORIES_FAILURE':
			return {
				...state,
				directoriesList: null,
				directoriesLoading: false,
				directoriesError: action.payload,
				visibleDirectories: null
			}

		case 'OPEN_MODAL_DIRECTORIES':
			const listTitleDirect = action.payload.list
												.map((title, id) => ({id: ++id, title})); //array with objs consists of id and title

			return {
				...state,
				labelSearchDirect: action.payload.label,
				additTitle: '',
				listTitleDirect,
				typeDirect: action.payload.type,
				visibleListTitle: defineVisibleListTitle(listTitleDirect, 5)
				//listTitleDirect.sort((a, b) => b.id - a.id).slice(0, 5)
			}

		case 'ADDIT_INPUT_CHANGED':
			return {
				...state,
				additTitle: action.payload
			}

		default: 
			return state;
	}
};

export default reducer;