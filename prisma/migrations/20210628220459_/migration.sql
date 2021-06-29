/*
  Warnings:

  - You are about to drop the column `dateCreated` on the `favourites` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `favourites` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `favourites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "favourites" DROP CONSTRAINT "favourites_userId_fkey";

-- AlterTable
ALTER TABLE "favourites" DROP COLUMN "dateCreated",
DROP COLUMN "userId",
ADD COLUMN     "date_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "favourites" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
