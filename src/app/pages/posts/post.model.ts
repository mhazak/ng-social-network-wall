export interface Post {
	email: string;
    imageURL: string;
    text: string;
    likes?: {
		amount: number,
		persons: [{ email: string }]
	},
	dtcreated: Date,
    comments?:[{username:'', comment:''}]
}
