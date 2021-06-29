/*
  Warnings:

  - You are about to drop the column `img_url` on the `favourites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "favourites" DROP COLUMN "img_url",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "full_img" TEXT,
ADD COLUMN     "raw_url" TEXT,
ADD COLUMN     "regualar_img" TEXT,
ADD COLUMN     "small_img" TEXT,
ADD COLUMN     "thum" TEXT;
