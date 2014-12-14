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
-- Table structure for table `authorities`
--

DROP TABLE IF EXISTS `authorities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authorities` (
  `username` varchar(50) NOT NULL,
  `authority` varchar(50) NOT NULL DEFAULT 'ROLE_USER',
  `authorities_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`authorities_id`),
  KEY `fk_authorities_users_idx` (`username`),
  CONSTRAINT `fk_authorities_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorities`
--

LOCK TABLES `authorities` WRITE;
/*!40000 ALTER TABLE `authorities` DISABLE KEYS */;
INSERT INTO `authorities` VALUES ('Admin','ROLE_ADMIN',1),('Kyle','ROLE_ADMIN',2);
/*!40000 ALTER TABLE `authorities` ENABLE KEYS */;
UNLOCK TABLES;

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
  `client_rate` decimal(10,2) DEFAULT NULL,
  `client_per_day` tinyint(1) DEFAULT NULL,
  `client_per_hour` tinyint(1) DEFAULT NULL,
  `client_set_rate` tinyint(1) DEFAULT NULL,
  `client_travel_rate` decimal(10,2) DEFAULT NULL,
  `client_mileage_rate` decimal(10,2) DEFAULT NULL,
  `client_timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `client_user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id_client_profile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_profile`
--

LOCK TABLES `client_profile` WRITE;
/*!40000 ALTER TABLE `client_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '0',
  `user_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Admin','63ec243649e8bbb14bf8f06a76b4b51c1b042c199baf64f150f4767bbe3adfb02a61b55a6c2439979fcf05bce9a4543fc6dddcb3310b193b9c5ad772b71e1b8a',1,'2014-12-14 13:52:59'),('Kyle','6b2cf249fcbb06c2270a98a50d3b1e0853d68bbe932c41356062e9fe74261a7a9f9283f18da3bc0467c43d0b3d01cacfa5a2312e5db2e7b7850781980599179e',1,'2014-12-14 13:53:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worklog`
--

DROP TABLE IF EXISTS `worklog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `worklog` (
  `worklog_id` int(11) NOT NULL AUTO_INCREMENT,
  `worklog_startdate` varchar(20) DEFAULT NULL,
  `worklog_enddate` varchar(20) DEFAULT NULL,
  `worklog_client` varchar(255) DEFAULT NULL,
  `worklog_username` varchar(255) DEFAULT NULL,
  `worklog_hours` varchar(20) DEFAULT NULL,
  `worklog_travel` tinyint(1) DEFAULT NULL,
  `worklog_mileage` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`worklog_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worklog`
--

LOCK TABLES `worklog` WRITE;
/*!40000 ALTER TABLE `worklog` DISABLE KEYS */;
/*!40000 ALTER TABLE `worklog` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-12-14 13:55:01
