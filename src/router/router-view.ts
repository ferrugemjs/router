import page = require("page");

export interface IRoute{
	path:string;
	view:string;
	params?:{};
	redirect?:string;
	routerView?:RouterView;
	nuid:string;
}

export class RouterView{
	private routes:IRoute[];
	private refresh:Function;
	private styleName:string;
	private hashbang:boolean;
	private nuid:string = `${new Date().getTime()}`;
	constructor(){
		this.styleName = "";
		this.routes = [];
		this.hashbang = false;
	}
	private pushRoute(proute:IRoute){
		console.log('push:',proute);
		proute.routerView = this;
		proute.nuid = `sub_route_${this.nuid}_${this.routes.length}`;
		this.routes.push(proute);
		page(proute.path,function(context:{canonicalPath:string,params:{}}){
				if(proute.redirect){
					(<any>page).redirect(proute.redirect);	
				}else if(proute.routerView){
					const {path, view, redirect} = <IRoute>this;
					(<any>proute.routerView).route = {nuid:proute.nuid, path, view, params:context.params, redirect};
					console.log('change:',(<any>proute.routerView).route);
					proute.routerView.refresh();
				}
		}.bind(proute));
	}
	private attached(){
		console.log('attached!!!');
		//(<any>page).start({ hashbang:this.hashbang ? true:false });
	}
	private detached(){
		this.routes.forEach((route,indx) => {
			if(route.routerView){
				this.routes[indx].routerView = null;
				delete this.routes[indx].routerView;
			}
		});
		this.routes.length = 0;
	}
}
