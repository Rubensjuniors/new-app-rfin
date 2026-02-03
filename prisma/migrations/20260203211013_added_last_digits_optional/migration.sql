/*
  Warnings:

  - You are about to drop the column `lastDigits` on the `payment_cards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payment_cards" DROP COLUMN "lastDigits",
ADD COLUMN     "last_digits" TEXT;
