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


	//flagOpenModalNews: false,
	headingModal: null,
	methodNews: null,
	entityId: null,

	newsList: null,
	newsListLoading: false,
	newsListError: false,
	visibleNewsList: null,
	flagAllNews: false,

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
	pieceDeletedHeader: null,

	//directories
	flagOpenDirectories: true,

	directoriesList: null,
	directoriesLoading: false,
	directoriesError: false,
	visibleDirectories: null,
	flagAllDirectories: false,

	labelSearchDirect: null,
	listTitleDirect: null,
	typeDirect: null,
	entityIdDirect: null,
	visibleListTitle: null,

	searchTitle: '',
	additTitle: '',

	titlePutInit: false,
	titlePutError: false,

	//Users
	flagShowUsers: true,

	listOffices: null,
	isActiveOffice: "educational",
	currentDepartments: null,
	listPositions: null,

	usersList: null,
	usersListLoading: false,
	usersListError: false,
	visibleUsersList: [],
	showingUsersList: [],

	headingModalUser: null,
	methodUser: null,
	position: '',
	department: '',
	fioUser: '',
	emailUser: '',
	phoneUser: '',
	passwordUser: '',
	userId: null,

	userDataLoading: false,
	userDataError: false,

	userPutInit: false,
	userPutError: false,

	IdUserDeleted: null,
	userDeleteInit: false,
	userDeleteError: false,

	searchUsers: '',

	startPagin: 1,
	activeIdxPagin: 0

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

		case 'users': 
			return {
				flagShowUsers: !state.flagShowUsers,
				isActiveOffice: "educational"
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

		case 'position_user':
			return {
				position: payload
			}
		case 'department_user':
			return {
				department: payload
			}
		case 'fio_user':
			return {
				fioUser: payload
			}
		case 'email_user':
			return {
				emailUser: payload
			}
		case 'phone_user':
			return {
				phoneUser: payload
			}
		case 'password_user':
			return {
				passwordUser: payload
			}

		case 'searchUsers':
			// const visibUsersList = state.usersList.filter(
			// 	(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, state.isActiveOffice));
			return {
				searchUsers: payload,
				//visibleUsersList: searchingUsers(visibUsersList, payload)
			}

		default: return {}
	}
};

// const defineVisibleNews = (state) => {
// 	switch (state.flagAllNews) {
// 		case true:
// 			return state.newsList
// 		case false:
// 			return state.newsList.slice(0, 3)
// 	}
// };

