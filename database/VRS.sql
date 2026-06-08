-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 04, 2026 at 06:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `VRS`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customer`
--

CREATE TABLE `Customer` (
  `Full_Name` varchar(255) NOT NULL,
  `National_Id` bigint(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Customer`
--

INSERT INTO `Customer` (`Full_Name`, `National_Id`, `Phone`, `Email`, `Address`) VALUES
('marie', 1234567890121456, '0788887867', 'Sandrineuwineza12@gmail.com', 'KICUKIRO'),
('niyomugabo etiene', 1234567890123426, '0728184292', 'niyomugaboetiene50@gmail.com', 'Rwanda'),
('Niyomugabo etiene', 1234567890123456, '0728184299', 'Niyomugabo@gmail.com', 'Bugesera rwanda');

-- --------------------------------------------------------

--
-- Table structure for table `Reservation_Rental`
--

CREATE TABLE `Reservation_Rental` (
  `Reservation_Date` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `Start_Date` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `End_Date` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `Reservation_Status` varchar(255) NOT NULL,
  `Rental_Date` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `Return_Date` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000',
  `Rental_Fee` int(255) NOT NULL,
  `Rental_Status` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `customer_nationa_id` bigint(255) NOT NULL,
  `plate_number` varchar(255) NOT NULL,
  `user_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Reservation_Rental`
--

INSERT INTO `Reservation_Rental` (`Reservation_Date`, `Start_Date`, `End_Date`, `Reservation_Status`, `Rental_Date`, `Return_Date`, `Rental_Fee`, `Rental_Status`, `id`, `customer_nationa_id`, `plate_number`, `user_id`) VALUES
('2026-03-01 22:00:00.000000', '2026-04-01 22:00:00.000000', '2027-03-01 22:00:00.000000', 'rent', '2025-01-31 22:00:00.000000', '2026-02-02 22:00:00.000000', 2000, 'rent', 2, 1234567890123456, 'RAB205K', 2),
('2026-06-15 22:00:00.000000', '2026-06-09 22:00:00.000000', '2026-06-17 22:00:00.000000', 'rent', '2026-06-14 22:00:00.000000', '2026-06-16 22:00:00.000000', 3000, 'rent', 5, 1234567890123456, 'RAB205C', 3),
('2026-06-17 22:00:00.000000', '2026-06-23 22:00:00.000000', '2026-06-18 22:00:00.000000', 'rent', '2026-06-16 22:00:00.000000', '2026-06-09 22:00:00.000000', 3000, 'rent', 6, 1234567890123426, 'RAB205C', 3);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `user_id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`user_id`, `username`, `password`, `role`) VALUES
(1, 'anna', '$2b$10$XIpjI5O1vLVlxSkRP3Fp6eN2O/TNlN6gC4VloTM6RhqW6Gax9VVea', 'admin'),
(2, 'eric', '$2b$10$PMPf8QsaltjqJGkTZ7VXnecCRdz4k5QC8fgy9e7EoodgTSnlSLMEO', 'admin'),
(3, 'bob', '$2b$10$lhoTFjsMeebSaqebVNjstOGI3TsoUnuZtfCx60HAZMgw8g7E4Pn26', 'admin'),
(4, 'anna12', '$2b$10$ra9m3DAa.aw/ldM2pGLa5.tq1.nQrqwIjs3yofIsl2IfMOHk.bCqK', 'admin'),
(5, 'customer', '$2b$10$zL1QU4x4VYZDk81bLmdXquToGpegatO0H3u9a5tNiWJ24z4Kc7OBm', 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `Vehicle`
--

CREATE TABLE `Vehicle` (
  `Plate_Number` varchar(255) NOT NULL,
  `Brand` varchar(255) NOT NULL,
  `Model` varchar(255) NOT NULL,
  `Year` int(255) NOT NULL,
  `Vehicle_Type` varchar(255) NOT NULL,
  `Purchase_Price` int(255) NOT NULL,
  `Status` text NOT NULL,
  `user_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Vehicle`
--

INSERT INTO `Vehicle` (`Plate_Number`, `Brand`, `Model`, `Year`, `Vehicle_Type`, `Purchase_Price`, `Status`, `user_id`) VALUES
('RAB205C', 'Toyota', 'model 4', 2025, 'Car', 40000, 'rented', 3),
('RAB205D', 'Honda', 'model 6', 2024, 'Car', 30000, 'rented', 3),
('RAB205K', 'Toyota', 'model 2', 2025, 'Car', 40000, 'available', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`National_Id`),
  ADD UNIQUE KEY `Phone` (`Phone`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `Reservation_Rental`
--
ALTER TABLE `Reservation_Rental`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `customer_national_id` (`customer_nationa_id`),
  ADD KEY `plate_number` (`plate_number`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `Vehicle`
--
ALTER TABLE `Vehicle`
  ADD PRIMARY KEY (`Plate_Number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Reservation_Rental`
--
ALTER TABLE `Reservation_Rental`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `user_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Reservation_Rental`
--
ALTER TABLE `Reservation_Rental`
  ADD CONSTRAINT `customer_national_id` FOREIGN KEY (`customer_nationa_id`) REFERENCES `Customer` (`National_Id`),
  ADD CONSTRAINT `plate_number` FOREIGN KEY (`plate_number`) REFERENCES `Vehicle` (`Plate_Number`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
