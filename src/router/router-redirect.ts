import redirect from "./router-redirect-fn";

export class RouterRedirect {
	private path: string;
	private timeout: number;
	constructor({ to = "", timeout = 123 }) {
		this.path = to;
		this.timeout = timeout;
	}
	private attached(): void {
		redirect(this.path, this.timeout);
	}
}