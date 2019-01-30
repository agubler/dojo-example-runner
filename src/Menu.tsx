import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { tsx } from '@dojo/framework/widget-core/tsx';
import ActiveLink from '@dojo/framework/routing/ActiveLink';
import Switch, { Mode } from '@dojo/widgets/checkbox';

import * as css from './styles/Menu.m.css';
import { Config } from './interfaces';
import { DNode } from '@dojo/framework/widget-core/interfaces';

export interface MenuProperties {
	config: Config;
	autoNav: boolean;
	onAutoNavChange: any;
}

export default class extends WidgetBase<MenuProperties> {
	protected render(): DNode {
		const { config, onAutoNavChange, autoNav } = this.properties;
		const showToggle = window !== parent;

		return (
			<div classes={[css.root]}>
				<a classes={[css.trigger]}>
					<i classes={[css.icon, 'fa', 'fa-bars']} />
					<h1 classes={[css.title]}>{config.name}</h1>
				</a>
				<nav classes={[css.nav]}>
					{showToggle ? <Switch
						label="Auto Nav"
						onChange={onAutoNavChange}
						checked={autoNav}
						mode={Mode.toggle}
						extraClasses={{
							root: css.toggle,
							toggleSwitch: css.toggleSwitch,
							checked: css.checked
						}}
					/> : null}
					<ul>
						{config.examples.map((item) => {
							return (
								<li>
									<ActiveLink
										classes={[css.link]}
										activeClasses={[css.active]}
										to="example"
										params={{ example: item.name }}
									>
										<em>{item.label}</em>
									</ActiveLink>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		);
	}
}
