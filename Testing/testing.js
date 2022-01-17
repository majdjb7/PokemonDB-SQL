const Sequelize = require('sequelize')

// const sequelize = new Sequelize('mysql://YOUR_USER:YOUR_PASSWORD@YOUR_HOST/YOUR_DB_NAME')

const sequelize = new Sequelize('mysql://root:@localhost/sql_intro')

addStudent = async function (name, isBrilliant) {
    let query = `INSERT INTO student VALUES(null, '${name}', ${isBrilliant})`
    let result = await sequelize.query(query)
    return result[0]
  
}

addTeacher = async function(name, isTenured) {
    let query = `INSERT INTO teacher VALUES(null, '${name}', ${isTenured})`
    let result = await sequelize.query(query)
    return result[0]
}

enrollStudent = async function(studentName, teacherName) {
    let studentIdQuery = `SELECT s_id FROM student WHERE s_name='${studentName}'`
    let teacherIdQuery = `SELECT t_id FROM teacher WHERE t_name='${teacherName}'`

    let student_result = await sequelize.query(studentIdQuery)
    let teacher_result = await sequelize.query(teacherIdQuery)
    console.log(student_result);
    let studentId = student_result[0][0].s_id
    let teacherId = teacher_result[0][0].t_id

    if (!(studentId && teacherId)) { return }
    
 
    let query = `INSERT INTO student_teacher VALUES(${studentId}, ${teacherId})`
    sequelize.query(query)
        .then(function ([result]) {
            console.log(result)
        })
}

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        // sequelize
        // .query("SELECT * FROM company")
        // .then(function ([results, metadata]) {
        //     console.log(results)
        // })
        // .catch(err => {
        //     console.log(err)
        // })

        // sequelize
        // .query("INSERT INTO company VALUES('Google', 'Tech', 10000)")
        // .then(function ([result]) {
        //     console.log(result)
        // })

        /* ADDING STUDENTS AND TEACHERS */
        // addStudent("Student", 1)
        // addTeacher("Teacher", 1)

        // addStudent("Leonidas", 1)
        // addTeacher("Yoda", 1)

        // addStudent("Majd", 1)
        // addTeacher("Ameer", 0)

        // enrollStudent("Majd", "Ameer")

        
       

    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

