import Assets from './assets';
import { getSkills } from './skills';
import { ContractType, type Experience } from '../types';

// export const items: Array<Experience> = [
// 	{
// 		slug: 'open-sourcer',
// 		company: 'Self-employed',
// 		description: 'Creating awesome tools for developers.',
// 		contract: ContractType.SelfEmployed,
// 		type: 'Software Development',
// 		location: 'Home',
// 		period: { from: new Date() },
// 		skills: getSkills('ts', 'js'),
// 		name: 'Open Source Developer',
// 		color: 'red',
// 		links: [],
// 		logo: Assets.Unknown,
// 		shortDescription: 'Creating awesome tools for developers.'
// 	},
// 	{
// 		slug: 'software-freelance',
// 		company: 'Self-employed',
// 		description: 'Creating awesome applications for customers.',
// 		contract: ContractType.Freelance,
// 		type: 'Software Development',
// 		location: 'Home',
// 		period: { from: new Date() },
// 		skills: getSkills('svelte', 'ts', 'sass', 'css', 'html', 'js'),
// 		name: 'Freelancer',
// 		color: 'blue',
// 		links: [],
// 		logo: Assets.Unknown,
// 		shortDescription: 'Creating awesome applications for customers.'
// 	},
// 	{
// 		slug: 'software-freelance-junior',
// 		company: 'Self-employed',
// 		description: 'Creating awesome applications for customers.',
// 		contract: ContractType.Freelance,
// 		type: 'Software Development',
// 		location: 'Home',
// 		period: { from: new Date(2022, 0, 1), to: new Date() },
// 		skills: getSkills('css', 'html', 'js'),
// 		name: 'Junior Freelancer',
// 		color: 'green',
// 		links: [],
// 		logo: Assets.Unknown,
// 		shortDescription: 'Creating awesome applications for customers.'
// 	}
// ];

