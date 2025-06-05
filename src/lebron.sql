-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2025 at 04:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lebron`
--

-- --------------------------------------------------------

--
-- Table structure for table `guestbook_messages`
--

CREATE TABLE `guestbook_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guestbook_messages`
--

INSERT INTO `guestbook_messages` (`id`, `name`, `message`, `created_at`) VALUES
(1, 'cd', 'cdcd', '2025-05-21 22:01:34'),
(2, 'cd', 'cdcdcd', '2025-05-21 23:07:19'),
(3, 'c', 'cc', '2025-05-22 20:56:51'),
(4, '1231231', '123123', '2025-05-29 14:11:28'),
(5, 'sdasdas', 'asdas', '2025-05-29 14:12:16'),
(6, 'lbjlover', 'i luv u daddy', '2025-05-29 14:12:28'),
(7, 'asdasd', 'm', '2025-05-30 02:06:35'),
(8, 'niko', 'i love you lebron', '2025-05-30 03:01:00');

-- --------------------------------------------------------

--
-- Table structure for table `polls`
--

CREATE TABLE `polls` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `polls`
--

INSERT INTO `polls` (`id`, `question`) VALUES
(1, 'Which LeBron team era do you like the most?'),
(2, 'What is LeBron\'s best playoff moment?'),
(3, 'Who is LeBron\'s toughest rival?'),
(4, 'What is your favorite LeBron jersey number?'),
(5, 'Which LeBron highlight is your favorite?'),
(6, 'What is LeBron\'s best NBA Finals performance?'),
(7, 'Which LeBron coaching style do you prefer?'),
(8, 'What LeBron off-court activity do you admire most?'),
(9, 'How do you rate LeBron\'s impact on the game?'),
(10, 'Which LeBron signature move is your favorite?');

-- --------------------------------------------------------

--
-- Table structure for table `poll_options`
--

CREATE TABLE `poll_options` (
  `id` int(11) NOT NULL,
  `poll_id` int(11) NOT NULL,
  `option_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `poll_options`
--

INSERT INTO `poll_options` (`id`, `poll_id`, `option_text`) VALUES
(1, 1, 'Cleveland Cavaliers 2003-2010'),
(2, 1, 'Miami Heat 2010-2014'),
(3, 1, 'Cleveland Cavaliers 2014-2018'),
(4, 1, 'Los Angeles Lakers 2018-present'),
(5, 2, '2012 Finals Game 5 block on Iguodala'),
(6, 2, '2013 Finals Game 7 block on Battier'),
(7, 2, '2016 Finals Game 7 block on Andre Iguodala'),
(8, 2, '2020 Finals Game 6 performance'),
(9, 3, 'Kobe Bryant'),
(10, 3, 'Steph Curry'),
(11, 3, 'Kevin Durant'),
(12, 3, 'Dwyane Wade'),
(13, 4, '23'),
(14, 4, '6'),
(15, 4, 'Number 2 (high school)'),
(16, 4, 'Other'),
(17, 5, 'Slam dunks'),
(18, 5, 'No-look passes'),
(19, 5, 'Game-winning shots'),
(20, 5, 'Crossovers'),
(21, 6, '2012 Finals vs Thunder'),
(22, 6, '2013 Finals vs Spurs'),
(23, 6, '2016 Finals vs Warriors'),
(24, 6, '2020 Finals vs Heat'),
(25, 7, 'Defensive intensity'),
(26, 7, 'Fast break leadership'),
(27, 7, 'Playmaking skills'),
(28, 7, 'Mentoring young players'),
(29, 8, 'Philanthropy work'),
(30, 8, 'Activism & advocacy'),
(31, 8, 'Business ventures'),
(32, 8, 'Media & entertainment'),
(33, 9, 'Greatest player ever'),
(34, 9, 'One of the best of his era'),
(35, 9, 'Solid star player'),
(36, 9, 'Overrated'),
(37, 10, 'Fadeaway jumper'),
(38, 10, 'Chase-down block'),
(39, 10, 'No-look pass'),
(40, 10, 'Drive to the basket');

-- --------------------------------------------------------

--
-- Table structure for table `poll_votes`
--

