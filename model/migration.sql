DROP TABLE if exists `users`;

CREATE TABLE `users`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`userName` varchar
(255) NOT NULL,
	`password` varchar
(255) NOT NULL,
	`dateOfCompletion` TIMESTAMP NOT NULL,
	PRIMARY KEY
(`id`)
);



