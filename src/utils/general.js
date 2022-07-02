const addZerosToNum = (num, start) => {
	for (let i = start, q = 1, z; i >= 10; i = i/10) {
		q = q*10;
		if (num <= i && num >= i/10) {
			z = q.toString().slice(2);
			return `${z}${num}`;
			break;
		}
		if (num > i) {
			return num;
			break;
		}
	}
}

export {
	addZerosToNum
};