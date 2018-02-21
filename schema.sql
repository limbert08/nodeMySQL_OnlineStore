DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  quantity_inventory INT(10) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, quantity_inventory, price)
VALUES ("XL Henley Shirt", "Clothes", 100 , 19.99),
  ("SM Women's Jacket", "Clothes", 120 , 29.99),
    ("Medium Board Shorts", "Clothes", 300 , 4.97),
    ("Cardigan Sweaters", "Clothes", 99 , 49.99),
    ("V-Neck Shirts", "Clothes", 300 , 7.99),
    ("Bamazon Alexa Dot", "Electronics", 100 , 49.99),
    ("Bamazon Alexa Phone", "Electronics", 100 , 500.00),
    ("Bamazon Alexa Tablet", "Electronics", 200 , 29.97),
    ("Bamazon Alexa TV Stick", "Electronics", 100 , 9.88),
    ("Bamazon Phone Charger", "Electronics", 1100 , 3.00),
    ("Babolat PureDrive racquet", "Sports", 100 ,19.99),
     ("Penn Tennis Balls", "Sports", 2000 , 2.00),
    ("Do Cool Sh*t", "Books", 20, 23.50);
  
  SELECT * FROM products;
  