CREATE TABLE `poll_votes` (
  `id` int(11) NOT NULL,
  `poll_option_id` int(11) NOT NULL,
  `votes` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `poll_votes`
--

INSERT INTO `poll_votes` (`id`, `poll_option_id`, `votes`) VALUES
(1, 1, 75),
(2, 2, 23),
(3, 3, 17),
(4, 4, 78),
(5, 5, 55),
(6, 6, 31),
(7, 7, 99),
(8, 8, 93),
(9, 9, 71),
(10, 10, 64),
(11, 11, 20),
(12, 12, 3),
(13, 13, 57),
(14, 14, 77),
(15, 15, 12),
(16, 16, 28),
(17, 17, 1),
(18, 18, 28),
(19, 19, 30),
(20, 20, 67),
(21, 21, 44),
(22, 22, 20),
(23, 23, 69),
(24, 24, 84),
(25, 25, 8),
(26, 26, 95),
(27, 27, 47),
(28, 28, 53),
(29, 29, 20),
(30, 30, 45),
(31, 31, 62),
(32, 32, 77),
(33, 33, 95),
(34, 34, 38),
(35, 35, 12),
(36, 36, 47),
(37, 37, 101),
(38, 38, 49),
(39, 39, 53),
(40, 40, 16);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_submissions`
--

CREATE TABLE `quiz_submissions` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `score` int(11) NOT NULL,
  `quiz_level` enum('quizEasy','quizMedium','quizHard') NOT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_submissions`
--

INSERT INTO `quiz_submissions` (`id`, `username`, `score`, `quiz_level`, `submitted_at`) VALUES
(1, 'cj', 3, 'quizEasy', '2025-05-21 21:07:35'),
(2, 'cd', 1, 'quizEasy', '2025-05-21 21:08:01'),
(3, 'caaa', 1, 'quizMedium', '2025-05-21 21:08:26'),
(4, 'cd', 4, 'quizEasy', '2025-05-21 22:01:30'),
(5, 'cd', 2, 'quizEasy', '2025-05-21 23:07:14'),
(6, 'poopy', 6, 'quizEasy', '2025-05-21 23:11:02'),
(7, 'ch', 6, 'quizEasy', '2025-05-22 20:56:47'),
(8, 'poopy', 5, 'quizEasy', '2025-05-23 05:58:35'),
(9, 'lbj luvr', 4, 'quizHard', '2025-05-25 14:28:37'),
(10, 'munch', 3, 'quizHard', '2025-05-25 14:28:59'),
(11, 'cacaca', 2, 'quizHard', '2025-05-25 14:29:50'),
(12, 'medium', 2, 'quizMedium', '2025-05-25 14:30:14'),
(13, 'babaoey', 3, 'quizMedium', '2025-05-25 14:30:28'),
(14, 'ch', 1, 'quizMedium', '2025-05-25 15:30:26'),
(15, 'ch', 3, 'quizMedium', '2025-05-29 12:58:05'),
(16, 'n', 1, 'quizEasy', '2025-05-30 02:06:23'),
(17, 'niko', 5, 'quizEasy', '2025-05-30 03:00:35');

-- --------------------------------------------------------

--
-- Stand-in structure for view `top3_quiz_easy`
-- (See below for the actual view)
--
CREATE TABLE `top3_quiz_easy` (
`id` int(11)
,`username` varchar(100)
,`score` int(11)
,`quiz_level` enum('quizEasy','quizMedium','quizHard')
,`submitted_at` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `top3_quiz_hard`
-- (See below for the actual view)
--
CREATE TABLE `top3_quiz_hard` (
`id` int(11)
,`username` varchar(100)
,`score` int(11)
,`quiz_level` enum('quizEasy','quizMedium','quizHard')
,`submitted_at` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `top3_quiz_medium`
-- (See below for the actual view)
--
CREATE TABLE `top3_quiz_medium` (
`id` int(11)
,`username` varchar(100)
,`score` int(11)
,`quiz_level` enum('quizEasy','quizMedium','quizHard')
,`submitted_at` timestamp
);

-- --------------------------------------------------------

--
-- Structure for view `top3_quiz_easy`
--
DROP TABLE IF EXISTS `top3_quiz_easy`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `top3_quiz_easy`  AS SELECT `ranked`.`id` AS `id`, `ranked`.`username` AS `username`, `ranked`.`score` AS `score`, `ranked`.`quiz_level` AS `quiz_level`, `ranked`.`submitted_at` AS `submitted_at` FROM (select `quiz_submissions`.`id` AS `id`,`quiz_submissions`.`username` AS `username`,`quiz_submissions`.`score` AS `score`,`quiz_submissions`.`quiz_level` AS `quiz_level`,`quiz_submissions`.`submitted_at` AS `submitted_at`,row_number() over ( partition by `quiz_submissions`.`quiz_level` order by `quiz_submissions`.`score` desc,`quiz_submissions`.`submitted_at`) AS `rank` from `quiz_submissions` where `quiz_submissions`.`quiz_level` = 'quizEasy') AS `ranked` WHERE `ranked`.`rank` <= 3 ;

-- --------------------------------------------------------

--
-- Structure for view `top3_quiz_hard`
--
DROP TABLE IF EXISTS `top3_quiz_hard`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `top3_quiz_hard`  AS SELECT `ranked`.`id` AS `id`, `ranked`.`username` AS `username`, `ranked`.`score` AS `score`, `ranked`.`quiz_level` AS `quiz_level`, `ranked`.`submitted_at` AS `submitted_at` FROM (select `quiz_submissions`.`id` AS `id`,`quiz_submissions`.`username` AS `username`,`quiz_submissions`.`score` AS `score`,`quiz_submissions`.`quiz_level` AS `quiz_level`,`quiz_submissions`.`submitted_at` AS `submitted_at`,row_number() over ( partition by `quiz_submissions`.`quiz_level` order by `quiz_submissions`.`score` desc,`quiz_submissions`.`submitted_at`) AS `rank` from `quiz_submissions` where `quiz_submissions`.`quiz_level` = 'quizHard') AS `ranked` WHERE `ranked`.`rank` <= 3 ;

-- --------------------------------------------------------

--
-- Structure for view `top3_quiz_medium`
--
DROP TABLE IF EXISTS `top3_quiz_medium`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `top3_quiz_medium`  AS SELECT `ranked`.`id` AS `id`, `ranked`.`username` AS `username`, `ranked`.`score` AS `score`, `ranked`.`quiz_level` AS `quiz_level`, `ranked`.`submitted_at` AS `submitted_at` FROM (select `quiz_submissions`.`id` AS `id`,`quiz_submissions`.`username` AS `username`,`quiz_submissions`.`score` AS `score`,`quiz_submissions`.`quiz_level` AS `quiz_level`,`quiz_submissions`.`submitted_at` AS `submitted_at`,row_number() over ( partition by `quiz_submissions`.`quiz_level` order by `quiz_submissions`.`score` desc,`quiz_submissions`.`submitted_at`) AS `rank` from `quiz_submissions` where `quiz_submissions`.`quiz_level` = 'quizMedium') AS `ranked` WHERE `ranked`.`rank` <= 3 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `guestbook_messages`
--
ALTER TABLE `guestbook_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poll_options`
--
ALTER TABLE `poll_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poll_id` (`poll_id`);

--
-- Indexes for table `poll_votes`
--
ALTER TABLE `poll_votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poll_option_id` (`poll_option_id`);

--
-- Indexes for table `quiz_submissions`
--
ALTER TABLE `quiz_submissions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `guestbook_messages`
--
ALTER TABLE `guestbook_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `polls`
--
ALTER TABLE `polls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `poll_options`
--
ALTER TABLE `poll_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `poll_votes`
--
ALTER TABLE `poll_votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `quiz_submissions`
--
ALTER TABLE `quiz_submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `poll_options`
--
ALTER TABLE `poll_options`
  ADD CONSTRAINT `poll_options_ibfk_1` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `poll_votes`
--
ALTER TABLE `poll_votes`
  ADD CONSTRAINT `poll_votes_ibfk_1` FOREIGN KEY (`poll_option_id`) REFERENCES `poll_options` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
