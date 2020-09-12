/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.5.5-MariaDB : Database - db_online_test
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_online_test` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `db_online_test`;

/*Table structure for table `tbl_account` */

CREATE TABLE `tbl_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` bit(1) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_account` */

insert  into `tbl_account`(`id`,`created_by`,`created_date`,`modified_by`,`modified_date`,`address`,`birthday`,`email`,`full_name`,`gender`,`password`,`phone`,`role_id`,`username`) values (1,NULL,NULL,NULL,NULL,'QUYNHON','1998-05-26 17:00:00.000000','phuoc27598@gmail.com','Nguy?n H?u Ph??c','','123456','964413065',1,'admin'),(2,NULL,NULL,NULL,NULL,'KonTum','1998-05-26 17:00:00.000000','nguyenkttk@gmail.com','Tr?n Trung Nguyên','','123456','0366655214',0,'3951050112'),(3,NULL,NULL,NULL,NULL,'GiaiLai','1998-05-26 17:00:00.000000','hoangnh@gmail.com','Nguy?n Ng?c Hoàng','','123456','0366698554',0,'3951050115'),(4,NULL,NULL,NULL,NULL,'DakLak','1998-05-26 17:00:00.000000','cuongvv@gmail.com','Võ Vi?t C??ng','','123456','0256589451',0,'395105001'),(5,NULL,NULL,NULL,NULL,'?À N?NG','1998-05-26 17:00:00.000000','nghiabv@gmail.com','Bùi V?n Ngh?a','','123456','0389745213',0,'395105002'),(6,NULL,NULL,NULL,NULL,'PHÚ YÊN','1998-05-26 17:00:00.000000','linhvh@gmail.com','Lê V?n Hoài Linh','','123456','0369563215',0,'395105003'),(7,NULL,NULL,NULL,NULL,'C?N TH?','1998-05-26 17:00:00.000000','phunt@gmail.com','Tr?n Ng?c phú','','123456','0352691112',0,'3951050093');

/*Table structure for table `tbl_answer` */

CREATE TABLE `tbl_answer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `answer_code` varchar(255) DEFAULT NULL,
  `answer_name` varchar(255) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_answer` */

/*Table structure for table `tbl_chosen_question` */

CREATE TABLE `tbl_chosen_question` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `competition_id` bigint(20) DEFAULT NULL,
  `question_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_chosen_question` */

/*Table structure for table `tbl_competition` */

CREATE TABLE `tbl_competition` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `competition_name` varchar(255) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `time_end` datetime(6) DEFAULT NULL,
  `time_start` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_competition` */

insert  into `tbl_competition`(`id`,`created_by`,`created_date`,`modified_by`,`modified_date`,`competition_name`,`detail`,`time_end`,`time_start`) values (1,'ADMIN','2020-09-12 01:47:50.000000','ADMIN','2020-09-12 01:47:50.000000','English Hope','This is competition for those dumbs',NULL,NULL),(2,'ADMIN','2020-09-12 02:01:26.000000','ADMIN','2020-09-12 02:01:26.000000','virtual technology','Virtual technology for smart people',NULL,NULL);

/*Table structure for table `tbl_question` */

CREATE TABLE `tbl_question` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `competition_id` bigint(20) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `question_name` varchar(255) DEFAULT NULL,
  `result1` varchar(255) DEFAULT NULL,
  `subject_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_question` */

insert  into `tbl_question`(`id`,`created_by`,`created_date`,`modified_by`,`modified_date`,`competition_id`,`level`,`question_name`,`result1`,`subject_id`) values (1,NULL,NULL,NULL,NULL,1,1,'Who are you','A',1),(2,NULL,NULL,NULL,NULL,1,1,'What your name','B',1),(3,NULL,NULL,NULL,NULL,2,2,'What is this','C',2);

/*Table structure for table `tbl_result` */

CREATE TABLE `tbl_result` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `code_test` int(11) DEFAULT NULL,
  `list_answer` varchar(255) DEFAULT NULL,
  `list_question` varchar(255) DEFAULT NULL,
  `score` int(11) NOT NULL,
  `time_end` datetime(6) DEFAULT NULL,
  `time_start` datetime(6) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_result` */

/*Table structure for table `tbl_role` */

CREATE TABLE `tbl_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_role` */

/*Table structure for table `tbl_subject` */

CREATE TABLE `tbl_subject` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `sunject_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_subject` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