export const items: Array<Experience> = [
	{
		slug: 'frontend-team-lead',
		company: 'HangiKredi',
		description: 'Leading the frontend team and managing frontend architecture.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Istanbul, Turkey (Hybrid)',
		period: {
			from: new Date(2023, 11, 1)
		},
		skills: getSkills(
			'mjml',
			'js',
			'reactjs',
			'nextjs',
			'ts',
			'vitejs',
			'frontend-architecture',
			'team-leadership',
			'teamwork',
			'team-management',
			'utility'
		),
		name: 'Frontend Team Lead',
		color: '#0000FF',
		links: [],
		logo: Assets.HangiKredi,
		shortDescription: 'Leading the frontend team and managing frontend architecture.'
	},
	{
		slug: 'frontend-developer',
		company: 'HangiKredi',
		description: 'Developing and maintaining frontend features for the platform.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Istanbul, Turkey (Hybrid)',
		period: {
			from: new Date(2022, 11, 1)
		},
		skills: getSkills(
			'reactjs',
			'js',
			'html',
			'css',
			'ts',
			'reactive-programming',
			'.Net',
			'nextjs'
		),
		name: 'Frontend Developer',
		color: '#0000FF',
		links: [],
		logo: Assets.HangiKredi,
		shortDescription: 'Developing and maintaining frontend features for the platform.'
	},
	{
		slug: 'frontend-developer-netmera',
		company: 'Netmera',
		description: 'Creating engaging customer experiences through web and mobile applications.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Istanbul, Turkey',
		period: {
			from: new Date(2022, 3, 1),
			to: new Date(2022, 11, 1)
		},
		skills: getSkills(
			'js',
			'ts',
			'reactjs',
			'service-worker',
			'javascript',
			'angular',
			'react-native',
			'reactive-programming',
			'spring-framework',
			'nextjs'
		),
		name: 'Frontend Developer',
		color: '#FF5733',
		links: [],
		logo: Assets.Netmera,
		shortDescription: 'Creating engaging customer experiences through web and mobile applications.'
	},
	{
		slug: 'frontend-team-lead-rnd',
		company: 'RND E-ticaret',
		description: 'Leading the frontend team and managing projects.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Levent, Istanbul',
		period: {
			from: new Date(2021, 10, 1),
			to: new Date(2022, 5, 1)
		},
		skills: getSkills(
			'js',
			'.Net',
			'frontend-architecture',
			'team-leadership',
			'teamwork',
			'team-management'
		),
		name: 'Frontend Team Lead',
		color: '#FF5733',
		links: [],
		logo: Assets.RND,
		shortDescription: 'Leading the frontend team and managing projects.'
	},
	{
		slug: 'frontend-developer-rnd',
		company: 'RND E-ticaret',
		description: 'Developing frontend features and applications.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Levent, Istanbul',
		period: {
			from: new Date(2019, 0, 1),
			to: new Date(2021, 10, 1)
		},
		skills: getSkills('html', 'css', 'js', '.Net', '.Net', 'sass', 'Xamarin'),
		name: 'Frontend Developer',
		color: '#FF5733',
		links: [],
		logo: Assets.RND,
		shortDescription: 'Developing frontend features and applications.'
	},
	{
		slug: 'frontend-developer-beavers-workshop',
		company: 'Beavers Workshop',
		description: 'Developing various IoT and hobby projects.',
		contract: ContractType.Freelance,
		type: 'Software Development',
		location: 'Istanbul, Turkey',
		period: {
			from: new Date(2016, 0, 1),
			to: new Date(2020, 11, 1)
		},
		skills: getSkills(
			'ts',
			'js',
			'reactjs',
			'react-native',
			'nextjs',
			'gatsby',
			'remotion',
			'vuejs',
			'angular',
			'svelte',
			'vitejs',
			'biome'
		),
		name: 'Frontend Developer',
		color: '#FF5733',
		links: [],
		logo: Assets.BeaversWorkshop,
		shortDescription: 'Developing various IoT and hobby projects.'
	},
	{
		slug: 'frontend-developer-netuce',
		company: 'Netuce',
		description: 'Developing frontend features for the platform.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Esentepe, Istanbul',
		period: {
			from: new Date(2018, 6, 1),
			to: new Date(2018, 11, 1)
		},
		skills: getSkills('node', 'js', 'reactive-programming'),
		name: 'Frontend Developer',
		color: '#FF5733',
		links: [],
		logo: Assets.Netuce,
		shortDescription: 'Developing frontend features for the platform.'
	},
	{
		slug: 'jr-frontend-developer-literal-web-dizayn',
		company: 'Literal Web Dizayn',
		description: 'Developing and maintaining frontend features.',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Sirinevler, Istanbul',
		period: {
			from: new Date(2017, 5, 1),
			to: new Date(2018, 5, 1)
		},
		skills: getSkills('.Net', 'html', 'css', 'js', 'sass'),
		name: 'Jr. Frontend Developer',
		color: '#FF5733',
		links: [],
		logo: Assets.LiteralWebDizayn,
		shortDescription: 'Developing and maintaining frontend features.'
	},
	{
		slug: 'it-responsible-sonmez-home-modern-mobilya',
		company: 'Sönmez Home Modern Mobilya',
		description: 'Handling IT responsibilities and tasks.',
		contract: ContractType.PartTime,
		type: 'Information Technology',
		location: 'Istanbul, Turkey',
		period: {
			from: new Date(2016, 0, 1),
			to: new Date(2017, 3, 1)
		},
		skills: getSkills('computing'),
		name: 'Information Technology Responsible',
		color: '#FF5733',
		links: [],
		logo: Assets.SonmezHome,
		shortDescription: 'Handling IT responsibilities and tasks.'
	},
	{
		slug: 'it-staff-saloon-mobilya',
		company: 'Saloon Mobilya',
		description: 'Performing IT staff duties.',
		contract: ContractType.PartTime,
		type: 'Information Technology',
		location: 'Istanbul, Turkey',
		period: {
			from: new Date(2015, 5, 1),
			to: new Date(2015, 9, 1)
		},
		skills: getSkills('computing'),
		name: 'IT Staff',
		color: '#FF5733',
		links: [],
		logo: Assets.SaloonMobilya,
		shortDescription: 'Performing IT staff duties.'
	},
	{
		slug: 'intern-platin-group',
		company: 'PLATİN GROUP AŞ.',
		description: 'Internship as a web editor.',
		contract: ContractType.Internship,
		type: 'Web Editing',
		location: 'Istanbul, Turkey',
		period: {
			from: new Date(2013, 8, 1),
			to: new Date(2014, 5, 1)
		},
		skills: getSkills('web-editing'),
		name: 'Intern',
		color: '#FF5733',
		links: [],
		logo: Assets.PlatinGroup,
		shortDescription: 'Internship as a web editor.'
	}
];

export const title = 'Experience';