const defineVisibleItems = (flagAllItems, itemsList, quantity) => {
	switch (flagAllItems) {
		case true:
			return itemsList
		case false:
			return itemsList.slice(0, quantity)
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

//User

function selectListDirect(listDirects, entityId) {
	switch (entityId) {
		case 'Offices': 
			return listDirects.filter(({entityId}) => entityId === "Offices")
									.map(({list}) => list)[0];
		case 'positions':
			return listDirects.filter(({entityId}) => entityId === "positions")
									.map(({list}) => list)[0];
	}
} 

function selectCurretDepartments(listOffices, isActiveOffice) {
	return listOffices.filter(({entityId}) => entityId === isActiveOffice)
								.map(({listDivision, title}) => [title.toLowerCase(), ...listDivision])[0];
}

const defineActiveOffice = ({listOffices}, department) => {
	return listOffices.filter(office => { //return obj with an active Office
		let {title, listDivision} = office;
		listDivision = [title.toLowerCase(), ...listDivision];
		let flagOffice = listDivision.some(label => label === department);
		if (flagOffice) {
			return office;
		}
		return null;
	})[0];
};

const filterUsersByOffice = (user, idx, arr, state, isActiveOffice) => {
	const {department} = user;
	const activeOffice = defineActiveOffice(state, department);
	if (isActiveOffice === activeOffice.entityId) {
		return user;
	}
	return null;
};

function searchingUsers(listUsers, term) {
	if (term === '') {
		return listUsers;
	}

	return listUsers.filter(user => {
		const {fio, email} = user;
		const fioChecked = fio.toLowerCase().indexOf(term.toLowerCase()); 
		const emailChecked = email.toLowerCase().indexOf(term.toLowerCase());
		if (fioChecked > -1 || emailChecked > -1) { return user; }
		return null;
	});
}

function defineShowingUsers(visibleListUsers, activeIdx, quantity) { //quantity users on 1 page
	// const quantityPages = Math.ceil(visibleListUsers.length/quantity);
	return [...visibleListUsers.slice(quantity*activeIdx, (activeIdx+1)*quantity)];
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
				//flagOpenModalNews: !state.flagOpenModalNews,
				headingModal: 'Создать новость',
				methodNews: 'POST',
				theme: '',
				text: '',
				urlImage: '',
				nameFileImage: '',
				flagImageFile: false
			}

		case 'OPEN_MODAL_EDIT_NEWS':
			const {theme, text, urlImage, nameFileImage} = action.payload;
			return {
				...state,
				headingModal: 'Редактировать новость',
				methodNews: 'PUT',
				entityId: action.payload.entityId,
				theme: theme || '',
				text: text || '',
				urlImage: urlImage || '',
				nameFileImage: nameFileImage || null,
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
			const {flagAllNews} = state;
			return {
				...state,
				newsList: action.payload,
				newsListLoading: false,
				newsListError: false,
				visibleNewsList: defineVisibleItems(flagAllNews, action.payload, 3),
				flagAllNews: !state.flagAllNews
				//visibleNewsList: action.payload.slice(0, 3)
			}

		case 'FETCH_NEWS_LIST_FAILURE':
			return {
				...state,
				newsList: null,
				newsListLoading: false,
				newsListError: action.payload,
			}

		case 'SHOW_ALL_NEWS':
			const {newsList} = state;
			return {
				...state,
				flagAllNews: !state.flagAllNews,
				visibleNewsList: defineVisibleItems(state.flagAllNews, newsList, 3) //defineVisibleNews(state)
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
				IdNewsDeleted: action.payload,
				pieceDeletedHeader: 'новость',
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
			const {flagAllDirectories, isActiveOffice} = state;
			const listOffices =  selectListDirect(action.payload, 'Offices');

			return {
				...state,
				directoriesList: action.payload,
				directoriesLoading: false,
				directoriesError: false,
				visibleDirectories: defineVisibleItems(flagAllDirectories, action.payload, 2),
				flagAllDirectories: !flagAllDirectories,
				listOffices,
				currentDepartments: selectCurretDepartments(listOffices, isActiveOffice),
				listPositions: selectListDirect(action.payload, 'positions')
			}

		case 'FETCH_DIRECTORIES_FAILURE':
			return {
				...state,
				directoriesList: null,
				directoriesLoading: false,
				directoriesError: action.payload,
				visibleDirectories: null
			}

		case 'SHOW_ALL_DIRECTORIES': {
			const {flagAllDirectories, directoriesList} = state;
			return {
				...state,
				flagAllDirectories: !flagAllDirectories,
				visibleDirectories: defineVisibleItems(flagAllDirectories, directoriesList, 2)
			}
		}

		case 'OPEN_MODAL_DIRECTORIES':
			const {list, label, type, entityId} = action.payload;
			const listTitleDirect = list
												.map((title, id) => {
													if (entityId === 'Offices') {
														return {id: ++id, 'title': title.title}
													}
													return {id: ++id, title}}); //array with objs consists of id and title

			return {
				...state,
				labelSearchDirect: label,
				additTitle: '',
				listTitleDirect,
				typeDirect: type,
				entityIdDirect: entityId,
				visibleListTitle: defineVisibleListTitle(listTitleDirect, 5) 
				//listTitleDirect.sort((a, b) => b.id - a.id).slice(0, 5)
			}

		case 'ADDIT_INPUT_CHANGED':
			return {
				...state,
				additTitle: action.payload
			}

		case 'PUT_TITLE_REQUEST':
			return {
				...state,
				titlePutInit: true,
				titlePutError: false,
			}

		case 'PUT_TITLE_SUCCESS':
			const listTitles = action.payload.map((title, id) => ({id: ++id, title}));
			return {
				...state,
				titlePutInit: false,
				titlePutError: false,
				listTitleDirect: listTitles,
				visibleListTitle: defineVisibleListTitle(listTitles, 5),
				additTitle: ''
			}

		case 'PUT_TITLE_FAILURE':
			return {
				...state,
				titlePutInit: false,
				titlePutError: action.payload
			}

		//Users

		case 'FILTER_OFFICES':
			const {payload} = action;
			const visibleUsersList = state.usersList.filter(
											(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, payload));
			return {
				...state,
				isActiveOffice: payload,
				currentDepartments: selectCurretDepartments(state.listOffices, payload),
				visibleUsersList,
				startPagin: 1,
				activeIdxPagin: 0,
				showingUsersList: defineShowingUsers(visibleUsersList, 0, 2)
			}

		case 'FETCH_USERS_DATA_REQUEST': 
			return {
				...state,
				usersList: null,
				usersListLoading: true,
				usersListError: false,
				visibleUsersList: []
			}

		case 'FETCH_USERS_DATA_SUCCESS':
			const visUsersList = action.payload.filter(
						(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, state.isActiveOffice));
			return {
				...state,
				usersList: action.payload,
				usersListLoading: false,
				usersListError: false,
				visibleUsersList: visUsersList,
				showingUsersList: defineShowingUsers(visUsersList, state.activeIdxPagin, 2)
			}

		case 'FETCH_USERS_DATA_FAILURE':
			return {
				...state,
				usersList: null,
				visibleUsersList: [],
				usersListLoading: false,
				usersListError: action.payload
			}

		case 'OPEN_MODAL_NEW_USER':
			return {
				...state,
				headingModalUser: 'headingNewUser',
				methodUser: 'POST',
				position: null,
				department: null,
				fioUser: '',
				emailUser: '',
				phoneUser: '',
				passwordUser: '',
			}

		case 'USER_DATA_REQUEST':
			return {
				...state,
				userDataLoading: true,
				userDataError: false,
			}

		case 'USER_DATA_SUCCESS':
			const visualUsersList = action.payload.filter(
				(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, state.isActiveOffice));
			return {
				...state,
				usersList: action.payload,
				visibleUsersList: visualUsersList,
				userDataLoading: false,
				userDataError: false,
				showingUsersList: defineShowingUsers(visualUsersList, state.activeIdxPagin, 2)
			}
		
		case 'USER_DATA_FAILURE':
			return {
				...state,
				userDataLoading: false,
				userDataError: action.payload
			}

		case 'OPEN_MODAL_EDIT_USER':
			const {fio, department, position, email, phone, password} = action.payload;
			const activeOffice = defineActiveOffice(state, department); //full obj with an Office
			const curDepartments = [activeOffice.title.toLowerCase(), ...activeOffice.listDivision];
			return {
				...state,
				headingModalUser: 'headingEditUser',
				methodUser: 'PUT',
				position: {value: position, label: position},
				department: {value: department, label:department},
				fioUser: fio,
				emailUser: email,
				phoneUser: phone,
				passwordUser: password,
				userId: action.payload.entityId,
				isActiveOffice: activeOffice.entityId,
				currentDepartments: curDepartments
			}

		case 'PUT_USER_DATA_REQUEST':
			return {
				...state,
				userPutInit: true,
				userPutError: false
			}

		case 'PUT_USER_DATA_SUCCESS':
			const viUsersList = action.payload.filter(
				(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, state.isActiveOffice));
			return {
				...state,
				userPutInit: false,
				usersList: action.payload,
				visibleUsersList: viUsersList,
				userPutError: false,
				showingUsersList: defineShowingUsers(viUsersList, state.activeIdxPagin, 2)
			}	

		case 'PUT_USER_DATA_FAILURE':
			return {
				...state,
				userPutInit: false,
				userPutError: action.payload
			}

		case 'ADD_ID_USER_DELETED': 
			return {
				...state,
				IdUserDeleted: action.payload,
				pieceDeletedHeader: 'данные сотрудника',
			}

		case 'DELETE_USER_REQUEST':
			return {
				...state,
				userDeleteInit: true,
				userDeleteError: false
			}

		case 'DELETE_USER_SUCCESS': 
			const vUsersList = action.payload.filter(
				(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, state.isActiveOffice));
			return {
				...state,
				userDeleteInit: false,
				usersList: action.payload,
				visibleUsersList: vUsersList,
				userDeleteError: false,
				showingUsersList: defineShowingUsers(vUsersList, state.activeIdxPagin, 2)
			}

		case 'DELETE_USER_FAILURE':
			return {
				...state,
				userDeleteInit: false,
				userDeleteError: action.payload
			}

		case 'ON_SEARCH_USERS':
			const visibUsersList = state.usersList.filter(
				(user,idx,arr) => filterUsersByOffice(user, idx, arr, state, state.isActiveOffice));
			const searchUsersList = searchingUsers(visibUsersList, state.searchUsers);
			return {
				...state,
				visibleUsersList: searchUsersList,
				showingUsersList: defineShowingUsers(searchUsersList, state.activeIdxPagin, 2)
			}

		case 'ON_BTN_ARROW':
			const {startShift = 0, activeIdxShift = 0} = action.payload;
			const curActiveIdx = state.activeIdxPagin + activeIdxShift;
			return {
				...state,
				startPagin: state.startPagin + startShift,
				activeIdxPagin: curActiveIdx,
				showingUsersList: defineShowingUsers(state.visibleUsersList, curActiveIdx, 2)
			}

		case 'ON_BTN_PAGIN': 
			return {
				...state,
				activeIdxPagin: action.payload,
				showingUsersList: defineShowingUsers(state.visibleUsersList, action.payload, 2)
			}

		default: 
			return state;
	}
};

export default reducer;