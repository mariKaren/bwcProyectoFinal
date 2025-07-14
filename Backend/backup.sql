-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: library
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `birth_city` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (2,'Elyse Lueilwitz','Northern Mariana Islands','1973-12-16','North Jackson','Magni voluptatibus ea velit voluptas rerum officiis qui vel. Suscipit repellendus ab inventore. Ea voluptate qui eum sed dicta dolorem veniam.','2025-04-16 18:25:30','2025-04-16 18:25:30'),(4,'Horacio Padberg','Djibouti','1972-03-20','Matteoshire','Itaque inventore sed magnam et maiores. Est eius vero accusantium eius eum. Dolorem et nemo dolor et. Aut et soluta ipsum est quia ipsum.','2025-04-16 18:25:30','2025-04-16 18:25:30'),(5,'Judge Mraz','Saint Vincent and the Grenadines','1997-10-24','Omariville','Voluptatibus voluptas est dolores distinctio minima. Dolorem ut et facilis non cum libero. Tempore quod distinctio maxime laboriosam dolores tempore maiores. Non id rerum optio fugit dolorum.','2025-04-16 18:25:30','2025-04-16 18:25:30'),(12,'Gloria Fadel','Argentina','1991-05-15','East Dustin','Assumenda aut cum nemo deleniti. Quia nihil ut id ab numquam sed illum. Suscipit et explicabo dolorem commodi corporis at.','2025-04-16 18:25:30','2025-04-16 18:25:30'),(13,'Janelle Ondricka DDS','Slovenia','1989-08-02','West Alta','Deleniti dolorum est id laboriosam nisi ab. Reiciendis quos voluptatum molestias et qui sed est aut. Aut autem perferendis aut ea eligendi magni tenetur.','2025-04-16 18:25:30','2025-04-16 18:25:30'),(14,'Chaim Hirthe','Montenegro','1987-05-05','East Cheyanne','Ad animi voluptate id sed totam accusantium mollitia. Consequatur dicta consectetur provident unde dolor quod. Sed corporis et eos iusto vel natus corrupti.','2025-04-16 18:25:30','2025-04-16 18:25:30'),(15,'Jennings Hickle','Mexico','1988-11-17','Haskellburgh','Voluptatem nostrum tempora et. Non commodi ex et magnam similique quo in. Quis vel assumenda id et voluptas omnis voluptatibus. Esse aut illo omnis maiores magni quia.','2025-04-16 18:25:30','2025-04-16 18:25:30'),(20,'Jose Carlos','Argentina','1970-01-01','Lujan','Famous writer','2025-04-22 11:40:33','2025-04-22 11:40:33'),(26,'Jorge Luis Borges','Argentina','1899-08-24','Buenos Aires','Borges fue uno de los escritores más importantes del siglo XX. Maestro del cuento corto, la poesía y el ensayo, su obra se caracteriza por su erudición, referencias filosóficas y juegos con el infinito, los espejos, los laberintos y la identidad. Entre sus obras más conocidas se encuentran Ficciones y El Aleph.','2025-07-13 19:49:24','2025-07-13 19:49:24'),(27,'Gabriel García Márquez','Colombiana','1927-03-06','Aracataca, Colombia','Ganador del Premio Nobel de Literatura en 1982, es uno de los máximos exponentes del realismo mágico. Su novela más famosa, Cien años de soledad, es una de las más influyentes en la literatura en español. También escribió El amor en los tiempos del cólera y Crónica de una muerte anunciada.','2025-07-13 19:55:04','2025-07-13 19:55:04'),(28,'Mario Vargas Llosa','Peruana','1936-03-28','Arequipa, Perú','Premio Nobel de Literatura en 2010, es uno de los escritores más destacados del llamado \"Boom latinoamericano\". Sus novelas abordan temas políticos, históricos y sociales. Algunas de sus obras más conocidas son La ciudad y los perros, La casa verde y Conversación en La Catedral.','2025-07-13 19:55:53','2025-07-13 19:55:53'),(29,'Julio Cortázar','Argentina','1914-08-26','Ixelles, Bruselas','Considerado uno de los grandes innovadores de la narrativa contemporánea, especialmente del cuento. Su novela Rayuela es una obra clave del experimentalismo literario. Su estilo rompe estructuras tradicionales y mezcla lo fantástico con lo cotidiano.','2025-07-13 19:56:47','2025-07-13 19:56:47'),(30,'Isabel Allende','Chilena (nacida en Perú)','1942-08-02','Lima, Perú','Escritora chilena con gran proyección internacional. Su obra está influida por el realismo mágico y la historia latinoamericana. Su novela más famosa, La casa de los espíritus, ha sido traducida a numerosos idiomas. Aborda temas de identidad, memoria, feminismo y exilio.','2025-07-13 19:57:50','2025-07-13 19:57:50');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author_id` bigint(20) unsigned NOT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `publication_date` date NOT NULL,
  `description` text DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `books_author_id_foreign` (`author_id`),
  CONSTRAINT `books_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (5,'El general en su laberinto',27,'novela','1989-01-01','Recreación ficcional de los últimos días de Simón Bolívar, con un tono melancólico y humano del libertador.','covers/7rm3TpddbYXKWj0kfXYiqdAHavMkZqp3zU5yWZUZ.jpg','2025-04-16 18:25:30','2025-07-13 20:03:12'),(6,'Doce cuentos peregrinos',27,'cuento','1992-01-01','Colección de relatos escritos a lo largo de casi dos décadas, centrados en personajes latinoamericanos en Europa.','covers/wpIuTBpyfxIz3565hsAV7Rdulvkpma9TrdYVptqH.jpg','2025-04-16 18:25:30','2025-07-14 09:57:06'),(22,'Minas',2,'ficcion','2025-07-02',NULL,'covers/3OQPdV8LTYr1mc457zoDKEZcl6U4DEhtq7uHGULC.png','2025-07-13 07:39:40','2025-07-13 07:39:40'),(23,'El Aleph',26,'ficcion','1949-11-01','Una colección de cuentos que exploran conceptos como el infinito, el tiempo y la realidad, destacando el cuento homónimo donde un punto del espacio contiene todos los lugares del universo.','covers/qdMRWueo2ENb4h8VBK0SCDrKu12skvIamIi11BHh.webp','2025-07-13 19:50:24','2025-07-13 19:50:47'),(24,'Ficciones',26,'misterio','1944-03-20','Recopilación de cuentos que juegan con la metaficción, el laberinto, los espejos y los textos apócrifos. Una de sus obras más influyentes.','covers/cQ56eu7ar6svElxx8X3GFitwZXAeCTzuOPVX1JCG.jpg','2025-07-13 19:51:37','2025-07-13 19:51:37'),(25,'El Hacedor',26,'drama','1960-02-01','Mezcla de relatos breves, ensayos y poemas. Refleja su madurez literaria y su reflexión sobre el arte y la eternidad.','covers/NxhjmU9ULx5OscckZ0eImAwLLt17IFu2D0R8uaZl.webp','2025-07-13 19:52:45','2025-07-13 19:52:45'),(26,'La muerte y la brújula',26,'misterio','1942-02-01','Cuento policial que trasciende el género, en el que un detective analiza asesinatos en un contexto lleno de simbolismo y lógica esotérica.','covers/YR4BtAScKVNylCjcoNRkKd2h2VnC6iVQxZle6d7a.jpg','2025-07-13 19:53:26','2025-07-13 19:53:26'),(27,'El libro de arena',26,'fantasia','1975-03-01','Última colección de cuentos publicada en vida. El cuento principal describe un libro infinito, imposible de leer completamente.','covers/1rawlxSUE91rHqTbDU5THY6atEroxf6BGRQcbIzD.jpg','2025-07-13 19:54:10','2025-07-13 19:54:10'),(28,'Cien años de soledad',27,'novela','1967-01-01','Narra la historia de la familia Buendía en el mítico pueblo de Macondo. Es considerada una de las obras más importantes de la literatura en español.','covers/skzgHyEMIgnxZpH4mK8P34U2e1faMWx6j7ctFiaT.jpg','2025-07-13 19:59:33','2025-07-13 19:59:33'),(29,'El amor en los tiempos del cólera',27,'novela','1985-01-01','Una historia de amor persistente entre Fermina Daza y Florentino Ariza, que espera más de cincuenta años para consumarse.','covers/jJ944IFGa1jjLQKyOVAZpU2HYPLqUoZ1afNQugv5.webp','2025-07-13 20:00:16','2025-07-13 20:00:16'),(30,'Crónica de una muerte anunciada',27,'novela','1981-01-01','Relato basado en hechos reales donde se cuenta un asesinato anunciado y cómo toda una comunidad falla en evitarlo.','covers/SksRKtOKWfU5oRhoOROrN6zTHz2bUKXqW1NwpTiW.jpg','2025-07-13 20:01:00','2025-07-13 20:01:28'),(31,'El general en su laberinto',27,'novela','1989-01-01','Recreación ficcional de los últimos días de Simón Bolívar, con un tono melancólico y humano del libertador.','covers/6zLxW8CwHCPuu2MJULET6ieauxDVWZ5O2R1wGC8z.jpg','2025-07-14 09:38:03','2025-07-14 09:38:03'),(32,'Doce cuentos peregrinos',27,'cuento','1992-01-01','Colección de relatos escritos a lo largo de casi dos décadas, centrados en personajes latinoamericanos en Europa.','covers/qotPMRqeV1JMYoS0IqqubJH2YCZ1LsKNdYmErhwe.jpg','2025-07-14 09:40:04','2025-07-14 09:40:04'),(33,'La ciudad y los perros',28,'novela','1963-01-01','Crítica a la educación militarizada en el Perú, ambientada en un colegio militar de Lima. Fue su primera novela y lo lanzó a la fama.','covers/lIJjHfx25K934Cx7vTrR5saFhI3UloUfpxrnqV1I.jpg','2025-07-14 09:40:58','2025-07-14 09:40:58'),(34,'La casa verde',28,'novela','1966-01-01','Historia compleja con múltiples líneas temporales, entrelazadas alrededor de un prostíbulo en la selva peruana.','covers/VusjyVHBZy2wIZdmsfiegom3sIeYjf3RezLpN9sw.jpg','2025-07-14 09:41:37','2025-07-14 09:41:37'),(35,'Conversación en La Catedral',28,'novela','1969-01-01','A través del diálogo entre dos personajes, se deconstruye la historia del Perú durante la dictadura de Odría.','covers/Nvf3tpzrYlYOY6k5mVfsxa6pzBl1aqcIbaBRMkAv.jpg','2025-07-14 09:42:15','2025-07-14 11:42:16'),(36,'La fiesta del chivo',28,'novela','2000-01-01','Relato sobre los últimos días del dictador dominicano Rafael Trujillo. Es considerada una de sus novelas más ambiciosas.','covers/iRMHKdlCD7iJrNz3VkqjGHBg8fUmRPGvNyQzytJx.jpg','2025-07-14 09:42:49','2025-07-14 11:42:38'),(37,'Travesuras de la niña mala',28,'novela','2006-01-01','Historia de amor entre un traductor peruano y una mujer enigmática que aparece y desaparece de su vida durante décadas.','covers/zp2LjoDNb9L5ANapAFDHaKqd7HDJuTllP7fSAvji.jpg','2025-07-14 09:43:51','2025-07-14 09:43:51'),(38,'1.	Rayuela',29,'novela','1963-01-02','Novela innovadora que puede leerse en múltiples órdenes. Explora el amor, la filosofía y el absurdo de la vida.','covers/KC0WjXdRtQwVVDcCw6sROitBCD872kZqG4B8SMVR.jpg','2025-07-14 09:45:10','2025-07-14 09:45:10'),(39,'Bestiario',29,'cuento','1951-01-01','Primera colección de cuentos publicada por Cortázar. Reúne historias donde lo cotidiano se transforma en inquietante.','covers/1avBYNCrqPeOGgo53k2b8GFAJRWqAqYIdgNcuyjl.jpg','2025-07-14 09:46:04','2025-07-14 09:46:04'),(40,'Las armas secretas',29,'cuento','1959-01-01','Contiene algunos de sus cuentos más famosos, como El perseguidor y Las babas del diablo, precursor del cine Blow-Up.','covers/AXALvltjsLY8il3m435amugsOr43EKC3yqjVQC9X.webp','2025-07-14 09:47:07','2025-07-14 09:47:07'),(41,'La casa de los espíritus',30,'novela','1982-01-01','Saga familiar que entrelaza lo político y lo espiritual en la historia de Chile a través de la familia Trueba.','covers/hXFB7jgt6q7Tk3h2BPdKWo3MOJXwC991vhtiEHxu.jpg','2025-07-14 09:47:50','2025-07-14 09:47:50'),(42,'Eva Luna',30,'novela','1987-01-01','Historia de una narradora nata que, a través de sus cuentos, transforma el mundo que la rodea.','covers/yU4K2KfNvt3ELEEgYlbvlWxJwZI7kK0SKjT3u3Ac.jpg','2025-07-14 09:53:08','2025-07-14 09:53:08'),(43,'Paula',30,'memorias','1995-01-01','Obra autobiográfica escrita mientras su hija estaba en coma. Reflexiona sobre la vida, la muerte y la maternidad.','covers/AvPBA0P6cyatXcWNxvfpfysFw7kY60lq1o8sznVM.jpg','2025-07-14 09:53:46','2025-07-14 09:53:46'),(44,'Inés del alma mía',30,'novela','2006-01-01','Narra la vida de Inés Suárez, una mujer española que participó en la conquista de Chile.','covers/7zlFYF5QDAoono9tv6TtpjqUu4en1qzOOmo4upFu.webp','2025-07-14 09:54:59','2025-07-14 09:54:59'),(45,'La isla bajo el mar',30,'novela','2009-01-01','Historia de Zarité, una esclava en la colonia francesa de Saint-Domingue (actual Haití), durante la revolución haitiana.','covers/OiVWf6OR7Qc2SY1RVQASPdyuXzKsDfTQbUOOS8dD.webp','2025-07-14 09:55:44','2025-07-14 09:55:44');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `featured_books`
