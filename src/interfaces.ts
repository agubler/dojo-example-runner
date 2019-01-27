export interface Example {
	name: string;
	label: string;
	description: string;
}

export interface Config {
	name: string;
	autoNav?: boolean;
	examples: Example[];
}
