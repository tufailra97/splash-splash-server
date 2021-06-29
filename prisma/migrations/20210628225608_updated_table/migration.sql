/*
  Warnings:

  - You are about to drop the column `full_img` on the `favourites` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `favourites` table. All the data in the column will be lost.
  - You are about to drop the column `raw_url` on the `favourites` table. All the data in the column will be lost.
  - You are about to drop the column `regualar_img` on the `favourites` table. All the data in the column will be lost.
  - You are about to drop the column `small_img` on the `favourites` table. All the data in the column will be lost.
  - You are about to drop the column `thum` on the `favourites` table. All the data in the column will be lost.
  - Added the required column `img_id` to the `favourites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "favourites" DROP COLUMN "full_img",
DROP COLUMN "name",
DROP COLUMN "raw_url",
DROP COLUMN "regualar_img",
DROP COLUMN "small_img",
DROP COLUMN "thum",
ADD COLUMN     "img_full" TEXT,
ADD COLUMN     "img_id" TEXT NOT NULL,
ADD COLUMN     "img_raw" TEXT,
ADD COLUMN     "img_regular" TEXT,
ADD COLUMN     "img_sml" TEXT;
