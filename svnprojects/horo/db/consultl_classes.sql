-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jan 17, 2016 at 09:12 AM
-- Server version: 5.6.28
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `consultl_classes`
--

-- --------------------------------------------------------

--
-- Table structure for table `access_tokens`
--

CREATE TABLE IF NOT EXISTS `access_tokens` (
  `token_id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`token_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE IF NOT EXISTS `locations` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `zip` varchar(50) DEFAULT NULL,
  `place_id` varchar(255) DEFAULT NULL,
  `county` varchar(50) DEFAULT NULL,
  `formatted_addr` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  KEY `place_id` (`place_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`location_id`, `latitude`, `longitude`, `country`, `state`, `city`, `zip`, `place_id`, `county`, `formatted_addr`) VALUES
(1, 37.797428131103516, -121.21604919433594, 'United States', 'CA', 'Manteca', '', 'ChIJCUWMJENAkIARjMxOe6Wp4p0', 'San Joaquin County', 'Manteca, CA, United States'),
(2, 37.3382082, -121.88632860000001, 'United States', 'CA', 'San Jose', '', 'ChIJ9T_5iuTKj4ARe3GfygqMnbk', 'Santa Clara County', 'San Jose, CA, United States'),
(3, 37.3860517, -122.0838511, 'United States', 'CA', 'Mountain View', '', 'ChIJiQHsW0m3j4ARm69rRkrUF3w', 'Santa Clara County', 'Mountain View, CA, United States'),
(4, 37.4418834, -122.14301949999998, 'United States', 'CA', 'Palo Alto', '', 'ChIJORy6nXuwj4ARz3b1NVL1Hw4', 'Santa Clara County', 'Palo Alto, CA, United States');

-- --------------------------------------------------------

--
-- Table structure for table `records_1`
--

CREATE TABLE IF NOT EXISTS `records_1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `details` longtext,
  `path` varchar(255) DEFAULT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0',
  `users_info_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `admin_approved` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `path` (`path`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `records_1`
--

INSERT INTO `records_1` (`id`, `uid`, `created`, `updated`, `status`, `lat`, `lng`, `title`, `details`, `path`, `deleted`, `users_info_id`, `location_id`, `admin_approved`) VALUES
(1, '2', '2016-01-15 01:55:57', NULL, 1, 37.3860517, -122.0838511, 'tomorrow never dies', '{"description":"hey buddy","comments":"hey buddy"}', '/2/sample', 0, 2, 3, 1),
(2, '2', '2016-01-15 01:57:25', NULL, 1, 37.4418834, -122.14301949999998, 'palo baby', '{"description":"descriptiion 2","comments":"comments 2"}', '/2/sample', 0, 2, 4, 1),
(3, '2', '2016-01-16 01:02:58', NULL, 1, NULL, NULL, NULL, NULL, NULL, 0, 3, NULL, 1),
(4, '2', '2016-01-16 01:02:58', NULL, 1, NULL, NULL, NULL, NULL, NULL, 0, 3, NULL, 1),
(5, '2', '2016-01-16 01:02:59', NULL, 1, NULL, NULL, NULL, NULL, NULL, 0, 3, NULL, 1),
(6, '1', '2016-01-16 01:04:07', NULL, 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1),
(7, '1', '2016-01-16 01:04:07', NULL, 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1),
(8, '1', '2016-01-16 01:04:07', NULL, 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tags_1`
--

CREATE TABLE IF NOT EXISTS `tags_1` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) DEFAULT NULL,
  `tag` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`tag_id`),
  KEY `tag` (`tag`),
  KEY `id` (`id`,`tag`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `tags_1`
--

INSERT INTO `tags_1` (`tag_id`, `id`, `tag`) VALUES
(1, 1, 'php'),
(2, 1, 'html'),
(3, 2, 'html'),
(4, 2, 'css'),
(5, 2, 'javascript');

-- --------------------------------------------------------

--
-- Table structure for table `users_info`
--

CREATE TABLE IF NOT EXISTS `users_info` (
  `users_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(25) DEFAULT NULL,
  `users_info` text,
  PRIMARY KEY (`users_info_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `users_info`
--

INSERT INTO `users_info` (`users_info_id`, `ip`, `users_info`) VALUES
(1, '67.181.89.89', '{"ip":"67.181.89.89","city":"Manteca","region":"California","country":"US","lat":"37.7399","lng":"-121.2399","postal":"95337"}'),
(2, '206.208.102.250', '{"ip":"206.208.102.250","city":"Pleasanton","region":"California","country":"US","lat":"37.6704","lng":"-121.9374","postal":"94588"}'),
(3, '67.225.208.62', '{"ip":"67.225.208.62","city":"Lansing","region":"Michigan","country":"US","lat":"42.7257","lng":"-84.6360","postal":"48917"}');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
