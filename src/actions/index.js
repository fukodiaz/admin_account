const offersRequested = () => ({type: 'FETCH_OFFERS_REQUEST'});

const offersLoaded = (payload) => ({
		type: 'FETCH_OFFERS_SUCCESS',
		payload
});

const offersError = (payload) => ({
	type: 'FETCH_OFFERS_FAILURE',
	payload
});

const fetchOffers = (methodService, dispatch) => () => {
	dispatch(offersRequested());
	methodService()
		.then(data => dispatch(offersLoaded(data)))
		.catch(error => dispatch(offersError(error)));
};

const editingPersonalData = () => ({type: 'EDITING_PERSONAL_DATA'});

const openBlock = (blockName) => ({
	type: 'OPEN_BLOCK',
	blockName
});

const dataPersonalRequested = () => ({type: 'POST_DATA_PERSONAL_REQUEST'});

const dataPersonalPosted = (payload) => ({
	type: 'POST_DATA_PERSONAL_SUCCESS',
	payload
}); 

const dataPersonalError = (payload) => ({
	type: 'POST_DATA_PERSONAL_FAILURE',
	payload
}); 

const photoPersonalRequested = () => ({type: 'POST_PHOTO_PERSONAL_REQUEST'});

const photoPersonalPosted = (payload) => ({
	type: 'POST_PHOTO_PERSONAL_SUCCESS',
	payload
}); 

const photoPersonalError = (payload) => ({
	type: 'POST_PHOTO_PERSONAL_FAILURE',
	payload
}); 

const inputChanged = (fieldName, payload) => ({
	type: 'INPUT_CHANGED',
	fieldName,
	payload
});


//News

const openModalCreationNews = () => ({type: 'OPEN_MODAL_CREATION_NEWS'});

const openModalEditNews = (payload) => ({
	type: 'OPEN_MODAL_EDIT_NEWS',
	payload
});

const newsListRequested = () => ({type: 'FETCH_NEWS_LIST_REQUEST'});

const newsListLoaded = (payload) => ({
		type: 'FETCH_NEWS_LIST_SUCCESS',
		payload
});

const newsListError = (payload) => ({
	type: 'FETCH_NEWS_LIST_FAILURE',
	payload
});

const fetchNewsList = (methodService, dispatch) => () => {
	dispatch(newsListRequested());
	methodService()
		.then(data => dispatch(newsListLoaded(data)))
		.catch(error => dispatch(newsListError(error)));
};

const showAllNews = () => ({type: 'SHOW_ALL_NEWS'});

const newsImageRequested = () => ({type: 'POST_NEWS_IMAGE_REQUEST'});

const newsImagePosted = (payload) => ({
	type: 'POST_NEWS_IMAGE_SUCCESS',
	payload
}); 

const newsImageError = (payload) => ({
	type: 'POST_NEWS_IMAGE_FAILURE',
	payload
}); 

const newsDataRequested = () => ({type: 'POST_NEWS_DATA_REQUEST'});

const newsDataPosted = (payload) => ({
	type: 'POST_NEWS_DATA_SUCCESS',
	payload
}); 

const newsDataError = (payload) => ({
	type: 'POST_NEWS_DATA_FAILURE',
	payload
});

const putNewsRequested = () => ({type: 'PUT_NEWS_REQUEST'});

const putNewsSuccess = (payload) => ({
	type: 'PUT_NEWS_SUCCESS',
	payload
}); 

const putNewsError = (payload) => ({
	type: 'PUT_NEWS_FAILURE',
	payload
}); 

const newsDeleteRequested = () => ({type: 'DELETE_NEWS_REQUEST'});

const newsDeleted = (payload) => ({
	type: 'DELETE_NEWS_SUCCESS',
	payload
});

const newsDeleteError = (payload) => ({
	type: 'DELETE_NEWS_FAILURE',
	payload
});

const addIdNewsDeleted = (payload) => ({
	type: 'ADD_ID_NEWS_DELETED',
	payload
});

// directories

const directoriesRequested = () => ({type: 'FETCH_DIRECTORIES_REQUEST'});

const directoriesLoaded = (payload) => ({
		type: 'FETCH_DIRECTORIES_SUCCESS',
		payload
});

const directoriesError = (payload) => ({
	type: 'FETCH_DIRECTORIES_FAILURE',
	payload
});

const fetchDirectories = (methodService, dispatch) => () => {
	dispatch(directoriesRequested());
	methodService()
		.then(data => dispatch(directoriesLoaded(data)))
		.catch(error => dispatch(directoriesError(error)));
};

