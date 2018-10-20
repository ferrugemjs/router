declare function PageJS(path:string,callback?:(context:{page?:{callbacks:Function[]},params:{}})=>void):{start:Function};
declare module 'page'{
	export = PageJS; 
}