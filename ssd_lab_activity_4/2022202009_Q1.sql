DROP PROCEDURE IF EXISTS ADD_TWO_NOS;

DELIMITER $$

CREATE PROCEDURE ADD_TWO_NOS(IN num1 int, IN num2 int, OUT result int)
BEGIN
    set result=num1+num2;
END $$

CALL ADD_TWO_NOS(5, 30, @result);
SELECT @result;