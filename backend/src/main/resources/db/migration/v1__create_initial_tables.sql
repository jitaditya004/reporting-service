CREATE TABLE department (

    department_id SERIAL PRIMARY KEY,

    department_name VARCHAR(100) NOT NULL
);


CREATE TABLE teacher (

    teacher_id SERIAL PRIMARY KEY,

    teacher_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE
);


CREATE TABLE course (

    course_id SERIAL PRIMARY KEY,

    course_name VARCHAR(100) NOT NULL,

    department_id INT NOT NULL,

    teacher_id INT,

    credits INT NOT NULL,


    CONSTRAINT fk_course_department
        FOREIGN KEY (department_id)
        REFERENCES department(department_id),


    CONSTRAINT fk_course_teacher
        FOREIGN KEY (teacher_id)
        REFERENCES teacher(teacher_id)
);


CREATE TABLE student (

    student_id SERIAL PRIMARY KEY,

    student_roll_no VARCHAR(50) UNIQUE NOT NULL,

    student_name VARCHAR(100) NOT NULL,

    department_id INT NOT NULL,

    semester INT NOT NULL,

    admission_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_student_department
        FOREIGN KEY (department_id)
        REFERENCES department(department_id)
);


CREATE TABLE student_course (

    student_course_id SERIAL PRIMARY KEY,

    student_id INT NOT NULL,

    course_id INT NOT NULL,

    marks NUMERIC(5,2),

    attendance_percentage NUMERIC(5,2),


    CONSTRAINT fk_student_course_student
        FOREIGN KEY(student_id)
        REFERENCES student(student_id)
        ON DELETE CASCADE,


    CONSTRAINT fk_student_course_course
        FOREIGN KEY(course_id)
        REFERENCES course(course_id),


    CONSTRAINT unique_student_course
        UNIQUE(student_id, course_id)
);


CREATE TABLE attendance (

    attendance_id SERIAL PRIMARY KEY,

    student_id INT NOT NULL,

    course_id INT NOT NULL,

    attendance_date DATE NOT NULL,

    status VARCHAR(10)
        CHECK(status IN ('Present','Absent')),


    CONSTRAINT fk_attendance_student
        FOREIGN KEY(student_id)
        REFERENCES student(student_id)
        ON DELETE CASCADE,


    CONSTRAINT fk_attendance_course
        FOREIGN KEY(course_id)
        REFERENCES course(course_id)
);


CREATE TABLE dynamic_report (

    report_id SERIAL PRIMARY KEY,

    report_name VARCHAR(100),

    input_filters JSONB,

    output_columns JSONB,

    query TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);