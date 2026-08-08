import { Platform } from '$lib/types';
import { getSkills } from './skills';

export const title = 'Home';

export const name = 'Ferhat';

export const lastName = 'Atagün';

export const description =
	"Frontend team lead in Istanbul, at HangiKredi. I work the last mile of AI — where a model stops being a demo and has to survive real users, real data, and someone else's production environment. My open-source tools make the Claude API legible enough to debug in the room.";

export const links: Array<{ platform: Platform; link: string }> = [
	{ platform: Platform.GitHub, link: 'https://github.com/ferhatatagun' },
	{
		platform: Platform.Linkedin,
		link: 'https://www.linkedin.com/in/ferhatatagun/'
	},
	{
		platform: Platform.Twitter,
		link: 'https://twitter.com/ferhatatagun'
	},
	{
		platform: Platform.StackOverflow,
		link: 'https://stackoverflow.com/users/20566734/'
	},
	{
		platform: Platform.Medium,
		link: 'https://medium.com/@ferhatatagun'
	},
	{
		platform: Platform.DevTo,
		link: 'https://dev.to/ferhatatagun'
	},
	{
		platform: Platform.Email,
		link: 'ferhatatagun2@gmail.com'
	}
];

export const skills = getSkills(
	'ai-llm-tools',
	'js',
	'node',
	'nextjs',
	'react-native',
	'vitejs',
	'ts',
	'html',
	'reactjs',
	'svelte',
	'gatsby'
);
