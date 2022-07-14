export const protectedOnlyMiddleware = (req, res, next) => {
	if (req.session.loggedIn) {
		next();
	} else {
		return res.redirect("/");
	}
};

export const publicOnlyMiddleware = (req, res, next) => {
	if (!req.session.loggedIn) {
		next();
	} else {
		return res.redirect("/main");
	}
};