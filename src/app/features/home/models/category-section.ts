import { Task } from './task';

export interface CategorySection {
  id: string;
  label: string;
  tasks: Task[];
  customField: any;
}

export const CategorySectionList: CategorySection[] = [
  {
    id: 'personal_information_id',
    label: 'Personal Information',
    tasks: [
      {
        id: 'about_me_id',
        categoryId: 'personal_information_id',
        label: 'About Me',
      },
      {
        id: 'emergency_contacts_id',
        categoryId: 'personal_information_id',
        label: 'Emergency Contacts',
      },
    ],
    customField: {},
  },
  {
    id: 'qualification_id',
    label: 'Qualification',
    tasks: [
      {
        id: 'academic_details_id',
        categoryId: 'qualification_id',
        label: 'Academic Details',
      },
      {
        id: 'professional_experience_id',
        categoryId: 'qualification_id',
        label: 'Professional Experience',
      },
    ],
    customField: {},
  },
];
