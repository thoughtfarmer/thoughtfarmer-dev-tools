import { INewsFeedItem } from './INewsFeedItem';

export interface INewsFeed {
    items?: INewsFeedItem[];
    totalItems?: number;
}