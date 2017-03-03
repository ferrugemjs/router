import usersStore from "./test-store";
import {IEventSubscribe} from "event-emitter-lite";




export class ModuleList{
	private refresh:Function;
	private insc:IEventSubscribe;
	private attached():void{
		this.insc = usersStore.onChange.subscribe(d=>{
			this.refresh();
		})
	}
	private detached():void{
		usersStore.onChange.unsubscribe(this.insc);
	}
	private get users(){
		return usersStore.get();
	}
}