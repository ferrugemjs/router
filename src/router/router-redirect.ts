import redirect from "./router-redirect-fn";

export class RouterRedirect{
	private path:string;
	private timeout:number;
	constructor({path = "", timeout = 123}){
		this.path = path;
		this.timeout = timeout;
	}
	private attached():void{
		redirect({
			path:this.path
			,timeout:this.timeout
		});
	}
}