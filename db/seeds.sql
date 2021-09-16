use employees;

INSERT INTO department
    (name)
VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Information Technology'),
    ('Accounting');

INSERT INTO employee_role
    (title, salary, department_id)
VALUES
    ('HR MANAGER', 100000, 1),
    ('HR', 50000, 1),
    ('Marketing Director', 14000, 2),
    ('Sales', 65000, 2),
    ('IT Director', 195000, 3),
    ('Desktop Support', 100000, 3),
    ('Account Manager', 110000, 4),
    ('Accountant', 90000, 4);

    INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
    VALUES
        ('Alice', 'DeBoer', 1, NULL),
        ('Gabriel', 'DeBoer', 2, 1),
        ('Dean', 'Winchester', 3, NULL),
        ('Sammy', 'Winchester', 4, 3),
        ('Mary', 'Winchester', 4, 3),
        ('Adam', 'Demamp', 5, NULL),
        ('Anders', 'Homevich', 6, 5),
        ('Blake', 'Henderson', 6, 5),
        ('Kyle', 'Nuvacheck', 7, NULL),
        ('Chuck', 'Bartowski', 7, 8);