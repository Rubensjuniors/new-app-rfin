/*
  Warnings:

  - You are about to drop the column `bank` on the `payment_cards` table. All the data in the column will be lost.
  - Added the required column `lastDigits` to the `payment_cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_cards" DROP COLUMN "bank",
ADD COLUMN     "lastDigits" TEXT NOT NULL;
