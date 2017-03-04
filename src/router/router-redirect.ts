import page = require("page");

export class RouterRedirect{
	private path:string;
	private timeout:number;
	constructor(){
		this.path="";
		this.timeout = 554;
	}
	private setPath(path:string):void{
		this.path = path;		
		window.setTimeout(()=>{
			page(this.path);
		},this.timeout);
	}
}