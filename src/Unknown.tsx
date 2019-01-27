import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';

export default class extends WidgetBase {
	protected render(): DNode {
		return v('div', [
			v('h1', ['Unknown Widget']),
			v('div', ['Please make sure the configuration in `./site/config.ts` is correct.'])
		]);
	}
}
