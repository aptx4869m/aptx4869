import { GroupItem } from './group-item'; 
export class GroupTemplate {
  name: string;
  open: boolean;
  image: string;
  link: string;
  items: GroupItem[];
  tags: string[]; // include material, type, characters, cp
}
