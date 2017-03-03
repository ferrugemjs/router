import page = require("page");

let n_uid_route:number = 554;


export interface IRoute{
	path:string;
	viewModel:string;
	params?:{};
}

export class RouterView{
	private routes:IRoute[];
	private route:IRoute;
	private refresh:Function;
	private styleName:string;
	private hashbang:boolean;
	constructor(){
		this.styleName = "";
		this.routes = [];
		this.hashbang=false;
	}
	private get uid():number{
		return n_uid_route;
	}
	private attached(){
		let _this_ = this;
		this.routes.forEach(route=>{
			page(route.path,function(context:{params:{}}){
				this.params = context.params;
				_this_.route = this;
				n_uid_route++;
				_this_.refresh();
			}.bind(route))
		});
		(<any>page).start({hashbang:this.hashbang?true:false});
	}
}