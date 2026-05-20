import Assets from './assets';
import type { Skill, SkillCategory } from '../types';
import svelteMD from '../md/svelte.md?raw';
import reactMD from '../md/react.md?raw';
import reactNativeMD from '../md/react.md?raw';
import gatsbyMD from '../md/gatsby.md?raw';
import graphqlMD from '../md/graphql.md?raw';
import nextjsMD from '../md/nextjs.md?raw';
import vuejsMD from '../md/vuejs.md?raw';
import nuxtjsMD from '../md/nuxtjs.md?raw';
import sassMD from '../md/sass.md?raw';
import vitejsMD from '../md/vitejs.md?raw';
import remotionMD from '../md/remotion.md?raw';
import angularMd from '../md/angular.md?raw';
import expressjsMd from '../md/expressjs.md?raw';
import mjmlMD from '../md/mjml.md?raw';
import remixjsMD from '../md/remixjs.md?raw';
import typescriptMD from '../md/ts.md?raw';
import millionjsMd from '../md/millionjs.md?raw';
import serviceWorkerMD from '../md/serviceworker.md?raw';
import fastapiMD from '../md/fastapi.md?raw';
import poolsapiMd from '../md/poolsapi.md?raw';
import supabaseMD from '../md/supabase.md?raw';
import { omit, type StringWithAutoComplete } from '@riadh-adrani/utils';

const defineSkillCategory = <S extends string>(data: SkillCategory<S>): SkillCategory<S> => data;

const categories = [
	defineSkillCategory({ name: 'AI & LLM', slug: 'ai-llm' }),
	defineSkillCategory({ name: 'Programming Languages', slug: 'pro-lang' }),
	defineSkillCategory({ name: 'Frameworks', slug: 'framework' }),
	defineSkillCategory({ name: 'Libraries', slug: 'library' }),
	defineSkillCategory({ name: 'Languages', slug: 'lang' }),
	defineSkillCategory({ name: 'Databases', slug: 'db' }),
	defineSkillCategory({ name: 'ORMs', slug: 'orm' }),
	defineSkillCategory({ name: 'DevOps', slug: 'devops' }),
	defineSkillCategory({ name: 'Testing', slug: 'test' }),
	defineSkillCategory({ name: 'Dev Tools', slug: 'devtools' }),
	defineSkillCategory({ name: 'Markup & Style', slug: 'markup-style' }),
	defineSkillCategory({ name: 'Design', slug: 'design' }),
	defineSkillCategory({ name: 'Soft Skills', slug: 'soft' }),
	defineSkillCategory({ name: 'Manage', slug: 'management' })
] as const;

const defineSkill = <S extends string>(
	skill: Omit<Skill<S>, 'category'> & {
		category?: StringWithAutoComplete<(typeof categories)[number]['slug']>;
	}
): Skill<S> => {
	const out: Skill<S> = omit(skill, 'category');

	if (skill.category) {
		out.category = categories.find((it) => it.slug === skill.category);
	}

	return out;
};

