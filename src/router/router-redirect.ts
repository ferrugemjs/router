import redirect from "./router-redirect-fn";

export class RouterRedirect{
	private path:string;
	private timeout:number;
	constructor(){
		this.path="";
		this.timeout = 123;
	}
	private attached():void{		
		redirect({
			path:this.path
			,timeout:this.timeout
		});
	}
}