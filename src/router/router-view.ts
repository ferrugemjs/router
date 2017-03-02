import page = require("page");

export interface IRoute{
	path:string;
	viewModel:string;
	params?:{};
}

export class RouterView{
	private routes:IRoute[];
	private route:IRoute;
	private refresh:Function;
	private uid:number;
	private styleName:string;
	private hashbang:boolean;
	constructor(){
		this.styleName = "";
		this.routes = [];
		this.uid=1;
		this.hashbang=false;
	}
	private attached(){
		let _this_ = this;
		this.routes.forEach(route=>{
			page(route.path,function(context:{params:{}}){
				this.params = context.params;
				_this_.route = this;
				_this_.uid++;
				_this_.refresh();
			}.bind(route))
		});
		(<any>page).start({hashbang:this.hashbang?true:false});
	}
}