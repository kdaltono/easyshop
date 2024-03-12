DELIMITER //
CREATE PROCEDURE get_all_meals()
BEGIN
	select 
		meal_id,
        meal_title,
        meal_desc,
        creation_date,
        updated_date,
        meal_recipe,
        u.username
	from 
		meal m inner join user u
        on (m.user_id = u.user_id)
	order by
		updated_date desc;
END //

CREATE PROCEDURE get_meal_by_meal_id(
	IN p_meal_id INT
)
BEGIN
	select
		m.meal_id,
        m.meal_title,
        m.meal_desc,
        m.creation_date,
        m.updated_date,
        m.meal_recipe,
        u.username
	from
		meal m inner join user u
        on (m.user_id = u.user_id)
	where
		m.meal_id = p_meal_id;
END //

CREATE PROCEDURE insert_meal(
	IN p_meal_title VARCHAR(30),
    IN p_meal_desc VARCHAR(100),
    IN p_meal_recipe TEXT,
    IN p_user_id INT
)
BEGIN
	insert into
		meal(meal_title, meal_desc, meal_recipe, user_id)
	values
		(p_meal_title, p_meal_desc, p_meal_recipe, p_user_id);
END //

CREATE PROCEDURE get_meal_ingredients(
	IN p_meal_id INT
)
BEGIN
	select 
		m.meal_title, 
        i.ingredient_title, 
        mi.ingredient_qty, 
        me.measure_abbr 
	from 
		meal_ingredients mi inner join meal m 
        on (mi.meal_id = m.meal_id) inner join ingredients i 
        on (mi.ingredient_id = i.ingredient_id) inner join measures me 
        on (mi.measure_id = me.measure_id) 
    where 
		m.meal_id = p_meal_id;
END //

CREATE PROCEDURE get_meals_by_user_id(
	IN p_user_id INT
)
BEGIN
	select 
		m.meal_id,
        m.meal_title,
        m.meal_desc,
        m.creation_date,
        m.updated_date,
        m.meal_recipe,
        u.username 
	from 
		meal m inner join user u 
        on (m.user_id = u.user_id) 
	where 
		u.user_id = p_user_id 
	order by 
		creation_date desc;
END //

CREATE PROCEDURE get_ingredient_categories()
BEGIN
	select
		ingredient_category_id,
        ingredient_category_name
	from
		ingredient_category;
END //

CREATE PROCEDURE get_all_ingredients()
BEGIN
	select
		ingredient_id,
        ingredient_category_id,
        ingredient_title,
        ingredient_desc,
        measure_type_id
	from
		ingredients;
END //

CREATE PROCEDURE get_ingredient_by_ingredient_id(
	IN p_ingredient_id INT
)
BEGIN
	select 
		ingredient_id, 
        ingredient_title, 
        ingredient_desc, 
        creation_date, 
        updated_date, 
        measure_type_id
    from 
		ingredients
    where 
		ingredient_id = p_ingredient_id;
END //

CREATE PROCEDURE insert_ingredient(
	IN p_ingredient_title VARCHAR(30),
    IN p_ingredient_desc VARCHAR(100),
    IN p_ingredient_category_id INT,
    IN p_user_id INT,
    IN p_measure_type_id VARCHAR(1)
)
BEGIN
	insert into ingredients 
        (ingredient_title, ingredient_desc, ingredient_category_id, user_id, measure_type_id) 
	values 
		(p_ingredient_title, p_ingredient_desc, p_ingredient_category_id, p_user_id, p_measure_type_id);
END //

CREATE PROCEDURE insert_meal_ingredient(
	IN p_meal_id INT,
    IN p_ingredient_id INT,
    IN p_ingredient_qty INT,
    IN p_measure_id INT
)
BEGIN
	insert into meal_ingredients
		(meal_id, ingredient_id, ingredient_qty, measure_id) 
	values 
		(p_meal_id, p_ingredient_id, p_ingredient_qty, p_measure_id);
