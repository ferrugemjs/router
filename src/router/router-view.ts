import page = require("page");

export interface IRoute{
	path:string;
	view:string;
	params?:{};
	redirect?:string;
	routerView?:RouterView;
}

let n_uid_route:number = 554;
let routes:IRoute[] = [];

export class RouterView{
	//private routes:IRoute[];
	private route:IRoute;
	private refresh:Function;
	private styleName:string;
	private hashbang:boolean;
	private extId:string;
	constructor(){
		this.styleName = "";
		//this.routes = [];
		this.hashbang = false;
		this.extId = `${this.uid}`;
	}
	private get uid():number{
		return n_uid_route;
	}
	private set routes(routes:IRoute[]){}
	private get routes(){
		return routes;
	}
	private connectedCallback(){
		let _this_ = this;
		this.routes.filter(troute => typeof troute.routerView === "undefined").forEach(route => {
			route.routerView = _this_;
			page(route.path,function(context:{canonicalPath:string,params:{}}){
				//console.log(context.canonicalPath);
				if(route.redirect){
					(<any>page).redirect(route.redirect);	
				}else if(route.routerView){
					//route.routerView.route = <IRoute>{};
					const {path, view, params, redirect} = <IRoute>this;
					route.routerView.route = {path, view, params, redirect};
					n_uid_route++;
					route.routerView.refresh();
				}
			}.bind(route));
		});
		(<any>page).start({ hashbang:this.hashbang ? true:false });
	}
	private disconnectedCallback(){
		this.routes.forEach((route,indx) => {
			if(route.routerView && route.routerView.extId === this.extId){
				this.routes[indx].routerView = null;
				delete this.routes[indx].routerView;
			}
		});
	}
}
