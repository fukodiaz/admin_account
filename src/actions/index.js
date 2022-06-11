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

// const postingDataPersonal = (methodService, dispatch) => (data) => {
// 	console.log(data, 2222);
// 	dispatch(dataPersonalRequested());
// 	methodService(data)
// 		.then(resData => {dispatch(dataPersonalPosted(resData)); console.log(resData);})
// 		.catch(error => dispatch(dataPersonalError(error)));
// };


export {
	fetchOffers,
	editingPersonalData,
	openItemList,
	//postingDataPersonal,
	dataPersonalRequested,
	dataPersonalPosted,
	dataPersonalError
};