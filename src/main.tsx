import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import Registry from '@dojo/framework/widget-core/Registry';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import { registerThemeInjector } from '@dojo/framework/widget-core/mixins/Themed';
import dojo from '@dojo/themes/dojo';
import '@dojo/themes/dojo/index.css';
import './main.css';

import { Config } from './interfaces';
import App from './App';
import routes from './routes';
import Unknown from './Unknown';

export default function startUp(config: Config) {
	const registry = new Registry();
	registerRouterInjector(routes, registry);
	registerThemeInjector(dojo, registry);

	config.examples.forEach((item) => {
		registry.define(item.name, async () => {
			try {
				const widget = require(`./../../src/examples/${item.name}`);
				return widget.default;
			} catch (error) {
				return Unknown;
			}
		});
	});

	const r = renderer(() => w(App, { config }));
	r.mount({ registry });
}
