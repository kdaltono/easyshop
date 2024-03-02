create table user (
	user_id INTEGER NOT NULL auto_increment,
    username VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    current_password binary(32),
    PRIMARY KEY (user_id)
);

CREATE TABLE meal (
    meal_id INTEGER AUTO_INCREMENT NOT NULL,
    meal_title VARCHAR(30) NOT NULL,
    meal_desc VARCHAR(100),
    creation_date DATETIME DEFAULT current_timestamp,
    updated_date DATETIME DEFAULT current_timestamp ON UPDATE current_timestamp,
    meal_recipe TEXT,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (meal_id),
    FOREIGN KEY user_id REFERENCES user(user_id)
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
    is_measured_as_liquid BOOLEAN DEFAULT TRUE,
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

create table meal_list (
	meal_list_id INTEGER NOT NULL AUTO_INCREMENT,
    meal_list_name VARCHAR(20),
    creation_dstamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    user_id INTEGER NOT NULL,
    PRIMARY KEY(meal_list_id),
    FOREIGN KEY user_id REFERENCES user(user_id)
);

create table meal_list_meal (
	meal_list_id INTEGER not null,
    meal_id integer not null
);

create table measures (
	measure_id INTEGER NOT NULL auto_increment,
    measure_name VARCHAR(30),
    measure_abbr VARCHAR(5),
    is_liquid_measure BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (measure_id)
);
create table measure_conversion (
	from_measure_id INTEGER NOT NULL,
    multiplier DECIMAL(15,5) NOT NULL,
    to_measure_id INTEGER NOT NULL,
    UNIQUE KEY (from_measure_id, to_measure_id),
    FOREIGN KEY (from_measure_id) references measures(measure_id),
    FOREIGN KEY (to_measure_id) references measures(measure_id)
);

insert into measures (measure_name, measure_abbr, is_liquid_measure) values ("Liter", "L", TRUE);
insert into measures (measure_name, measure_abbr, is_liquid_measure) values ("Milliliter", "ml", TRUE);
insert into measure_conversion (from_measure_id, multiplier, to_measure_id) values (1, 1000, 2);
insert into measure_conversion (from_measure_id, multiplier, to_measure_id) values (2, 0.001, 1);

insert into measures (measure_name, measure_abbr, is_liquid_measure) values ("Kilogram", "kg", FALSE);
insert into measures (measure_name, measure_abbr, is_liquid_measure) values ("Gram", "g", FALSE);
insert into measure_conversion (from_measure_id, multiplier, to_measure_id) values (3, 1000, 4);
insert into measure_conversion (from_measure_id, multiplier, to_measure_id) values (4, 0.001, 3);

INSERT INTO ingredients(ingredient_category_id, ingredient_title, ingredient_desc) VALUES (1, 'Tin of Beans', 'Heinz Beans');
INSERT INTO ingredients(ingredient_category_id, ingredient_title, ingredient_desc) VALUES (1, 'Bread', 'Hovis Loaf of Bread');

INSERT INTO meal(meal_title, meal_desc) VALUES ('Beans on Toast', 'Quick and Easy beans on toast. Not massively filling but doesnt take long to make.');

INSERT INTO meal_ingredients (meal_id, ingredient_id, ingredient_qty) VALUES (1, 1, 1);
INSERT INTO meal_ingredients (meal_id, ingredient_id, ingredient_qty) VALUES (1, 2, 2);
