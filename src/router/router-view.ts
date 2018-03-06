import page = require("page");

export interface IRoute{
	path:string;
	view:string;
	params?:{};
	redirect?:string;
	routerView?:RouterView;
}

let n_uid_route:number = 554;
let global_routes:IRoute[] = [];

export class RouterView{
	private routes:IRoute[];
	private route:IRoute;
	private refresh:Function;
	private styleName:string;
	private hashbang:boolean;
	private extId:string;
	constructor(){
		this.styleName = "";
		this.routes = [];
		this.hashbang = false;
		this.extId = `${this.uid}`;
	}
	private get uid():number{
		return n_uid_route;
	}
	private pushRoute(proute:IRoute){
		let route = Object.assign({},proute);
		route.routerView = this;
		page(route.path,function(context:{canonicalPath:string,params:{}}){
				if(route.redirect){
					(<any>page).redirect(route.redirect);	
				}else if(route.routerView){
					const {path, view, redirect} = <IRoute>this;
					route.routerView.route = {path, view, params:context.params, redirect};
					//route.routerView.route = Object.assign({},JSON.parse(JSON.stringify(this)));
					n_uid_route++;
					route.routerView.refresh();
				}
		}.bind(route));
		global_routes.push(route);
	}
	private updateRoute(proute:IRoute){
		proute.routerView = this;
	}
	private connectedCallback(){
		let localPathsToUpdate:{index:number,path:string}[] = this.routes.map(({path},index) => ({
			index
			,path:path
		}));
		localPathsToUpdate.forEach(routePath => {
			let localPathsIndex = global_routes.findIndex(route => route.path === routePath.path);
			if(localPathsIndex > -1){
				this.updateRoute(global_routes[localPathsIndex]);
			}else{
				this.pushRoute(this.routes[routePath.index]);
			}
		});
		(<any>page).start({ hashbang:this.hashbang ? true:false });
		this.routes.length = 0;
		localPathsToUpdate.length = 0;
	}
	private disconnectedCallback(){
		global_routes.forEach((route,indx) => {
			if(route.routerView && route.routerView.extId === this.extId){
				global_routes[indx].routerView = null;
				delete global_routes[indx].routerView;
			}
		});
	}
}
