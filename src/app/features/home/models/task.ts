export interface Task {
  id: string;
  categoryId: string;
  label: string;
}

export const TaskList: Task[] = [
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
];
