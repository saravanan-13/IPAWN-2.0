-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 03, 2018 at 01:58 PM
-- Server version: 5.7.21-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `card_details`
--

CREATE TABLE `card_details` (
  `email` varchar(40) NOT NULL,
  `card_number` bigint(20) NOT NULL,
  `card_name` varchar(40) NOT NULL,
  `expiry_month` int(11) NOT NULL,
  `expiry_year` int(11) NOT NULL,
  `cvv_code` int(11) NOT NULL,
  `balance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `card_details`
--

INSERT INTO `card_details` (`email`, `card_number`, `card_name`, `expiry_month`, `expiry_year`, `cvv_code`, `balance`) VALUES
('dhilip@dp', 2132121, 'dhilip@dp', 10, 2222, 0, 0),
('drb@spi', 2132121, 'drb@spi', 10, 2222, 0, 0),
('fed@ex', 2132121, 'fed@ex', 10, 2222, 0, 0),
('manoj@mj', 2132121, 'manoj@mj', 10, 2222, 0, 0),
('saravanan@13.com', 402956854715, 'saravanan', 4, 24, 131, 10000),
('smart@13', 2132121, 'smart@13', 10, 2222, 0, 0),
('vidya@vb', 2132121, 'vidya@vb', 10, 2222, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `product_id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `message` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cust_profile`
--

CREATE TABLE `cust_profile` (
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `city` varchar(40) NOT NULL,
  `zipcode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cust_profile`
--

INSERT INTO `cust_profile` (`firstname`, `lastname`, `email`, `phone`, `address`, `city`, `zipcode`) VALUES
('', '', 'dhilip@dp', 4654132, '', '', 0),
('', '', 'drb@spi', 4654132, '', '', 0),
('', '', 'fed@ex', 4654132, '', '', 0),
('', '', 'manoj@mj', 4654132, '', '', 0),
('saravanan', '13', 'saravanan@13.com', 9884177525, 'Ramapuram', 'chennai', 600089),
('', '', 'smart@13', 4654132, '', '', 0),
('', '', 'vidya@vb', 4654132, '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `dummy`
--

CREATE TABLE `dummy` (
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dummy`
--

INSERT INTO `dummy` (`product_id`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `email`
--

CREATE TABLE `email` (
  `email` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `email`
--

INSERT INTO `email` (`email`) VALUES
('smart@13');

-- --------------------------------------------------------

--
-- Table structure for table `fedex`
--

CREATE TABLE `fedex` (
  `email` varchar(40) NOT NULL,
  `cust_name` varchar(40) NOT NULL,
  `product_id` varchar(40) NOT NULL,
  `product_name` varchar(40) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `city` varchar(40) NOT NULL,
  `zipcode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mortgage`
--

CREATE TABLE `mortgage` (
  `email` varchar(40) NOT NULL,
  `cust_name` varchar(40) NOT NULL,
  `type` varchar(40) NOT NULL,
  `product_name` varchar(40) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_type` varchar(40) NOT NULL,
  `status` varchar(40) NOT NULL,
  `total_amount` bigint(20) NOT NULL,
  `amount_remaining` bigint(20) NOT NULL,
  `amunt_padi` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `email` varchar(40) NOT NULL,
  `cust_name` varchar(40) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(40) NOT NULL,
  `product_type` varchar(40) NOT NULL,
  `type` varchar(40) NOT NULL,
  `proof` varchar(40) NOT NULL,
  `description` varchar(100) NOT NULL,
  `status` varchar(40) NOT NULL,
  `amount` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`email`, `cust_name`, `product_id`, `product_name`, `product_type`, `type`, `proof`, `description`, `status`, `amount`) VALUES
('saravanan@13', 'saravanan', 1, 'bike', 'vehicles', 'sell', 'insurance,rc book', 'Pulsar 200 ns', 'pending', 0),
('saravanan@13', 'saravanan', 2, 'book', 'historic', 'mortgage', 'none', 'Historic book', 'pending', 0);

-- --------------------------------------------------------

--
-- Table structure for table `resend`
--

CREATE TABLE `resend` (
  `email` varchar(40) NOT NULL,
  `cust_name` varchar(40) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(40) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `city` varchar(40) NOT NULL,
  `zipcode` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sell`
--

CREATE TABLE `sell` (
  `email` varchar(40) NOT NULL,
  `cust_name` varchar(40) NOT NULL,
  `type` varchar(40) NOT NULL,
  `product_name` varchar(40) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_type` varchar(40) NOT NULL,
  `status` varchar(40) NOT NULL,
  `amount` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `server_dummy`
--

CREATE TABLE `server_dummy` (
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `server_dummy`
--

INSERT INTO `server_dummy` (`product_id`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `signup`
--

CREATE TABLE `signup` (
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`firstname`, `lastname`, `email`, `password`) VALUES
('dhilip', 'dp', 'dhilip@dp', '84736a579f'),
('drb', 'spiderman', 'drb@spi', '84736a579f'),
('fed', 'ex', 'fed@ex', '84736a579f'),
('manoj', 'mj', 'manoj@mj', '84736a579f'),
('saravanan', '13', 'saravanan@13', '84736a579f'),
('saravanan', '13', 'smart@13', '84736a579f'),
('vidya', 'vb', 'vidya@vb', '84736a579f');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `card_details`
--
ALTER TABLE `card_details`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `cust_profile`
--
ALTER TABLE `cust_profile`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `fedex`
--
ALTER TABLE `fedex`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `mortgage`
--
ALTER TABLE `mortgage`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `resend`
--
ALTER TABLE `resend`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `sell`
--
ALTER TABLE `sell`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `signup`
--
ALTER TABLE `signup`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
