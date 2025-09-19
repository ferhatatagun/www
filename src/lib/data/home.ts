import { Platform } from '$lib/types';
import { getSkills } from './skills';

export const title = 'Home';

export const name = 'Ferhat';

export const lastName = 'Atagün';

export const description =
	'I am a constantly improving software developer living in Turkey/Istanbul, working as a Frontend Developer within HangiKredi. I love being a part of the development of web technologies.';

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
		platform: Platform.Email,
		link: 'ferhatatagun2@gmail.com'
	}
];

export const skills = getSkills(
	'js',
	'node',
	'nextjs',
	'react-native',
	'vitejs',
	'ts',
	'html',
	'reactjs',
	'nextjs',
	'svelte',
	'gatsby'
);
