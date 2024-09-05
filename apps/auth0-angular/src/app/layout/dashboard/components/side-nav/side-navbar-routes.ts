import { SideNavOptions } from '@/core/interfaces';

export const SIDE_NAV_BAR_ROUTES: SideNavOptions[] = [
	{
		header: 'Security',
		icon: 'security',
		items: [
			{
				icon: 'account_circle',
				text: 'Users',
				link: '/dashboard/manage-user'
			}
		]
	}
];
