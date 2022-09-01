USE CUSTOMER_DB;

DROP PROCEDURE IF EXISTS GET_NAMES_GRADE;

DELIMITER $$

CREATE PROCEDURE GET_NAMES_GRADE()
BEGIN
    SELECT CUST_NAME, GRADE FROM CUSTOMER C WHERE C.OPENING_AMT + C.RECEIVE_AMT > 10000;
END $$

CALL GET_NAMES_GRADE();