END //

CREATE PROCEDURE insert_into_meal_list_meal(
	IN p_meal_list_id INT,
    IN p_meal_id INT
)
BEGIN
	insert into meal_list_meal 
		(meal_list_id, meal_id)
    values 
		(p_meal_list_id, p_meal_id);
END //

CREATE PROCEDURE get_active_meal_lists_by_user_id(
	IN p_user_id INT
)
BEGIN
	select 
		ml.meal_list_id, 
        ml.meal_list_name, 
        ml.creation_dstamp, 
        ml.is_active, 
        count(mll.meal_id) as meal_list_size 
	from 
		meal_list ml left join meal_list_meal mll 
        on (ml.meal_list_id = mll.meal_list_id) 
	where 
		is_active = TRUE 
        and ml.user_id = p_user_id
	group by 
		ml.meal_list_id, 
        ml.meal_list_name, 
        ml.creation_dstamp, 
        ml.is_active 
	order by 
		ml.creation_dstamp desc;
END //

CREATE PROCEDURE get_meal_list_data_from_meal_list_id(
	IN p_meal_list_id INT,
    IN p_user_id INT
)
BEGIN 
	select 
		ml.meal_list_id, 
        ml.meal_list_name, 
        ml.creation_dstamp, 
        ml.is_active, 
        count(mll.meal_id) as meal_list_size 
	from 
		meal_list ml left join meal_list_meal mll 
        on (ml.meal_list_id = mll.meal_list_id) 
	where 
		ml.meal_list_id = p_meal_list_id
        and ml.user_id = p_user_id
	group by 
		ml.meal_list_id, 
        ml.meal_list_name, 
        ml.creation_dstamp, 
        ml.is_active;
END //

CREATE PROCEDURE get_meal_list_meals(
	IN p_meal_list_id INT,
    IN p_user_id INT
)
BEGIN
	select 
		m.meal_id, 
        m.meal_title, 
        m.meal_desc 
	from 
		meal m inner join meal_list_meal mll 
        on (mll.meal_id = m.meal_id) inner join meal_list ml 
        on (mll.meal_list_id = ml.meal_list_id) 
	where 
		mll.meal_list_id = p_meal_list_id 
        and ml.user_id = p_user_id;
END //

CREATE PROCEDURE insert_meal_list(
	IN p_meal_list_name VARCHAR(20),
    IN p_user_id INT
)
BEGIN
	insert into meal_list 
		(meal_list_name, user_id) 
	values 
		(p_meal_list_name, p_user_id);
END //

CREATE PROCEDURE get_measures()
BEGIN
	select
		measure_id,
        measure_name,
        measure_abbr,
        measure_type_id,
        is_liquid_measure
	from
		measures;
END //

CREATE PROCEDURE get_unit_measure()
BEGIN 
	select 
		measure_id 
	from 
		measures 
	where 
		measure_type_id = 'U';
END //

CREATE PROCEDURE get_user_from_username(
	IN p_username VARCHAR(30)
)
BEGIN
	select 
		user_id, 
        username, 
        first_name, 
        last_name, 
        upper(hex(current_password)) as current_password 
	from 
		user 
	where 
		username = p_username;
END //

CREATE PROCEDURE get_user_exists_from_username(
	IN p_username VARCHAR(30)
)
BEGIN
	select 
		case 
			when count(*) = 1 then 
				true 
			else 
				false 
		end as found_user 
	from 
		user u 
	where 
		u.username = p_username;
END //

CREATE PROCEDURE insert_user(
	IN p_username VARCHAR(30),
    IN p_first_name VARCHAR(30),
    IN p_last_name VARCHAR(30),
    IN p_password binary(32)
)
BEGIN
	insert into user 
		(username, first_name, last_name, current_password) 
	values 
		(p_username, p_first_name, p_last_name, p_password);
END //

delimiter ;