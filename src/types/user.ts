import { User } from "@/interfaces/user.interface";

export type UserWithoutGroupsAndTags = Omit<User, 'groups' | 'tags'>;
