# P7-groupomania
groupomani's social network
clone the repo
install the all dependencies

# Create your .env files with the needed variables:

DB_HOST = your data base host
DB_USER = your data base user
DB_PASSWORD = your password (use single quotes if you have special characters)
DATA_BASE = groupomania_social (or your data base
ACCESS_TOKEN_SECRET = jwt web token secret to encode / verify the token

# Create the database and the tables:
CREATE TABLE `articles` (
  `user_id` varchar(100) NOT NULL,
  `title` varchar(45) NOT NULL,
  `article` longtext NOT NULL,
  `tags` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `date` varchar(45) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` varchar(45) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `prenom` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `departement` varchar(60) NOT NULL,
  `role_id` int DEFAULT '2',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_UNIQUE` (`role`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4220 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
