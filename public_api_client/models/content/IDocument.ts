import { IContent } from './IContent';

export interface IDocument extends IContent {
    downloadUrl: string;
    fileName: string;
    documentContentType: string;
    fileSize: number;
    fileVersionId: number;
    originalImageUrl: string;
}

