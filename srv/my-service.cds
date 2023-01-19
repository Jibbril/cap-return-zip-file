using { my } from '../db/schema';

service MyService {
    entity MyEntity as projection on my.MyClass;
    entity Report as projection on my.Report;

    function getBinary() returns LargeBinary;
    function saveBinary() returns LargeBinary;
}