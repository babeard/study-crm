<script lang="ts">
	// Libraries & Modules
	import type { Snippet } from 'svelte';

	// Components
	import SidebarPage from '$lib/components/sidebar-page.svelte';

	// Icons

	// Types

	type Props = {
		data: any;
		children: Snippet;
	};

	let { data, children }: Props = $props();
</script>

<SidebarPage>
	{@render children?.()}
</SidebarPage>
