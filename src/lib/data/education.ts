import Assets from './assets';
import type { Education } from '../types';

export const items: Array<Education> = [
	{
		degree: 'Associate Degree in Computer Programming',
		description: '',
		location: 'Turkey',
		logo: Assets.AyvansarsyUniversity,
		name: 'Istanbul Ayvansaray University',
		organization: 'Istanbul Ayvansaray University',
		period: { from: new Date(2016, 0, 1), to: new Date(2018, 5, 1) },
		shortDescription: '',
		slug: 'istanbul-ayvansaray-university',
		subjects: ['Software Engineering', 'General Computer Programming']
	},
	{
		degree: 'Bachelor Degree in Management Information Systems',
		description: '',
		location: 'Turkey',
		logo: Assets.AnadoluUniversity,
		name: 'Anadolu University',
		organization: 'Anadolu University',
		period: { from: new Date(2018, 0, 1), to: new Date(2021, 5, 1) },
		shortDescription: '',
		slug: 'anadolu-university',
		subjects: ['Management Information Systems']
	}
];

export const title = 'Education';
