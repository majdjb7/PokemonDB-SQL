USE sql_intro;

-- CREATE TABLE Company (
--     name VARCHAR(30) NOT NULL PRIMARY KEY,
--     field VARCHAR(30),
--     workers INT(10)
-- );


CREATE TABLE Student (
    s_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    s_name VARCHAR(30),
    is_brilliant BIT
);

CREATE TABLE Teacher (
    t_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    t_name VARCHAR(30),
    is_tenured BIT
);

CREATE TABLE Student_Teacher (
    student_id INT,
    teacher_id INT,
    FOREIGN KEY(student_id) REFERENCES student(s_id),
    FOREIGN KEY(teacher_id) REFERENCES teacher(t_id)
);
