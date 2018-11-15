DROP SCHEMA IF EXISTS `crm-berezino`;

CREATE SCHEMA `crm-berezino` DEFAULT CHARACTER SET cp1251;
USE `crm-berezino`;

-- Tables
CREATE TABLE `crm-berezino`.`Roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `crm-berezino`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password_hash` TEXT NOT NULL,
  `password_salt` TEXT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_role`
    FOREIGN KEY (`id`)
    REFERENCES `crm-berezino`.`Roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Inserts
INSERT INTO `crm-berezino`.`Roles`(name)
VALUES
    ('customer'),
    ('duty_admin'),
    ('senior_admin'),
    ('manager');

INSERT INTO `crm-berezino`.`Users`(username, password_hash, password_salt, role_id)
VALUES
    ('test_customer', '8928d5012380f80ac91d8f5b85e37f6fb2183321f680172a2081f60a20f63f932f84978b8e974de88f50454abc681ec12ecd0e26c66634adc91f98d7a8da6831', '6d12e6fe5e1d11d1f478674bd3662aa8626f7779', 1);

-- Procedures
DROP procedure IF EXISTS `get_user_by_username`;

DELIMITER $$
USE `crm-berezino`$$
CREATE PROCEDURE `get_user_by_username` (in _username VARCHAR(255))
BEGIN
SELECT
        Users.id,
        Users.username,
        Users.password_hash,
        Users.password_salt,
        Roles.name
    FROM Users
        NATURAL JOIN Roles
    WHERE Users.username = _username;
END$$

DELIMITER ;

