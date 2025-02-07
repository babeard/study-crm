<script lang="ts" module>
	import AudioWaveform from 'lucide-svelte/icons/audio-waveform';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import Bot from 'lucide-svelte/icons/bot';
	import ChartPie from 'lucide-svelte/icons/chart-pie';
	import Command from 'lucide-svelte/icons/command';
	import Frame from 'lucide-svelte/icons/frame';
	import GalleryVerticalEnd from 'lucide-svelte/icons/gallery-vertical-end';
	import Map from 'lucide-svelte/icons/map';
	import Settings2 from 'lucide-svelte/icons/settings-2';
	import SquareActivity from 'lucide-svelte/icons/square-activity';
	import GraduationCap from 'lucide-svelte/icons/graduation-cap';
	import BadgeCent from 'lucide-svelte/icons/badge-cent';
	import HeartHandshake from 'lucide-svelte/icons/heart-handshake';
	import Wheat from 'lucide-svelte/icons/wheat';
	import Pickaxe from 'lucide-svelte/icons/pickaxe';
	import Scissors from 'lucide-svelte/icons/scissors';
	// This is sample data.
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
		},
		teams: [
			{
				name: 'Acme Inc',
				logo: GalleryVerticalEnd,
				plan: 'Enterprise'
			},
			{
				name: 'Acme Corp.',
				logo: AudioWaveform,
				plan: 'Startup'
			},
			{
				name: 'Evil Corp.',
				logo: Command,
				plan: 'Free'
			}
		],
		navMain: [
			{
				title: 'Overview',
				url: '#',
				icon: SquareActivity,
				isActive: true
			},
			{
				title: 'Students',
				url: '#',
				icon: Wheat,
				isActive: true,
				items: [
					{
						title: 'Interactions',
						url: '#'
					},
					{
						title: 'New Student',
						url: '#'
					}
					// {
					// 	title: 'Quantum',
					// 	url: '#'
					// }
				]
			},
			{ title: 'Interactions', url: '#', icon: HeartHandshake },
			{
				title: 'Studies',
				url: '#',
				icon: BookOpen
			},
			{ title: 'Workers', url: '#', icon: Pickaxe },
			{
				title: 'Expenses',
				url: '#',
				icon: BadgeCent,
				isActive: false,
				items: [
					{
						title: 'Active Requests',
						url: '#'
					},
					{
						title: 'New Request',
						url: '#'
					}
				]
			}
		],
		admins: [
			{
				name: 'Resources',
				url: '#',
				icon: Scissors
			}
			// {
			// 	name: 'Sales & Marketing',
			// 	url: '#',
			// 	icon: ChartPie
			// },
			// {
			// 	name: 'Travel',
			// 	url: '#',
			// 	icon: Map
			// }
		]
	};
</script>

<script lang="ts">
	import NavMain from '$lib/components/nav-main.svelte';
	import NavAdmin from '$lib/components/nav-admin.svelte';
	import NavUser from '$lib/components/nav-user.svelte';
	import TeamSwitcher from '$lib/components/team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavAdmin items={data.admins} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
