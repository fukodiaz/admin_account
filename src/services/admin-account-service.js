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

	getListOffers = async () => {
		const res = await this.getResource(`/offers`);
		return res;
	};

	postData = async (url, data) => {
		const res = await fetch(`${this._apiBase}${url}`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
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

	postDataPersonal = async (json) => {
		const res = await this.postData(`/dataPersonal`, json);
		return res;
	}

}