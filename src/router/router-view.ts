// import page = require("page");
import PageJS = require("page");
import * as fjs from "@ferrugemjs/library";

interface IRoute {
	path: string;
	view: string;
	params?: {};
	redirect?: string;
	routerView?: RouterView;
	nuid: string;
}

export interface Route {
	path: string,
	redirectTo?: string;
	view?: () => Promise<any>,
}

// const global_routes: IRoute[] = [];
let global_uid = new Date().getTime();

export class RouterView {
	public styleName: string;
	public hashbang: boolean;
	public base: string;
	// private indexRoutes: number[] = [];
	private nuid: string = `${global_uid++}`;
	private elementId: string = '';
	constructor({ base = "", styleName = "", hashbang = false, routes = [] as Route[] } = {}) {
		this.styleName = styleName;
		this.hashbang = hashbang;
		this.base = base;

		if (!!routes && routes.length) {
			this.pushRoutes(routes);
		}
	}
	private pushRoutes(proutes: Route[]) {
		proutes.forEach(route => {
			PageJS.default(`${this.base}${route.path}`, ({ params }) => {
				if (!!route.redirectTo) {
					PageJS.default.redirect(route.redirectTo);
				} else if (!!route.view) {
					if (!!this.elementId) {
						route.view().then(_modole => {
							const isObject = typeof _modole === "object";
							if (isObject) {
								const modName = Object.keys(_modole)[0];
								const moduleA = _modole[modName];
								if (params) {
									Object.keys(params).forEach(paramKey => {
										moduleA.prototype[paramKey] = params[paramKey];
									});
								}
								fjs.platform.at(document.getElementById(this.elementId), moduleA);
							}
						})
					}
				}
			});
		});

		// PageJS.default('*', function () {
		// 	console.log('not found!!');
		// });

		PageJS.default.start({ hashbang: this.hashbang ? true : false });
	}
	private attached() {
		setTimeout(() => {
			const element = document.querySelector(`[data-router-view-id="${this.nuid}"]`);
			if (element) {
				this.elementId = element.id;
			}
		}, 0);
	}
	private detached() {
		// this.indexRoutes.forEach(routeIndex => {
		// 	if (global_routes[routeIndex].routerView) {
		// 		global_routes[routeIndex].routerView = null;
		// 		delete global_routes[routeIndex].routerView;
		// 	}
		// });
		// this.indexRoutes.length = 0;
	}
}
