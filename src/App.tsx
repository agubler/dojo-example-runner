import { actions, dispatch } from 'codesandbox-api';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import Outlet from '@dojo/framework/routing/Outlet';

import Menu from './Menu';
import * as css from './styles/App.m.css';
import { Config } from './interfaces';
import { DNode } from '@dojo/framework/widget-core/interfaces';

export interface AppProperties {
	config: Config;
}

export default class extends WidgetBase<AppProperties> {
	private _autoNav = true;
	private _switchAutoNav = () => {
		this._autoNav = !this._autoNav;
		this.invalidate();
	};

	protected render(): DNode {
		const { config } = this.properties;

		return (
			<div classes={[css.root]}>
				<div>
					<Menu config={config} onAutoNavChange={this._switchAutoNav} autoNav={this._autoNav} />
				</div>
				<div>
					<Outlet
						id="example"
						renderer={({ params }) => {
							if (this._autoNav) {
								dispatch(actions.editor.openModule(`/src/examples/${params.example}.ts`));
								dispatch(actions.editor.openModule(`/src/examples/${params.example}.tsx`));
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
	}
}
