select w.Essn,count(*)
from works_on w
where w.Essn=(select d.Mgr_ssn
from department d
where d.Dnumber=(select p.Dnum from project p where p.Pname='ProductY'));
