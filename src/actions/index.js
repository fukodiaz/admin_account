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
	putNewsError
};