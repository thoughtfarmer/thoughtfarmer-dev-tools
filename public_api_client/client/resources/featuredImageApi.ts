import { IApiResponse, ApiHelper } from '../apiHelper';
import { ImageCropType } from '../../models/featuredImage/ImageCropType';
import { IFeaturedImage } from '../../models/featuredImage/IFeaturedImage';
import { buildQueryString } from '../../helpers/utility';


export interface IFeaturedImageRequest {
    imageCropType: ImageCropType;
    contentIds: number[];
    fallBackToParent?: boolean;
    size?: number;
}

export default class FeaturedImageApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public getFeaturedImages(request?: IFeaturedImageRequest, ignoreErrors?: boolean): Promise<IApiResponse<IFeaturedImage[]>> {
        const queryString = buildQueryString(request);
        return this.apiHelper.newApiRequest<IFeaturedImage[]>({
            url: `featuredimage?${queryString}`,
            ignoreErrors
        });
    }

    public getFeaturedImage(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<IFeaturedImage>> {
        return this.apiHelper.newApiRequest<IFeaturedImage>({
            url: `featuredimage/${contentId}`,
            ignoreErrors
        });
    }

}
