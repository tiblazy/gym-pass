/*
  Warnings:

  - You are about to drop the column `gym_id` on the `check_ins` table. All the data in the column will be lost.
  - The primary key for the `gyms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `gyms` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_gym_id_fkey";

-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "gym_id",
ADD COLUMN     "gymId" INTEGER;

-- AlterTable
ALTER TABLE "gyms" DROP CONSTRAINT "gyms_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "gyms_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "gyms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
