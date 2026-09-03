import type { Project } from '../types';
import { items as projects } from './projects';
import { siteOrigin } from './site';

/**
 * The tool suite, derived once.
 *
 * The list used to be typed out by hand in three places — the /tools grid, the
 * home page's featured strip, and the suite JSON-LD that both pages emit under
 * the same @id. They drifted, which is how the site ended up telling Google
 * about "five" tools next to a list of six and describing one entity two
 * different ways. Anything that needs the suite reads it from here.
 */
const TOOL_TYPES = new Set(['AI Developer Tool', 'Developer Tool']);

export const tools: Array<Project> = projects.filter((p) => TOOL_TYPES.has(p.type));

/** Stable @id shared by the CollectionPage on /tools and the reference to it
    from the home page — and by each deployed tool's own isPartOf. */
export const suiteId = `${siteOrigin}/tools#suite`;

export const suiteName = 'Open-source browser-only dev-tools';

export const suiteDescription =
	`${tools.length} browser-only developer tools — ${tools.map((t) => t.name).join(', ')}. ` +
	`Built for rooms where you can't install anything and the data can't leave: no backend, BYOK where a key is needed.`;

export function liveUrl(t: Project): string | undefined {
	return t.links.find((l) => l.label === 'Live')?.to;
}

/** SoftwareApplication nodes for the suite's hasPart / ItemList. */
export function toolSchemaNodes() {
	return tools.map((t) => ({
		'@type': 'SoftwareApplication' as const,
		name: t.name,
		description: t.shortDescription,
		url: liveUrl(t) ?? `${siteOrigin}/tools`,
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Any (web browser)',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		author: { '@id': `${siteOrigin}/#person` }
	}));
}
