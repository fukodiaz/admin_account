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
	openModalCreationNews
};