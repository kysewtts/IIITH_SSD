USE CUSTOMER_DB;

DROP PROCEDURE IF EXISTS GET_NAMES;

DELIMITER $$

CREATE PROCEDURE GET_NAMES(IN CITY_NAME VARCHAR(30))
BEGIN
    SELECT CUST_NAME FROM CUSTOMER WHERE WORKING_AREA = CITY_NAME;
END $$

CALL GET_NAMES("Bangalore");