import { ISecurityItem } from './ISecurityItem';

export interface IContentPermissions {
    contentId?: number;
    ownerId?: number;
    inheritsPageSecurity?: boolean;
    parentPageTitle?: string;
    items?: ISecurityItem[];
}