const showAllDirectories = () => ({type: 'SHOW_ALL_DIRECTORIES'});

const openModalDirectories = (payload) => ({
	type: 'OPEN_MODAL_DIRECTORIES',
	payload
});

const additInputChanged = (payload) => ({
	type: 'ADDIT_INPUT_CHANGED',
	payload
});

const putTitleRequested = () => ({type: 'PUT_TITLE_REQUEST'});

const putTitleSuccess = (payload) => ({
	type: 'PUT_TITLE_SUCCESS',
	payload
}); 

const putTitleError = (payload) => ({
	type: 'PUT_TITLE_FAILURE',
	payload
});


//Users

const filterOffices = (payload) => ({
	type: 'FILTER_OFFICES',
	payload
});

const usersDataRequested = () => ({type: 'FETCH_USERS_DATA_REQUEST'});

const usersDataLoaded = (payload) => ({
		type: 'FETCH_USERS_DATA_SUCCESS',
		payload
});

const usersDataError = (payload) => ({
	type: 'FETCH_USERS_DATA_FAILURE',
	payload
});

const fetchUsersData = (methodService, dispatch) => () => {
	dispatch(usersDataRequested());
	methodService()
		.then(data => dispatch(usersDataLoaded(data)))
		.catch(error => dispatch(usersDataError(error)));
};

const openModalNewUser = () => ({type: 'OPEN_MODAL_NEW_USER'});

const openModalEditUser = (payload) => ({
	type: 'OPEN_MODAL_EDIT_USER',
	payload
});

const userDataRequested = () => ({type: 'USER_DATA_REQUEST'});

const userDataSuccess = (payload) => ({
	type: 'USER_DATA_SUCCESS',
	payload
}); 

const userDataError = (payload) => ({
	type: 'USER_DATA_FAILURE',
	payload
});

const putUserDataRequested = () => ({type: 'PUT_USER_DATA_REQUEST'});

const putUserDataSuccess = (payload) => ({
	type: 'PUT_USER_DATA_SUCCESS',
	payload
}); 

const putUserDataError = (payload) => ({
	type: 'PUT_USER_DATA_FAILURE',
	payload
});

const addIdUserDeleted = (payload) => ({
	type: 'ADD_ID_USER_DELETED',
	payload
});

const userDeleteRequested = () => ({type: 'DELETE_USER_REQUEST'});

const userDeleted = (payload) => ({
	type: 'DELETE_USER_SUCCESS',
	payload
});

const userDeleteError = (payload) => ({
	type: 'DELETE_USER_FAILURE',
	payload
});

const onSearchUsers = () => ({type: 'ON_SEARCH_USERS'});

const onBtnArrow = (payload) => ({
	type: 'ON_BTN_ARROW',
	payload
});

const onBtnPagin = (payload) => ({
	type: 'ON_BTN_PAGIN',
	payload
});

const onLastBtnPagin = (payload) => ({
	type: 'ON_LAST_BTN_PAGIN',
	payload
});

const selectChanged = (payload, name, start) => ({
	type: 'SELECT_CHANGED',
	payload,
	name,
	start
});

export {
	fetchOffers,
	editingPersonalData,
	openBlock,
	dataPersonalRequested,
	dataPersonalPosted,
	dataPersonalError,
	photoPersonalRequested,
	photoPersonalPosted,
	photoPersonalError,
	inputChanged,
	openModalCreationNews,
	openModalEditNews,
	newsImageRequested,
	newsImagePosted,
	newsImageError,
	newsDataRequested,
	newsDataPosted,
	newsDataError,
	newsListRequested,
	newsListLoaded,
	newsListError,
	fetchNewsList,
	showAllNews,
	putNewsRequested,
	putNewsSuccess,
	putNewsError,
	newsDeleteRequested,
	newsDeleted,
	newsDeleteError,
	addIdNewsDeleted,
	fetchDirectories,
	showAllDirectories,
	openModalDirectories,
	additInputChanged,
	putTitleRequested,
	putTitleSuccess,
	putTitleError,
	filterOffices,
	fetchUsersData,
	openModalNewUser,
	userDataRequested,
	userDataSuccess,
	userDataError,
	openModalEditUser,
	putUserDataRequested,
	putUserDataSuccess,
	putUserDataError,
	addIdUserDeleted,
	userDeleteRequested,
	userDeleted,
	userDeleteError,
	onSearchUsers,
	onBtnArrow,
	onBtnPagin,
	onLastBtnPagin,
	selectChanged

};