import { IImageCropData } from './IImageCropData';
import { HeaderBackgroundType } from './HeaderBackgroundType';

export interface IFeaturedImage {
    contentId: number;
    title: string;
    inheritsFromParent: boolean;
    url: string;
    imageCropData: IImageCropData[];
    startColor: string;
    endColor: string;
    headerBackgroundType: HeaderBackgroundType;
}
