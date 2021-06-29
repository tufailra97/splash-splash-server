import { Router, Response, Request } from 'express';
import httpStatus from 'http-status';

import { Database } from 'services';

const router = Router();

interface IFavouriteRequest extends Request {
  body: {
    userId: string;
    imgId: string;
    urls: {
      raw?: string;
      sml?: string;
      full?: string;
      thumb?: string;
      regular?: string;
    };
    description?: string;
    author: string;
  };
}

router.post(
  '/add',
  async (request: IFavouriteRequest, response: Response): Promise<any> => {
    const { userId, imgId, urls, description } = request.body;

    const user = await Database.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user)
      return response.status(httpStatus.BAD_REQUEST).json({
        errors: ['User not found']
      });

    const favExist = await Database.prisma.favourites.findFirst({
      where: {
        imgId,
        userId
      }
    });

    if (favExist)
      return response.status(httpStatus.BAD_REQUEST).json({
        errors: ['Item already exist in the favourite list']
      });

    try {
      await Database.prisma.favourites.create({
        data: {
          imgId,
          description,
          userId: user.id,
          imgRaw: urls.raw,
          imgSml: urls.sml,
          imgFull: urls.full,
          imgRegular: urls.regular
        }
      });

      return response.status(httpStatus.OK).json({
        message: 'Item has been added to favourites'
      });
    } catch (error) {
      return response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: [httpStatus[httpStatus.INTERNAL_SERVER_ERROR]]
      });
    }
  }
);

export default router;
