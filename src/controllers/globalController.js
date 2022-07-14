export const handleHome = (req, res) => {
	return res.render("login.html");
};

export const handleSignUp = (req, res) => {
	return res.render("signup.html");
}

export const handleMain = (req, res) => {
	return res.render("main.html");
}

export const logout = (req, res) => {
	req.session.destroy();
	return res.redirect('/');
}

export const handleUser = (req, res) => {
	return res.render("user.html");
}