import renderer, { tsx } from '@dojo/framework/core/vdom';
import Registry from '@dojo/framework/core/Registry';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import { registerThemeInjector } from '@dojo/framework/core/mixins/Themed';
import dojo from '@dojo/themes/dojo';
import '@dojo/themes/dojo/index.css';
import './main.css';

import { Config } from './interfaces';
import App from './App';
import routes from './routes';

export default function startUp(config: Config) {
	const registry = new Registry();
	registerRouterInjector(routes, registry);
	registerThemeInjector(dojo, registry);
	const r = renderer(() => <App config={config} />);
	r.mount({ registry });
}
