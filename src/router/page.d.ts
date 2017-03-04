declare function PageJS(path:string,callback?:(context:{params:{}})=>void):{start:Function};
declare module 'page'{
	export = PageJS; 
}