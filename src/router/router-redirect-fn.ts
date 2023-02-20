import page = require("page");

export default ({path, timeout}:{path:string,timeout?:number}) => {
	setTimeout(()=>{
		page(path);
	},parseInt((timeout || 124)+""));
}