import page = require("page");

export default (params:{path:string,timeout?:number}) => {
	window.setTimeout(()=>{
		page(params.path);
	},parseInt((params.timeout||124)+""));
}