import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import ActiveLink from '@dojo/framework/routing/ActiveLink';
import Switch, { Mode } from '@dojo/widgets/checkbox';

import * as css from './styles/Menu.m.css';
import { Config } from './interfaces';

export interface MenuProperties {
	config: Config;
	autoNav?: boolean;
	onAutoNavChange: any;
}

const factory = create({ icache }).properties<MenuProperties>();

export default factory(function Menu({ properties }) {
	const { config, onAutoNavChange, autoNav } = properties;
	const showToggle = window !== parent;

	return (
		<div classes={[css.root]}>
			<a classes={[css.trigger]}>
				<i classes={[css.icon, 'fa', 'fa-bars']} />
				<h1 classes={[css.title]}>{config.name}</h1>
			</a>
			<nav classes={[css.nav]}>
				{showToggle && autoNav != null && (
					<Switch
						label="Auto Nav"
						onChange={onAutoNavChange}
						checked={autoNav}
						mode={Mode.toggle}
						extraClasses={{
							root: css.toggle,
							toggleSwitch: css.toggleSwitch,
							checked: css.checked
						}}
					/>
				)}
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
});