export const items = [
	defineSkill({
		slug: 'ai-llm-tools',
		color: '#8b5cf6',
		description:
			'Software development with AI and large language models (LLM): Model Context Protocol (MCP), GPT/OpenAI API, Cursor, Claude, prompt engineering and AI-assistant integration. Context management with MCP servers, agentic workflow and productivity in daily development.',
		logo: Assets.AI,
		name: 'AI & LLM Tools',
		category: 'ai-llm'
	}),
	defineSkill({
		slug: 'utility',
		color: '#8950FC',
		description:
			'utility project means the acquisition, construction, installation, retrofitting, rebuilding, or other addition to or improvement of any equipment, device, ...',
		logo: Assets.Utility,
		name: 'Utility',
		category: 'management'
	}),
	defineSkill({
		slug: 'js',
		color: '#efd81b',
		description:
			'JavaScript is a versatile, high-level programming language primarily used for creating interactive and dynamic web content. It allows developers to implement complex features on web pages, such as updating content, controlling multimedia, and animating images. JavaScript is essential for front-end development, enabling the creation of responsive and engaging user interfaces.',
		logo: Assets.JavaScript,
		name: 'Javascript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'ts',
		color: '#3178c6',
		description: typescriptMD,
		logo: Assets.TypeScript,
		name: 'Typescript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'mjml',
		color: '#f93748',
		description: mjmlMD,
		logo: Assets.MJML,
		name: 'Mjml',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'reactjs',
		color: 'cyan',
		description: reactMD,
		logo: Assets.ReactJs,
		name: 'React Js',
		category: 'framework'
	}),
	defineSkill({
		slug: 'nextjs',
		color: '#000000',
		description: nextjsMD,
		logo: Assets.NextJs,
		name: 'NextJs',
		category: 'framework'
	}),
	defineSkill({
		slug: 'gatsby',
		color: '#663399',
		description: gatsbyMD,
		logo: Assets.Gatsby,
		name: 'Gatsby',
		category: 'framework'
	}),
	defineSkill({
		slug: 'vuejs',
		color: '#41b883',
		description: vuejsMD,
		logo: Assets.VueJs,
		name: 'Vue.js',
		category: 'framework'
	}),
	defineSkill({
		slug: 'nuxtjs',
		color: '#00c58e',
		description: nuxtjsMD,
		logo: Assets.Nuxt,
		name: 'Nuxt.js',
		category: 'framework'
	}),
	defineSkill({
		slug: 'vitejs',
		color: '#a26cdd',
		description: vitejsMD,
		logo: Assets.Vite,
		name: 'ViteJs',
		category: 'library'
	}),
	defineSkill({
		slug: 'react-native',
		color: '#21232a',
		description: reactNativeMD,
		logo: Assets.ReactNative,
		name: 'ReactNative',
		category: 'framework'
	}),
	defineSkill({
		slug: 'millionjs',
		color: '#a26cdd',
		description: millionjsMd,
		logo: Assets.MillionJs,
		name: 'Million.js',
		category: 'library'
	}),
	defineSkill({
		slug: 'biome',
		color: '#60a5fa',
		description:
			'Format code like Prettier, save time. Biome is a fast formatter for JavaScript, TypeScript, JSX, and JSON that scores 97% compatibility with Prettier, saving CI ...',
		logo: Assets.Biome,
		name: 'Biome.js',
		category: 'library'
	}),
	defineSkill({
		slug: 'expressjs',
		color: '#21232a',
		description: expressjsMd,
		logo: Assets.ExpressJs,
		name: 'Express.js',
		category: 'framework'
	}),
	defineSkill({
		slug: 'remotion',
		color: '#0b84f3',
		description: remotionMD,
		logo: Assets.Remotion,
		name: 'Remotion',
		category: 'library'
	}),
	defineSkill({
		slug: '.Net',
		color: '#512BD4',
		description:
			'Downloads for building and running applications with .NET Framework. Get web installer, offline installer, and language pack downloads for .NET Framework.',
		logo: Assets.DotNet,
		name: '.Net',
		category: 'framework'
	}),
	defineSkill({
		slug: 'Xamarin',
		color: '#512BD4',
		description:
			'Xamarin support has ended. Build cross-platform mobile and desktop apps with .NET.',
		logo: Assets.Xamarin,
		name: 'Xamarin',
		category: 'framework'
	}),
	defineSkill({
		slug: 'node',
		color: '#52a144',
		description: 'Node.js® is a JavaScript runtime built on Chromes V8 JavaScript engine.',
		logo: Assets.NodeJs,
		name: 'NodeJs',
		category: 'library'
	}),
	defineSkill({
		slug: 'angular',
		color: '#d70230',
		description: angularMd,
		logo: Assets.Angular,
		name: 'Angular',
		category: 'framework'
	}),
	defineSkill({
		slug: 'html',
		color: '#e96328',
		description:
			'HTML (HyperText Markup Language) is the standard markup language used to create and structure content on the web. It provides the basic building blocks for web pages, allowing developers to define elements such as headings, paragraphs, links, images, and more. HTML is essential for organizing and presenting information in a web browser.',
		logo: Assets.HTML,
		name: 'HTML',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'css',
		color: '#2762e9',
		description:
			'CSS (Cascading Style Sheets) is a style sheet language used to describe the presentation of HTML documents. It controls the layout, colors, fonts, and overall visual appearance of web pages. CSS enables developers to create visually appealing and responsive designs that enhance the user experience across different devices and screen sizes.',
		logo: Assets.CSS,
		name: 'CSS',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'sass',
		color: '#c55d90',
		description: sassMD,
		logo: Assets.Sass,
		name: 'Sass',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'frontend-architecture',
		color: '#000000',
		description:
			'Frontend architecture enhances user experience and web application performance. A well-structured and modular frontend architecture enables ...',
		logo: Assets.FrontendArchitecture,
		name: 'Frontend Architecture',
		category: 'management'
	}),
	defineSkill({
		slug: 'teamwork',
		color: '#000000',
		description:
			'The activity of working together in a group with other people, especially when this is successful...',
		logo: Assets.TeamWork,
		name: 'Teamwork',
		category: 'management'
	}),
	defineSkill({
		slug: 'team-leadership',
		color: '#2563eb',
		description:
			'Leading a technical team: setting direction, mentoring, code review, and aligning work with product goals.',
		logo: Assets.TeamWork,
		name: 'Team Leadership',
		category: 'management'
	}),
	defineSkill({
		slug: 'team-management',
		color: '#1d4ed8',
		description:
			'Managing team capacity, priorities, and delivery; facilitating ceremonies and stakeholder communication.',
		logo: Assets.TeamWork,
		name: 'Team Management',
		category: 'management'
	}),
	defineSkill({
		slug: 'spring',
		color: '#78bc1e',
		description:
			'Spring Framework is an open source application development framework developed for Java. The core features of Spring Framework can be used by any Java application. It can be used with its plug-ins to disseminate web applications on the Java EE platform.',
		logo: Assets.Spring,
		name: 'Spring',
		category: 'framework'
	}),
	defineSkill({
		slug: 'reactive-programming',
		color: '#F80090',
		description:
			'Reactive programming is a declarative programming paradigm that is based on the idea of asynchronous event processing and data streams. Today, reactive programming is used in many different areas, such as GUI programming, web programming, microservices, or reactive systems in general.',
		logo: Assets.Reactive,
		name: 'Reactive Programming',
		category: 'soft'
	}),
	defineSkill({
		slug: 'service-worker',
		color: '#DDDDDD',
		description: serviceWorkerMD,
		logo: Assets.ServiceWorker,
		name: 'Service Worker',
		category: 'soft'
	}),
	defineSkill({
		slug: 'github-api',
		color: '#000000',
		description:
			'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories, ...',
		logo: Assets.Github,
		name: 'Github API',
		category: 'devtools'
	}),
	defineSkill({
		slug: 'jenkins',
		color: '#d24939',
		description:
			'Jenkins is an open-source automation server that helps automate parts of the software development process, including building, testing, and deploying code. It supports continuous integration and continuous delivery (CI/CD) pipelines, allowing developers to deliver high-quality software quickly and efficiently.',
		logo: Assets.Jenkins,
		name: 'Jenkins',
		category: 'devtools'
	}),
	defineSkill({
		slug: 'fastapi',
		color: '#000000',
		description: fastapiMD,
		logo: Assets.FastApi,
		name: 'FastAPI',
		category: 'framework'
	}),
	defineSkill({
		slug: 'pools-api',
		color: '#8950FC',
		description: poolsapiMd,
		logo: Assets.PoolsApi,
		name: 'Pools API',
		category: 'db'
	}),
	defineSkill({
		slug: 'omdb-api',
		color: '#8950FC',
		description:
			'OMDb API ... The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users. If ...',
		logo: Assets.OMDbApi,
		name: 'OMDB API',
		category: 'db'
	}),
	defineSkill({
		slug: 'graphql',
		color: '#f6009c',
		description: graphqlMD,
		logo: Assets.Graphql,
		name: 'GraphQL',
		category: 'db'
	}),
	defineSkill({
		slug: 'supabase',
		color: '#38996c',
		description: supabaseMD,
		logo: Assets.Supabase,
		name: 'Supabase',
		category: 'db'
	}),
	defineSkill({
		slug: 'svelte',
		color: '#f73c01',
		description: svelteMD,
		logo: Assets.Svelte,
		name: 'Svelte',
		category: 'framework'
	}),
	defineSkill({
		slug: 'pwa',
		color: '#5a0fc8',
		description:
			'A Progressive Web App (PWA) is a type of application software delivered through the web, built using common web technologies including HTML, CSS, and JavaScript. It is intended to work on any platform that uses a standards-compliant browser, offering features such as offline capabilities, push notifications, and more.',
		logo: Assets.Pwa,
		name: 'PWA',
		category: 'framework'
	}),
	defineSkill({
		slug: 'remixjs',
		color: '#3f72af',
		description: remixjsMD,
		logo: Assets.RemixJs,
		name: 'Remix',
		category: 'framework'
	}),
	defineSkill({
		slug: 'monorepo-microfrontend',
		color: '#444',
		description:
			'Monorepo is a development strategy where code for many projects is stored in the same repository. Microfrontend is a design approach in which a front-end app is decomposed into individual, semi-independent “microapps” working loosely together. Both aim to improve the modularity and scalability of applications.',
		logo: Assets.MonorepoMicrofrontend,
		name: 'Monorepo & Microfrontend',
		category: 'devtools'
	}),
	defineSkill({
		slug: 'figma',
		color: '#444',
		description:
			'Figma is the leading collaborative design tool for building meaningful products. Seamlessly design, prototype, develop, and collect feedback in a single ...',
		logo: Assets.Figma,
		name: 'Figma',
		category: 'design'
	}),
	defineSkill({
		slug: 'hasura',
		color: '#ff5722',
		description:
			'Hasura is an open-source engine that connects to your databases & microservices and auto-generates a production-ready GraphQL backend. It provides real-time GraphQL APIs on new or existing Postgres databases.',
		logo: Assets.Hasura,
		name: 'Hasura',
		category: 'devtools'
	})
] as const;

export const title = 'Skills';

export const getSkills = (
	...slugs: Array<StringWithAutoComplete<(typeof items)[number]['slug']>>
): Array<Skill> => items.filter((it) => slugs.includes(it.slug));

export const groupByCategory = (
	query: string
): Array<{ category: SkillCategory; items: Array<Skill> }> => {
	const out: ReturnType<typeof groupByCategory> = [];

	const others: Array<Skill> = [];

	items.forEach((item) => {
		if (query.trim() && !item.name.toLowerCase().includes(query.trim().toLowerCase())) return;

		// push to others if item does not have a category
		if (!item.category) {
			console.log(item.category);
			others.push(item);
			return;
		}

		// check if category exists
		let category = out.find((it) => it.category.slug === item.category?.slug);

		if (!category) {
			category = { items: [], category: item.category };

			out.push(category);
		}

		category.items.push(item);
	});

	if (others.length !== 0) {
		out.push({ category: { name: 'Others', slug: 'others' }, items: others });
	}

	return out;
};
