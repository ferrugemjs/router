import usersStore from "./test-store";

export class ModuleList{
	private refresh:Function;
	private attached():void{
		usersStore.onChange.subscribe( () =>{
			this.refresh();
		})
	}
	private detached():void{
		usersStore.onChange.unsubscribeAll();
	}
	private get users(){
		return usersStore.get();
	}
}