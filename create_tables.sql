USE poke_corp;

-- CREATE TABLE Pokemon_Trainer (
--     p_id INT,
--     tr_id INT,
--     FOREIGN KEY(p_id) REFERENCES pokemon(p_id),
--     FOREIGN KEY(tr_id) REFERENCES trainer(tr_id)
-- );


-- CREATE TABLE Pokemon (
--     p_id INT(10) PRIMARY KEY,
--     p_name VARCHAR(30),
--     p_height INT(10),
--     p_weight INT(10),
--     p_type_id INT,

--     FOREIGN KEY(p_type_id) REFERENCES pokemon_type(t_id)
-- );

-- CREATE TABLE Pokemon_Type (
--     t_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     type VARCHAR(30)
-- );

-- CREATE TABLE Trainer (
--     tr_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     t_name VARCHAR(30),
--     t_town_id INT,

--     FOREIGN KEY(t_town_id) REFERENCES town(tn_id)
-- );

-- CREATE TABLE Town (
--     tn_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     t_name VARCHAR(30)
-- );

