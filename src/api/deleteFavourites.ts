import { Router, Response, Request } from 'express';
import httpStatus from 'http-status';

import { Database } from 'services';

const router = Router();

interface IFavouriteRequest extends Request {
  body: {
    userId: string;
    imgId: string;
  };
}

router.delete(
  '/delete/:userId/:imgId',
  async (request: IFavouriteRequest, response: Response): Promise<any> => {
    const { userId, imgId } = request.params;

    const user = await Database.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user)
      return response.status(httpStatus.BAD_REQUEST).json({
        errors: ['User not found']
      });

    try {
      const { count } = await Database.prisma.favourites.deleteMany({
        where: {
          imgId,
          userId: user.id
        }
      });

      if (count) {
        return response.status(httpStatus.OK).json({
          message: 'Item has been removed from favourites'
        });
      }

      return response.status(httpStatus.OK).json({
        message: 'Item was not found in the favourite list'
      });
    } catch (error) {
      return response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: [httpStatus[httpStatus.INTERNAL_SERVER_ERROR]]
      });
    }
  }
);

export default router;
