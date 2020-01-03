export const emailValidation = (email) => {
	const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return pattern.test(email);
}

export const urlValidation = (url) => {
	const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
	return pattern.test(url);
}

export const usernameValidation = (username) => {
	const pattern = /^[a-zA-Z0-9]([^<>\/\?\!#\$\%\&\^\*\-\_\+\=\`~|(){}[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)$/;
	return pattern.test(username);
}