import usersStore from "./test-store";

export class ModuleB{
	name:string;
	id:number;
	constructor(){
		this.id = 0;
		this.name = "default";
	}
	private save(){
		usersStore.save({id:0,name:this.name});
	}
}