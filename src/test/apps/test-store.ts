import {EventEmitter} from "event-emitter-lite";

export interface IUser{
	id:number;
	name:string;
}

export class TestStore{
	private users:IUser[];
	public onChange:EventEmitter<any> = new EventEmitter();
	constructor(){
		this.users = [];
	}
	public get():IUser[]{
		return this.users;
	}
	public save(user:IUser):void{
		user.id = user.id||(this.users.length+1);
		this.users.push(user);
		this.onChange.emit(null);
	}
}

export default new TestStore();