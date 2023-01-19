namespace my;

entity MyClass {
    key ID: Integer;
    Prop1: String;
}

entity Report {
    key id: Integer;
    
    @Core.MediaType : 'application/json'
    @Core.ContentDisposition.Filename: 'report.json'
    content: LargeBinary;
    @Core.IsMediaType : true
    mediaType: String;
    fileName: String;
}