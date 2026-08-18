import { error } from '@sveltejs/kit';
import { items } from '@data/projects';

export function load({ params }: { params: Record<string, string> }) {
	const project = items.find((item) => item.slug === params.slug);

	// Unknown slugs used to fall through and render an empty "Could not load"
	// shell with an HTTP 200. The prerender crawler follows relative .md links
	// inside third-party READMEs (LICENSE, CHANGELOG, PoolsApi.md …) which
	// produced ~18 thin pages that Google would happily index. A real 404 stops
	// them being emitted at all.
	if (!project) throw error(404, 'Project not found');

	return { project };
}