--

DROP TABLE IF EXISTS `featured_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `featured_books` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint(20) unsigned NOT NULL,
  `position` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `featured_books_book_id_foreign` (`book_id`),
  CONSTRAINT `featured_books_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `featured_books`
--

LOCK TABLES `featured_books` WRITE;
/*!40000 ALTER TABLE `featured_books` DISABLE KEYS */;
INSERT INTO `featured_books` VALUES (6,31,1,NULL,NULL),(7,26,2,NULL,NULL),(8,42,3,NULL,NULL),(9,23,4,NULL,NULL),(10,44,5,NULL,NULL),(11,30,6,NULL,NULL),(12,34,7,NULL,NULL),(13,28,8,NULL,NULL);
/*!40000 ALTER TABLE `featured_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'2025_04_16_192013_create_personal_access_tokens_table',1),(3,'2025_04_16_200002_create_authors_table',2),(4,'2025_04_16_200017_create_books_table',2),(5,'2025_04_20_085031_add_description_to_books_table',3),(6,'2025_06_21_091149_create_reviews_table',4),(7,'2025_06_21_101558_create_wishlists_table',5),(8,'2025_07_10_132015_create_featured_books_table',6),(9,'2025_07_13_091501_add_cover_to_books_table',7);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (125,'App\\Models\\User',1,'auth_token','69ff53409bea11ad168865ff36ae5d8139265f851ceb85d1a5a5ab4d5bf02aa6','[\"*\"]','2025-07-14 10:37:44',NULL,'2025-07-14 09:37:01','2025-07-14 10:37:44'),(127,'App\\Models\\User',2,'auth_token','393627b71d1a252f12c145fe9148d42d4060aba5acceff27a47f8f6e0eaea7a4','[\"*\"]','2025-07-14 14:35:15',NULL,'2025-07-14 14:33:25','2025-07-14 14:35:15');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `book_id` bigint(20) unsigned NOT NULL,
  `description` text NOT NULL,
  `rating` tinyint(3) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reviews_user_id_book_id_unique` (`user_id`,`book_id`),
  KEY `reviews_book_id_foreign` (`book_id`),
  CONSTRAINT `reviews_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (18,2,5,'Gran libro',5,'2025-07-14 14:33:48','2025-07-14 14:33:48');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Karen','karen@example.com','$2y$12$gjfNgmgUQms8tr.lDxN3aulfe0wwq2De6XTD0S9EZqulZSyTGPNgu','admin','2025-04-16 18:25:30','2025-04-16 18:25:30'),(2,'Juan','Juan@example.com','$2y$12$J6jUbpw/DrdN274qBM6k7eIF2WKdhVX39WUPcAbNCocj80c5HbGSW','user','2025-04-16 18:25:30','2025-04-16 18:25:30');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wishlists` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `book_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wishlists_user_id_book_id_unique` (`user_id`,`book_id`),
  KEY `wishlists_book_id_foreign` (`book_id`),
  CONSTRAINT `wishlists_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wishlists_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
INSERT INTO `wishlists` VALUES (22,2,5,'2025-07-14 14:33:35','2025-07-14 14:33:35'),(23,2,6,'2025-07-14 14:34:00','2025-07-14 14:34:00'),(24,2,34,'2025-07-14 14:34:06','2025-07-14 14:34:06');
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-14 18:37:52
