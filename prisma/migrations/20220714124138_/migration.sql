/*
  Warnings:

  - Added the required column `roomName` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `roomName` VARCHAR(45) NOT NULL;
