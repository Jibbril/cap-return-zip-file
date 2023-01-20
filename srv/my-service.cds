using { my } from '../db/schema';

service MyService {
    entity MyEntity as projection on my.MyClass;
    entity Report as projection on my.Report;

    function getZip() returns LargeBinary;
    function saveZip() returns LargeBinary;
}