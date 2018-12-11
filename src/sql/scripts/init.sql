INSERT INTO `crm`.`Employee_Roles`(name)
VALUES
    ('duty_admin'),
    ('senior_admin'),
    ('manager');

INSERT INTO `crm`.`Login_Credentials`(username, password_hash, password_salt, user_type)
VALUES
    ('test_duty', '8928d5012380f80ac91d8f5b85e37f6fb2183321f680172a2081f60a20f63f932f84978b8e974de88f50454abc681ec12ecd0e26c66634adc91f98d7a8da6831', '6d12e6fe5e1d11d1f478674bd3662aa8626f7779', 'employee'),
    ('test_senior', '8928d5012380f80ac91d8f5b85e37f6fb2183321f680172a2081f60a20f63f932f84978b8e974de88f50454abc681ec12ecd0e26c66634adc91f98d7a8da6831', '6d12e6fe5e1d11d1f478674bd3662aa8626f7779', 'employee'),
    ('test_manager', '8928d5012380f80ac91d8f5b85e37f6fb2183321f680172a2081f60a20f63f932f84978b8e974de88f50454abc681ec12ecd0e26c66634adc91f98d7a8da6831', '6d12e6fe5e1d11d1f478674bd3662aa8626f7779', 'employee'),
    ('test_customer', '8928d5012380f80ac91d8f5b85e37f6fb2183321f680172a2081f60a20f63f932f84978b8e974de88f50454abc681ec12ecd0e26c66634adc91f98d7a8da6831', '6d12e6fe5e1d11d1f478674bd3662aa8626f7779', 'customer');

INSERT INTO `crm`.`Employees`(first_name, last_name, middle_name, credentials_id, role_id)
VALUES
    ('Petr', 'Petrov', 'Petrovich', 1, 1),
    ('Senior', 'Mr', 'Senior', 2, 2),
    ('Man', 'Ag', 'Er', 3, 3);

INSERT INTO `crm`.`Customers`(name, credentials_id)
VALUES
    ('Nekich na izmene', 3);

INSERT INTO `crm`.`Customer_Admins`
VALUES
    (1, 1),
    (2, 1);

INSERT INTO `crm`.`Tickets`(type, customer_first_name, customer_last_name, customer_number, description, is_finished, rating, customer_id, executor_id)
VALUES
    ('common', 'Василий', 'Олегов', '11111111', 'Ошибка 228', false, null, 1, 2),
    ('common', 'Олег', 'Васильев', '11111112', 'Ошибка 322', true, null, 1, 2),
    ('urgent', 'Кирилл', 'Керечев', '11111113', 'Ошибка 1488', true, 3, 1, 2);

INSERT INTO `crm`.`Updates`(user_type, message, user_id, ticket_id, created_at)
VALUES 
    ('employee', 'Отключите тильт.', 1, 1, '2018-12-05 10:14:00'),
    ('customer', 'Можно ненадо.', 2, 1, '2018-12-05 11:11:11' ),
    ('employee', 'Можно.', 1, 1, '2018-12-05 12:12:12'),
    ('employee', 'Отключите.', 1, 1, '2018-12-05 10:14:00'),
    ('customer', 'Можно?', 2, 1, '2018-12-05 11:11:11' ),
    ('employee', 'Можно.', 1, 1, '2018-12-05 12:12:12'),
    ('employee', 'Отключите.', 1, 1, '2018-12-05 10:14:00'),