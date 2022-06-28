export default class AdminAccountService {

	_apiBase= 'http://localhost:3000';

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);
		
		if (!res.ok) {
			throw new Error (
				`Couldn't fetch ${this._apiBase}${url}, received ${res.status}`); 
		}

		return res.json();
	}; 

	// getListOffers = async () => {
	// 	const res = await this.getResource(`/offers`);
	// 	return res;
	// };

	getNewsList = async () => {
		const res = await this.getResource(`/newsData`);
		return res;
	};

	postData = async (url, data) => {
		const res = await fetch(`${this._apiBase}${url}`, {
			mode: 'cors',
			//credentials: "include",
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				//'Content-type': 'application/json',
				//'Accept': 'application/json',
				//'Origin': '*'
			},
			body: data
		});
	
		return res.json();
	};

	postDataForm = async (json) => {
		// const formData = new FormData(form);
		// const json = JSON.stringify(Object.fromEntries(formData.entries(formData)));

		const res = await this.postData(`/requests`, json);
		return res;
	};

	postDataPersonal = async (data) => {
		const res = await this.postData(`/personalData`, data);
		return res;		
	}

	postPhotoPersonal = async (data) => {
		const res = await this.postData(`/personalPhoto`, data);
		return res;
	}

	postNewsImage = async (data) => {
		const res = await this.postData(`/newsImage`, data);
		return res;
	}

	postNewsData = async (data) => {
		const res = await this.postData(`/newsData`, data);
		return res;		
	}

	putNewsData = async (id, data) => {
		const res = await fetch(`${this._apiBase}/newsData/${id}`, {
			mode: 'cors',
			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				//'Content-type': 'multipart/form-data'
			},
			body: data
		});
	
		return res.json();
	};

}