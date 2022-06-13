CREATE TABLE meal (
    meal_id INTEGER AUTO_INCREMENT NOT NULL,
    meal_title VARCHAR(30) NOT NULL,
    meal_desc VARCHAR(100),
    creation_date DATETIME DEFAULT current_timestamp,
    updated_date DATETIME DEFAULT current_timestamp ON UPDATE current_timestamp,
    PRIMARY KEY (meal_id)
);

CREATE TABLE ingredients (
    ingredient_id INTEGER AUTO_INCREMENT NOT NULL,
    ingredient_title VARCHAR(30) NOT NULL,
    ingredient_desc VARCHAR(100),
    creation_date DATETIME DEFAULT current_timestamp,
    updated_date DATETIME DEFAULT current_timestamp ON UPDATE current_timestamp,
    PRIMARY KEY (ingredient_id)
);

CREATE TABLE meal_ingredients (
    meal_id INTEGER AUTO_INCREMENT NOT NULL,
    ingredient_id INTEGER AUTO_INCREMENT NOT NULL,
    ingredient_qty INTEGER NOT NULL,
    FOREIGN KEY (meal_id) REFERENCES meal(meal_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
    PRIMARY KEY (meal_id, ingredient_id)
);

INSERT INTO ingredients(ingredient_title, ingredient_desc) VALUES ('Tin of Beans', 'Heinz Beans');