import { IUserImages } from "./IUserImages";
import { IPhoneNumbers } from "./IPhoneNumbers";
import { ISimpleUser } from "./ISimpleUser";
import { ISimpleGroup } from "./ISimpleGroup";
import { ICustomField } from "./ICustomField";

export interface IUser {
    userId: number;
    contentId: number;
    url?: string;
    firstName?: string;
    lastName?: string;
    preferredName?: string;
    fullName?: string;
    salutation?: string;
    email?: string;
    username?: string;
    jobTitle?: string;
    timeZone?: string;
    defaultCulture?: string;
    anniversary?: string;
    anniversaryDateTime?: string;
    birthday?: string;
    birthdayDateTime?: string;
    createdDate?: Date;
    modifiedDate?: Date;
    phoneNumbers?: IPhoneNumbers;
    images?: IUserImages;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    manager?: ISimpleUser;
    customFields?: ICustomField[];
    groups?: ISimpleGroup[];
    isActive?: boolean;
    bio?: string;
}

