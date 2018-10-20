import page = require("page");

export interface IRoute{
	path:string;
	view:string;
	params?:{};
	redirect?:string;
	routerView?:RouterView;
	nuid:string;
}

const global_routes:IRoute[] = [];
let global_uid = new Date().getTime();

export class RouterView{
	public styleName:string;
	public hashbang:boolean;
	public base:string;
	private indexRoutes:number[] = [];
	private refresh:Function;
	private nuid:string = `${global_uid++}`;
	constructor(){
		this.styleName = "";
		this.hashbang = false;
	}
	private pushRoute(proute:IRoute){
		if(this.base){
			proute.path = `${this.base}${proute.path}`;
		}
		const routerFoundedIndex = global_routes.findIndex(router => router.path === proute.path);
		if(routerFoundedIndex > -1){
			this.indexRoutes.push(routerFoundedIndex);
			global_routes[routerFoundedIndex].nuid = `sub_route_${this.nuid}_${global_routes.length}`;
			global_routes[routerFoundedIndex].routerView = this;
			return;
		}
		this.indexRoutes.push(global_routes.length);
		proute.routerView = this;
		proute.nuid = `sub_route_${this.nuid}_${global_routes.length}`;
		global_routes.push(proute);

		page(proute.path,function (context:{page:{callbacks:Function[]},canonicalPath:string,params:{}}){
			// console.log(context.page.callbacks.length);
			if(proute.redirect && proute.routerView){
				(<any>page).redirect(proute.redirect);	
			}else if(proute.routerView){
				const {path, view} = proute;
				(<any>proute.routerView).route = {nuid:proute.nuid, path, view, params:context.params};
				//console.log('change:',(<any>proute.routerView).route);
				proute.routerView.refresh();
			}
		});
	}
	private attached(){
		//console.log('attached!!!',this.hashbang);
		if(this.hashbang && global_routes.length === this.indexRoutes.length){
			(<any>page).start({ hashbang:this.hashbang ? true:false });
		}
	}
	private detached(){
		this.indexRoutes.forEach(routeIndex => {
			if(global_routes[routeIndex].routerView){
				global_routes[routeIndex].routerView = null;
				delete global_routes[routeIndex].routerView;
			}
		});
		this.indexRoutes.length = 0;
	}
}
