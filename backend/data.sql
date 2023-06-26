CREATE DATABASE treetrek;

CREATE TABLE campinglist (
    id VARCHAR(255),
    user_email VARCHAR(255),
    title VARCHAR(30),
    date VARCHAR(300)
);

CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);