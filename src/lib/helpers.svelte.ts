import type { Doc, TableNames } from '$convex/_generated/dataModel';
import { useQuery } from 'convex-svelte';
import type { FunctionReference } from 'convex/server';

export function loadData(
	serverData: Doc<TableNames>[],
	api: FunctionReference<'query', 'public'>,
	args: { [key: string]: string } = {}
) {
	const q = useQuery(api, args);
	const data = $derived(q.data || serverData);

	return {
		get data() {
			return data;
		}
	};
}
