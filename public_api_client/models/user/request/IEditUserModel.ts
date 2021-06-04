import { BirthdayDisplay } from '../BirthdayDisplay';

export interface IEditUserModel {
    firstName?: string;
    lastName?: string;
    email?: string;
    salutation?: string;
    preferredName?: string;
    profileText?: string;
    jobTitle?: string;
    phoneTel?: string;
    phoneMobile?: string;
    phoneFax?: string;
    timeZone?: string;
    defaultCulture?: string;
    birthday?: string;
    birthdayDisplay?: BirthdayDisplay;
    anniversary?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
}