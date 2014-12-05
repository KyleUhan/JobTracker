CREATE DATABASE  IF NOT EXISTS `job_tracker` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `job_tracker`;
-- MySQL dump 10.13  Distrib 5.6.18, for Win32 (x86)
--
-- Host: localhost    Database: job_tracker
-- ------------------------------------------------------
-- Server version	5.6.18-enterprise-commercial-advanced

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client_profile`
--

DROP TABLE IF EXISTS `client_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client_profile` (
  `id_client_profile` int(11) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) DEFAULT NULL,
  `client_contact_name` varchar(255) DEFAULT NULL,
  `client_contact_number` varchar(35) DEFAULT NULL,
  `client_contact_email` varchar(100) DEFAULT NULL,
  `client_per_day_amount` decimal(10,2) DEFAULT NULL,
  `client_mileage_allowed` decimal(10,2) DEFAULT NULL,
  `client_timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `client_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_client_profile`),
  UNIQUE KEY `client_name_UNIQUE` (`client_name`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_profile`
--

LOCK TABLES `client_profile` WRITE;
/*!40000 ALTER TABLE `client_profile` DISABLE KEYS */;
INSERT INTO `client_profile` VALUES (1,'Kohls',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'Sears',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'Lands End',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'Teen Vogue',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'KW Shoot',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(65,'UWSP',NULL,NULL,NULL,NULL,NULL,'2014-11-19 01:36:07',NULL),(70,'Adam',NULL,NULL,NULL,NULL,NULL,'2014-11-19 20:47:46',NULL),(71,'WCTC',NULL,NULL,NULL,NULL,NULL,'2014-11-19 21:25:19',NULL),(72,NULL,NULL,NULL,NULL,NULL,NULL,'2014-11-20 13:15:18',NULL);
/*!40000 ALTER TABLE `client_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_account` (
  `user_account_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_account_name` varchar(100) NOT NULL,
  `user_account_password` varchar(100) DEFAULT NULL,
  `user_account_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`user_account_id`),
  UNIQUE KEY `user_account_name_UNIQUE` (`user_account_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account`
--

LOCK TABLES `user_account` WRITE;
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
INSERT INTO `user_account` VALUES (1,'kyle@email.com','password',NULL),(2,'guest','password',NULL);
/*!40000 ALTER TABLE `user_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-11-20 13:19:17
