import usersStore from "./test-store";

export class ModuleList {
	private updates = 0;
	private attached(): void {
		usersStore.onChange.subscribe(() => {
			this.updates++;
		})
	}
	private detached(): void {
		usersStore.onChange.unsubscribeAll();
	}
	private get users() {
		return usersStore.get();
	}
}