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

const openItemList = () => ({type: 'OPEN_ITEM_LIST'});

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

export {
	fetchOffers,
	editingPersonalData,
	openItemList,
	dataPersonalRequested,
	dataPersonalPosted,
	dataPersonalError,
	photoPersonalRequested,
	photoPersonalPosted,
	photoPersonalError,
	inputChanged
};