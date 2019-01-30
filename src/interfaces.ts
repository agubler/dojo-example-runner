import { WidgetBaseConstructor } from '@dojo/framework/widget-core/interfaces';

export interface Example {
	name: string;
	label: string;
	widgetConstructor: WidgetBaseConstructor;
	description?: string;
}

export interface Config {
	name: string;
	autoNav?: boolean;
	examples: Example[];
}
