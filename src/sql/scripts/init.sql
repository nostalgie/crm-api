INSERT INTO `crm`.`Employee_Roles`(name)
VALUES
    ('duty_admin'),
    ('senior_admin'),
    ('manager');

INSERT INTO `crm`.`Login_Credentials`(username, password_hash, password_salt, user_type)
VALUES
    ('test_duty', '8928d5012380f80ac91d8f5b85e37f6fb2183321f680172a2081f60a20f63f932f84978b8e974de88f50454abc681ec12ecd0e26c66634adc91f98d7a8da6831', '6d12e6fe5e1d11d1f478674bd3662aa8626f7779', 'employee'),
    ('test_customer', '8928d5012380f80ac91d8f5b85e37f6fb2183321f680172a2081f60a20f63f932f84978b8e974de88f50454abc681ec12ecd0e26c66634adc91f98d7a8da6831', '6d12e6fe5e1d11d1f478674bd3662aa8626f7779', 'customer');

INSERT INTO `crm`.`Employees`(first_name, last_name, middle_name, credentials_id, role_id)
VALUES
    ('Petr', 'Petrov', 'Petrovich', 1, 1);

INSERT INTO `crm`.`Customers`(name, credentials_id)
VALUES
    ('Kerech Kerechevech', 2);
