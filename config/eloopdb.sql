-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: eloop
-- ------------------------------------------------------
-- Server version	8.0.31
use heroku_b81a1d522329301;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int NOT NULL default 0,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogues`
--

DROP TABLE IF EXISTS `catalogues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `catalogues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogues`
--

LOCK TABLES `catalogues` WRITE;
/*!40000 ALTER TABLE `catalogues` DISABLE KEYS */;
/*!40000 ALTER TABLE `catalogues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `charities`
--

DROP TABLE IF EXISTS `charities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `charities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `charityName` varchar(255) NOT NULL,
  `charityImageURL` varchar(255) NOT NULL,
  `charityDescription` varchar(255) DEFAULT NULL,
  `charityPhoneNum` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charities`
--

LOCK TABLES `charities` WRITE;
/*!40000 ALTER TABLE `charities` DISABLE KEYS */;
/*!40000 ALTER TABLE `charities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `partners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `introduction` varchar(3000) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partners`
--

LOCK TABLES `partners` WRITE;
/*!40000 ALTER TABLE `partners` DISABLE KEYS */;
/*!40000 ALTER TABLE `partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productImageUrl` varchar(255) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `description` varchar(3000) DEFAULT NULL,
  `status` int NOT NULL default 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `partnerId` int DEFAULT NULL,
  `catalogueId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `partnerId` (`partnerId`),
  KEY `catalogueId` (`catalogueId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`partnerId`) REFERENCES `partners` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`catalogueId`) REFERENCES `catalogues` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recycles`
--

DROP TABLE IF EXISTS `recycles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `recycles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recycleName` varchar(255) NOT NULL,
  `recycleImageURL` varchar(255) NOT NULL,
  `recycleDescription` varchar(255) DEFAULT NULL,
  `recyclePhoneNum` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recycles`
--

LOCK TABLES `recycles` WRITE;
/*!40000 ALTER TABLE `recycles` DISABLE KEYS */;
/*!40000 ALTER TABLE `recycles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sellProducts`
--

DROP TABLE IF EXISTS `sellProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `sellProducts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `status` varchar(8) NOT NULL DEFAULT 'not deli',
  `payment` varchar(4) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `userId` (`userId`),
  CONSTRAINT `sellproducts_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sellproducts_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sellProducts`
--

LOCK TABLES `sellProducts` WRITE;
/*!40000 ALTER TABLE `sellProducts` DISABLE KEYS */;
/*!40000 ALTER TABLE `sellProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` char(10) DEFAULT NULL,
  `number_product` int DEFAULT NULL,
  `number_recycles` int DEFAULT NULL,
  `number_charity` int DEFAULT NULL,
  `status` int NOT NULL default 0,
  `image` varchar(255)  DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-27  1:21:42
INSERT INTO admins(id, name, account, password, createdAt, updatedAt) VALUES
(1, 'Letha241', 'Bolt@nowhere.com', 'gaaapjacc', '2016-01-01 00:07:13', '2017-01-01 00:00:04');

INSERT INTO users(id, name, account, password, phone_number, number_product, number_recycles, number_charity, createdAt, updatedAt) VALUES
(1, 'Tereasa9', 'HomerBustos6@nowhere.com', '79OZV', '(692) 533-6095', 204, 1, 12, '2022-03-29 13:41:06', '1973-02-15 15:38:57'),
(2, 'Trista1992', 'AudreaMcdonough287@example.com', 'L91C9', '(354) 914-6503', 172, 2, 10, '2016-01-01 00:00:04', '2016-11-26 23:00:01'),
(3, 'Santos2024', 'Gann81@example.com', '8ZE3R', '(472) 787-6281', 460, NULL, NULL, '2021-05-04 18:06:22', '1987-05-21 12:57:27'),
(4, 'Brandon2008', 'Ogden7@example.com', '9915H', '(709) 444-4981', NULL, 3, NULL, '2016-01-01 00:00:04', '2011-03-08 11:05:21'),
(5, 'Tyler471', 'Cathey621@example.com', '8KZ7U', '(378) 597-3669', NULL, NULL, 6, '2021-05-22 06:57:13', '1970-01-01 23:00:01');

INSERT INTO catalogues(id, name, createdAt, updatedAt) VALUES
(1, 'THỰC PHẨM HỮU CƠ', '2001-03-22 19:37:05', '2003-05-20 03:52:55'),
(2, 'CHĂM SÓC CÁ NHÂN', '2001-03-22 19:37:05', '2003-05-20 03:52:55'),
(3, 'VỆ SINH NHÀ CỬA', '2001-03-22 19:37:05', '2003-05-20 03:52:55');

INSERT INTO charities(id, charityName, charityImageURL, charityDescription, charityPhoneNum, createdAt, updatedAt) VALUES
(1, 'Hughes', '/images/HDA TEAM.png', 'Excepturi sed et enim. Placeat numquam voluptatem sed laborum. Assumenda ratione et sed facilis quis? Aut et facere.', '(564) 517-5025', '2021-05-25 20:36:42', '2016-01-01 02:13:43'),
(2, 'Rand', '/images/HDA TEAM.png', 'Libero qui impedit. Repudiandae dolorem natus? Adipisci magnam inventore. Rerum ipsum commodi; obcaecati ullam similique. Eos dolores eveniet. Consequatur.', '(684) 186-0087', '2016-01-01 00:00:07', '2016-07-13 13:34:06'),
(3, 'Longo', '/images/HDA TEAM.png', 'Temporibus excepturi quas. Expedita qui aut; et voluptas tempora. Nisi molestias neque. Aut magnam officia. Unde aut assumenda. Corrupti sed dignissimos.', '(260) 313-6443', '2016-01-01 00:00:09', '2017-02-07 09:12:23'),
(4, 'Moses', '/images/HDA TEAM.png', 'Odio iste placeat dolorem velit esse. Est aliquam ut a? Velit laborum dolor et. Mollitia eaque quos dolorem quia doloribus.', '(868) 864-8718', '2016-01-01 00:31:40', '2016-03-10 21:07:16'),
(5, 'Hughey', '/images/HDA TEAM.png', 'Quis iste pariatur. Magnam qui quia. Inventore nemo sit. Temporibus nemo totam. Culpa soluta consequatur. Et sed sit. Molestiae quibusdam voluptatem; ad.', '(451) 929-8321', '2016-01-01 00:00:01', '2018-04-19 09:15:23');

INSERT INTO recycles(id, recycleName, recycleImageURL, recycleDescription, recyclePhoneNum, createdAt, updatedAt) VALUES
(1, '08SWL', '/images/HDA TEAM.png', 'Quibusdam eos reprehenderit. Ullam nemo quo. Nostrum nihil quisquam. Sed possimus dolorem. Nemo tempore repellat. Similique ipsa quia! Assumenda asperiores.', '(564) 356-3697', '2016-01-01 00:00:02', '2021-10-04 20:44:49'),
(2, 'A998H', '/images/HDA TEAM.png', 'Sed aut ut qui. Saepe vitae quis. Quae officia qui ut accusantium. Obcaecati itaque et! Veniam rerum inventore; porro eos error.', '(551) 206-6985', '2019-12-20 06:31:48', '2017-04-25 02:14:28'),
(3, '1H85Q', '/images/HDA TEAM.png', 'Reprehenderit sit est. Quia aut a. Illo pariatur voluptas! Cupiditate doloremque odit; cum delectus unde? Alias sit ut; sunt fugiat totam.', '(175) 585-0478', '2021-10-26 06:30:35', '2019-05-23 19:42:50'),
(4, '5LV1G', '/images/HDA TEAM.png', 'Molestias natus minima necessitatibus repudiandae nesciunt doloremque. Sit molestiae fugit itaque assumenda omnis? Dignissimos ratione eligendi. Architecto.', '(429) 262-4835', '2016-01-01 01:40:13', '2016-01-01 00:00:03'),
(5, '1WQOR', '/images/HDA TEAM.png', 'Sed hic explicabo repudiandae ab aperiam facere. Unde quae ipsa quos porro incidunt et...', '(327) 539-8887', '2016-01-01 00:00:04', '2019-09-14 16:15:13');

INSERT INTO partners(id, name, introduction, createdAt, updatedAt) VALUES
(1, 'Future Space Explore Co.', 'Striking of coins', '2022-08-01 05:36:47', '2019-05-24 02:44:39'),
(2, 'Global Mobile Group', NULL, '2019-07-29 13:34:33', '2016-03-16 00:10:34'),
(3, 'North Protection Corp.', 'Performing arts', '2019-08-02 22:09:04', '2016-01-01 01:08:43');

INSERT INTO products(id, productImageUrl, productName, price, description, createdAt, updatedAt, partnerId, catalogueId) VALUES
(1, 'https://product.hstatic.net/1000390007/product/pate_ot_do_stephan_0e628eb0eb634a09bfec1fa900d7a6fa.png', 'Pate đồng quê vị ớt đỏ hữu cơ Stephan', '180000', '
Thành phần: Thịt heo, cổ heo, gan heo, mỡ heo, nước, hành tây, lòng trắng trứng, muối, bột khoai tây, 
(ớt đỏ), tỏi, tiêu', '2017-03-14 20:38:14', '2020-07-29 11:44:44', 1, 1),
(2, 'https://roots.vn/wp-content/uploads/2022/11/CAN00358.jpg', 'Pate đồng quê hữu cơ Stephan', '180000', '
Thành phần: Thịt heo, cổ heo, gan heo, mỡ heo, nước, hành tây, lòng trắng trứng, muối, bột khoai tây, 
(ớt đỏ), tỏi, tiêu', '2017-03-14 20:38:14', '2020-07-29 11:44:44', 1, 2),
(3, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/422/789/products/ngo-ngot-huu-co-primeal-370ml.png?v=1624970308280', 'Ngô ngọt hữu cơ Primeal', '130000', '
Làm nguyên liệu trong chế biến thực phẩm.
Hướng dẫn sử dụng:
Trước khi sử dụng, để ngô được ráo, có thể ăn liền sau khi mở hộp hoặc đem trộn cùng salad
Bảo quản: Nơi khô ráo, thoáng mát, tránh ánh sáng. Giữ mát sau khi mở và sử dụng trong vòng 02 ngày.', '2017-03-14 20:38:14', '2020-07-29 11:44:44', 1, 3),
(4, 'https://gaost.vn/wp-content/uploads/2022/03/gao-huu-co-st25-ong-cua-hop-2kg-1.webp', 'gạo thơm hữu cơ ST25', '160000', '
Gạo hữu cơ ST25 Ông Cua đạt chuẩn gạo hữu cơ của Mỹ, Châu Âu và Nhật. Cơm mềm dẻo, giữ nguyên hạt, thơm nhẹ đặc trưng, ăn rất khác biệt.', '2017-03-14 20:38:14', '2020-07-29 11:44:44', 1, 1),
(5, 'https://cf.shopee.vn/file/022bfdcb82821b88c5b311fefe7e7d89', 'https://cf.shopee.vn/file/022bfdcb82821b88c5b311fefe7e7d89', '395000', '
- Aqua, Anthemis nobilis flower water*, Citrus aurantium amara flower water*, Sodium coco-sulfate, Glycerin, Lauryl glucoside, Lavandula angustifolia flower water*, Decyl glucoside, Coco-glucoside, Glyceryl oleate, Saponaria officinalis extract, Tilia cordata flower water* , Bisabolol*, Cocamidopropyl betaine, Tocopherol, Parfum.
*Thành phần nguồn gốc hữu cơ
- 99.2% thành phần nguồn gốc tự nhiên.
- 21,5% thành phần nguồn gốc hữu cơ.', '2017-03-14 20:38:14', '2020-07-29 11:44:44', 2, 2),
(6, 'https://vn-test-11.slatic.net/p/39cbe3517fb8272e8a249afcb0a0a975.jpg', 'Dầu mát xa hữu cơ cho bé Alphanova 100ml', '250000', '
- Aqua, Anthemis nobilis flower water*, Citrus aurantium amara flower water*, Sodium coco-sulfate, Glycerin, Lauryl glucoside, Lavandula angustifolia flower water*, Decyl glucoside, Coco-glucoside, Glyceryl oleate, Saponaria officinalis extract, Tilia cordata flower water* , Bisabolol*, Cocamidopropyl betaine, Tocopherol, Parfum.
*Thành phần nguồn gốc hữu cơ
- 99.2% thành phần nguồn gốc tự nhiên.
- 21,5% thành phần nguồn gốc hữu cơ.', '2017-03-14 20:38:14', '2020-07-29 11:44:44', 2, 3),
(7, 'https://cf.shopee.vn/file/c1438676d43c38dcb7f4f3c4a6f98756', 'Kem Đánh Răng Hữu Cơ Vị Đinh Hương Bạch Đậu Khấu Radius 85g', '205000', '
Thành phần: được lựa chọn với tiêu chí sạch, nguồn gốc thiên nhiên & an toàn cho người dùng. Hoàn toàn không chứa thành phần nhân tạo, chất tạo màu, chất tạo ngọt & vị, chất bảo quản, glutens (chất tạo độ kết dính), GMOs (chất biến đổi gen), fluoride (chất chống sâu răng nhưng cũng là thành phần trong thuốc diệt chuột,thuốc gây mê), đường hoá học, chất tạo bọt nhân tạo (SLS & SLES), chất phụ gia, chất bảo quản (parabens), chất tẩy rửa và chất tạo bọt tổng hợp.', '2017-03-14 20:38:14', '2020-07-29 11:44:44', 1, 1),
(8, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/390/808/products/39caa5aa7986ba9a785d16a61d642eec.jpg?v=1593418500143', 'Viên rửa bát Almawin (25V*20g)', '180000', '
Thành phần:
- Trên 5% chất hoạt động bề mặt không ion (chất hoạt động bề mặt đường), enzym (protease, amylase - GMO-free).
- Nước hoa.
- Limonene, citral, natri citrate, natri disilicate, polyaspartates TAED (thuốc tẩy), sorbitol, dầu thực vật, glycerin.
- 90% nguyên liệu hữu cơ có nguồn gốc tự nhiên.
- Chứng nhận hữu cơ Ecogarantie.', '2017-03-14 20:38:14', '2020-07-29 11:44:44', 3, 2),
(9, 'https://cf.shopee.vn/file/6f28177d424d94cd808005e9d9456ffd', 'Muối cho máy rửa bát Almawin (2kg)', '165000', '
Thành phần: Muối natri clorua', '2017-03-14 20:38:14', '2020-07-29 11:44:44', 3, 3),
(10, '/images/HDA TEAM.png', 'Tẩy rửa đa năng hữu cơ nhiều bề mặt Artisan Savonnier 1L', '156000', '
Thành phần: Dưới 5%: chất hoạt động bề mặt ionic, chất hoạt động bề mặt không ionic, hương thơm (tinh dầu hữu cơ), nước, nước tinh chất bạc hà, ethanol, natri citrate, limonene, linalool, thành phần hữu cơ, 100% thành phần nguồn gốc tự nhiên, 10% thành phần nguồn gốc hữu cơ.', '2017-03-14 20:38:14', '2020-07-29 11:44:44', 3, 3);

INSERT INTO sellproducts(id, createdAt, updatedAt, productId, userId) VALUES
(1, '2019-08-02 22:09:04', '2016-01-01 01:08:43', 10, 1),
(2, '2019-08-02 22:09:04', '2016-01-01 01:08:43', 9, 2),
(3, '2019-08-02 22:09:04', '2016-01-01 01:08:43', 8, 3),
(4, '2019-08-02 22:09:04', '2016-01-01 01:08:43', 7, 4),
(5, '2019-08-02 22:09:04', '2016-01-01 01:08:43', 6, 5),
(6, '2019-08-02 22:09:04', '2016-01-01 01:08:43', 5, 1),
(7, '2019-08-02 22:09:04', '2016-01-01 01:08:43', 4, 2),
(8, '2019-08-02 22:09:04', '2016-01-01 01:08:43', 3, 3),
(9, '2019-08-02 22:09:04', '2016-01-01 01:08:43', 2, 4),
(10, '2019-08-02 22:09:04', '2016-01-01 01:08:43', 1, 5);