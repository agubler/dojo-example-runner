import { WidgetBaseConstructor, WNodeFactory } from '@dojo/framework/core/interfaces';

export interface Example {
	name: string;
	label: string;
	widgetConstructor: WidgetBaseConstructor | WNodeFactory<any>;
	description?: string;
}

export interface Config {
	name: string;
	autoNav?: boolean;
	examples: Example[];
}
