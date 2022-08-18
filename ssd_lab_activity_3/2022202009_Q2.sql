select e.fname, e.minit, e.lname, e.ssn, temp1.dnumber, temp1.empCount from employee e, (
	select d.dnumber, d.dname, temp.super_ssn, temp.empCount from department d, (
		select count(ssn) as empCount, e.super_ssn from employee e group by e.super_ssn
	) as temp 
	where d.mgr_ssn = temp. super_ssn
) 
as temp1 where temp1.super_ssn = e.ssn;

