/*
  Warnings:

  - A unique constraint covering the columns `[totp_key]` on the table `members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "members_totp_key_key" ON "members"("totp_key");
