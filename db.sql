CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    enrollment_date DATE
);

INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');

-- getAllStudents() Retrieves and displays all records from the students table.
CREATE OR REPLACE FUNCTION getAllStudents() RETURNS TABLE(
    student_id INT,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    enrollment_date DATE
) AS $$
BEGIN
    RETURN (SELECT student_id, first_name, last_name, email, enrollment_date FROM students);
END;
$$ LANGUAGE plpgsql;

-- addStudent(first_name, last_name, email, enrollment_date) Insert a new student record into the students table.
CREATE OR REPLACE FUNCTION addStudent(
    new_first_name TEXT,
    new_last_name TEXT,
    new_email TEXT,
    new_enrollment_date DATE
) RETURNS VOID AS $$
BEGIN
    INSERT INTO students (first_name, last_name, email, enrollment_date)
    VALUES (new_first_name, new_last_name, new_email, new_enrollment_date);
END;
$$ LANGUAGE plpgsql;

-- updateStudentEmail(student_id, new_email) Updates the email address for a student with the specified student_id.
CREATE OR REPLACE FUNCTION updateStudentEmail(
    new_student_id INT,
    new_email TEXT
) RETURNS VOID AS $$
BEGIN
    UPDATE students
    SET email = new_email
    WHERE student_id = new_student_id;
END;
$$ LANGUAGE plpgsql;

-- deleteStudent(student_id) Deletes the student record with the specified student_id.
CREATE OR REPLACE FUNCTION deleteStudent(
    target_student_id INT
) RETURNS VOID AS $$
BEGIN
    DELETE FROM students
    WHERE student_id = target_student_id;
END;
$$ LANGUAGE plpgsql;