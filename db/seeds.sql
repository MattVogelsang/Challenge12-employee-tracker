\c employees_db

INSERT INTO department(name)
VALUES ('Sales'),
        ('Engineering');

    INSERT INTO role (title,salary,department_id)
    VALUES('Sale Lead',100000,1),   
          ('Sale Person',80000,1),
          ('Lead Engineering',150000,2);

          INSERT INTO employee(first_name,last_name, role_id )
          VALUES('John','Doe',1),
                ('Mike','Chan',2),
                ('Ashley','Rodriguez',3);

                UPDATE employee SET manager_id=1 WHERE id=2;