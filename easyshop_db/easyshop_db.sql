CREATE TABLE meal (
    meal_id INTEGER AUTO_INCREMENT NOT NULL,
    meal_title VARCHAR(30) NOT NULL,
    meal_desc VARCHAR(100),
    creation_date DATETIME DEFAULT current_timestamp,
    updated_date DATETIME DEFAULT current_timestamp ON UPDATE current_timestamp,
    PRIMARY KEY (meal_id)
);

CREATE TABLE ingredient_category (
	ingredient_category_id INTEGER AUTO_INCREMENT NOT NULL,
    ingredient_category_name VARCHAR(40),
    PRIMARY KEY (ingredient_category_id)
);

INSERT INTO ingredient_category (ingredient_category_name) VALUES ('Eggs, milk and milk products');
INSERT INTO ingredient_category (ingredient_category_name) VALUES ('Fats and oils');
INSERT INTO ingredient_category (ingredient_category_name) VALUES ('Fruits');
INSERT INTO ingredient_category (ingredient_category_name) VALUES ('Grain, nuts and baking products');
INSERT INTO ingredient_category (ingredient_category_name) VALUES ('Herbs and spices');
INSERT INTO ingredient_category (ingredient_category_name) VALUES ('Meat, sausages and fish');
INSERT INTO ingredient_category (ingredient_category_name) VALUES ('Others');
INSERT INTO ingredient_category (ingredient_category_name) VALUES ('Pasta, rice and pulses');
INSERT INTO ingredient_category (ingredient_category_name) VALUES ('Vegetables');

CREATE TABLE ingredients (
    ingredient_id INTEGER AUTO_INCREMENT NOT NULL,
    ingredient_category_id INTEGER NOT NULL,
    ingredient_title VARCHAR(30) NOT NULL,
    ingredient_desc VARCHAR(100),
    creation_date DATETIME DEFAULT current_timestamp,
    updated_date DATETIME DEFAULT current_timestamp ON UPDATE current_timestamp,
    PRIMARY KEY (ingredient_id)
);

CREATE TABLE meal_ingredients (
    meal_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    ingredient_qty INTEGER NOT NULL,
    FOREIGN KEY (meal_id) REFERENCES meal(meal_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
    PRIMARY KEY (meal_id, ingredient_id)
);

CREATE TABLE user (
    user_id INTEGER AUTO_INCREMENT NOT NULL,
    username VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    user_password VARCHAR(30) NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE shopping_list (
    shopping_list_id INTEGER AUTO_INCREMENT NOT NULL,
    user_id INTEGER NOT NULL,
    meal_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    ingredient_qty_offset INTEGER DEFAULT 0 NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (meal_id) REFERENCES meal(meal_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
    PRIMARY KEY (shopping_list_id, user_id, meal_id, ingredient_id)
);

INSERT INTO ingredients(ingredient_title, ingredient_desc) VALUES ('Tin of Beans', 'Heinz Beans');
INSERT INTO ingredients(ingredient_title, ingredient_desc) VALUES ('Bread', 'Hovis Loaf of Bread');

INSERT INTO meal(meal_title, meal_desc) VALUES ('Beans on Toast', 'Quick and Easy beans on toast. Not massively filling but doesnt take long to make.');

INSERT INTO meal_ingredients (meal_id, ingredient_id, ingredient_qty) VALUES (1, 1, 1);
INSERT INTO meal_ingredients (meal_id, ingredient_id, ingredient_qty) VALUES (1, 2, 2);
