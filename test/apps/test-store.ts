export interface IUser{
	id:number;
	name:string;
}

export class TestStore{
	private users:IUser[];
	public onChange:{subscribe:Function,unsubscribeAll:Function,emit:Function};
	private sub:Function;
	constructor(){
		this.users = [];
		this.onChange = {
			subscribe(pfn:Function){
				this.sub = pfn;
			},
			unsubscribeAll(){
				this.sub = null;
				delete this.sub;
			},
			emit(msg:string){
				if(this.sub){
					this.sub(msg);
				}
			}
		}
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