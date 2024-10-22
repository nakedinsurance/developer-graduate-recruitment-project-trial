CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE insurance_policies (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    id_number VARCHAR(50),
    has_been_cancelled_or_rejected BOOLEAN DEFAULT FALSE,
    years_uninterrupted_cover INT,
    insurer_id INT
);

CREATE TABLE insurers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO customers (name, email, password) VALUES
('Alice Johnson', 'alice@example.com', 'hashed_password1'),
('Bob Smith', 'bob@example.com', 'hashed_password2'),
('Charlie Brown', 'charlie@example.com', 'hashed_password3'),
('Diana Prince', 'diana@example.com', 'hashed_password4'),
('Ethan Hunt', 'ethan@example.com', 'hashed_password5'),
('Fiona Green', 'fiona@example.com', 'hashed_password6'),
('George Baker', 'george@example.com', 'hashed_password7'),
('Hannah Lee', 'hannah@example.com', 'hashed_password8'),
('Ivy Adams', 'ivy@example.com', 'hashed_password9'),
('Jack Daniels', 'jack@example.com', 'hashed_password10');

INSERT INTO products (name, description, price) VALUES
('Smartphone', 'Latest model with high-end features', 699.99),
('Laptop', 'Lightweight laptop with powerful performance', 999.99),
('Headphones', 'Noise-cancelling over-ear headphones', 199.99),
('Smartwatch', 'Track your fitness and notifications', 249.99),
('Tablet', 'Portable tablet for work and play', 399.99),
('Camera', 'High-resolution DSLR camera for photography', 1299.99),
('Television', '55 inch 4K Ultra HD Smart TV', 799.99),
('Wireless Charger', 'Fast wireless charging pad', 49.99),
('Bluetooth Speaker', 'Portable Bluetooth speaker with great sound', 89.99),
('Smart Home Hub', 'Control your smart home devices', 149.99);

INSERT INTO insurance_policies (customer_id, product_id, id_number, has_been_cancelled_or_rejected, years_uninterrupted_cover, insurer_id) VALUES
(1, 1, 'ID12345', false, 2, 1),
(2, 2, 'ID23456', true, 0, 1),
(3, 3, 'ID34567', false, 1, 2),
(4, 4, 'ID45678', false, 3, 1),
(5, 5, 'ID56789', true, 0, 2),
(6, 6, 'ID67890', false, 2, 1),
(7, 7, 'ID78901', false, 4, 2),
(8, 8, 'ID89012', true, 0, 1),
(9, 9, 'ID90123', false, 1, 2),
(10, 10, 'ID01234', false, 3, 1);

INSERT INTO insurers (name) VALUES
('Insurer A'),
('Insurer B'),
('Insurer C');


INSERT INTO customers (name, email, password) VALUES
('Katherine Johnson', 'katherine@example.com', 'hashed_password11'),
('Liam Neeson', 'liam@example.com', 'hashed_password12'),
('Mia Wong', 'mia@example.com', 'hashed_password13'),
('Noah Taylor', 'noah@example.com', 'hashed_password14'),
('Olivia Smith', 'olivia@example.com', 'hashed_password15');

INSERT INTO products (name, description, price) VALUES
('Gaming Console', 'Latest gaming console with amazing graphics', 499.99),
('E-Reader', 'Lightweight e-reader with built-in light', 129.99),
('Action Camera', 'Compact action camera for adventures', 299.99),
('Smart Refrigerator', 'Intelligent fridge with touchscreen', 1999.99),
('Wireless Earbuds', 'High-quality true wireless earbuds', 149.99);

INSERT INTO insurance_policies (customer_id, product_id, id_number, has_been_cancelled_or_rejected, years_uninterrupted_cover, insurer_id) VALUES
(1, 1, 'ID12346', false, 2, 1),
(2, 2, 'ID23457', false, 2, 2),
(3, 3, 'ID34568', false, 3, 1),
(4, 4, 'ID45679', true, 0, 3),
(5, 5, 'ID56780', false, 1, 2);
