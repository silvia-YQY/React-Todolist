export interface IlistItem {
	id: number,
	title: string,
	status: string,
	deleted: boolean
}


export interface IformData {
	email: string,
	username: string,
	password: string,
}

export interface InewTodoobj {
	status: string,
	title: string,
	deleted: boolean,
	id:number
}