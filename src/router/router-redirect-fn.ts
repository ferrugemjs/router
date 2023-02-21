import PageJS = require("page");

export default (to: string, timeout?: number) => {
	setTimeout(() => {
		PageJS.default.redirect(to);
	}, Number(`${timeout || 124}`));
}