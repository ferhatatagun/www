import { error } from '@sveltejs/kit';
import {
	getPostBySlug,
	getPostContent,
	getReadingMinutes,
	getRelatedPosts,
	sortedItems
} from '@data/blog';
import type { BlogPost } from '@data/blog';

export function load({ params }: { params: Record<string, string> }) {
	const slug = params.slug;
	const post = getPostBySlug(slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	const contentTr = getPostContent(slug, 'tr') ?? null;
	const contentEn = getPostContent(slug, 'en') ?? null;
	const readingMinutes = getReadingMinutes(slug);
	const relatedPosts = getRelatedPosts(slug);
	const idx = sortedItems.findIndex((p) => p.slug === slug);
	const prevPost: BlogPost | null = idx >= 0 && idx < sortedItems.length - 1 ? sortedItems[idx + 1]! : null;
	const nextPost: BlogPost | null = idx > 0 ? sortedItems[idx - 1]! : null;

	return {
		post,
		contentTr,
		contentEn,
		readingMinutes,
		relatedPosts,
		prevPost,
		nextPost
	};
}
