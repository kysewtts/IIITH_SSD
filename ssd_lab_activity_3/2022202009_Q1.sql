create temporary table temp1 as (select distinct e.super_ssn from works_on w, employee e where w.hours < 40 and w.hours is NOT NULL and w.essn = e.ssn);

create temporary table temp2 as (select distinct t.super_ssn, d.dname, d.dnumber from department d, temp1 t where t.super_ssn = d.mgr_ssn);

select distinct e.fname, e.minit, e.lname, e.ssn, t.dnumber, t.dname from employee e, temp2 t where e.ssn = t.super_ssn;
