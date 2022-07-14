-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(45) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `roomId` INTEGER NOT NULL AUTO_INCREMENT,
    `participantsNum` INTEGER NOT NULL,

    PRIMARY KEY (`roomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Follower` (
    `fromId` INTEGER NOT NULL,
    `toId` INTEGER NOT NULL,
    `permission` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`fromId`, `toId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_fromId_fkey` FOREIGN KEY (`fromId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follower` ADD CONSTRAINT `Follower_toId_fkey` FOREIGN KEY (`toId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
