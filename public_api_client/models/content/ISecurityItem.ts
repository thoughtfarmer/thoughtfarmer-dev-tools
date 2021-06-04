export interface ISecurityItem {
    name?: string;
    label?: string;
    isLocked?: boolean;
    isOwner?: boolean;
    isProfileOwner?: boolean;
    isInheritedOwner?: boolean;
    isSecurityProfile?: boolean;
    isLinkedToGroup?: boolean;
    isGuest?: boolean;
    itemId?: number;
    securityLevel?: number;
}
