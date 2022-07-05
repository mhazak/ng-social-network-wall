export interface Post {
	id?: string,
	email: string;
    imageURL: string;
    text: string;
	title: string;
    likes?: {
		amount: number,
		items: [{ email: string, value: boolean, postid: string}]
	},
	dtcreated: Date,
    comments?:[{username:'', comment:''}]
}
