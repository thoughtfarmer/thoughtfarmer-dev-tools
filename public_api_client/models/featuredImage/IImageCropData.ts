import { ImageCropType } from './ImageCropType';

export interface IImageCropData {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    type: ImageCropType;
    url: string;
}
