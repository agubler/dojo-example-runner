import { create, tsx, diffProperty, invalidator } from '@dojo/framework/core/vdom';
import { auto } from '@dojo/framework/core/diff';
import icache from '@dojo/framework/core/middleware/icache';
import Outlet from '@dojo/framework/routing/Outlet';
import { actions, dispatch } from 'codesandbox-api';

import Menu from './Menu';
import * as css from './styles/App.m.css';
import { Config } from './interfaces';

export interface AppProperties {
	config: Config;
}

const factory = create({ diffProperty, icache, invalidator }).properties<AppProperties>();

export default factory(function App({ properties: { config }, middleware: { diffProperty, icache } }) {
	const autoNav = icache.get<boolean>('auto-nav') || true;

	diffProperty('config', (current: AppProperties, next: AppProperties) => {
		if (next.config.autoNav !== undefined) {
			icache.set('auto-nav', next.config.autoNav);
		}
		if (auto(current, next).changed) {
			invalidator();
		}
	});

	return (
		<div classes={[css.root]}>
			<div>
				<Menu
					config={config}
					onAutoNavChange={() => {
						const autoNav = icache.get('auto-nav');
						icache.set('auto-nav', !autoNav);
					}}
					autoNav={autoNav}
				/>
			</div>
			<div classes={[css.content]}>
				<Outlet
					id="example"
					renderer={({ params }) => {
						if (autoNav) {
							try {
								dispatch(actions.editor.openModule(`/src/examples/${params.example}.ts`));
								dispatch(actions.editor.openModule(`/src/examples/${params.example}.tsx`));
							} catch {
								// do nothing
							}
						}

						const exampleConfig =
							config.examples.filter((item) => {
								return item.name === params.example;
							})[0] || {};

						return (
							<div>
								<h1>{exampleConfig.label}</h1>
								{exampleConfig.description ? <h4>{exampleConfig.description}</h4> : null}
								<exampleConfig.widgetConstructor />
							</div>
						);
					}}
				/>
			</div>
		</div>
	);
});
