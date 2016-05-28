// JavaScript Document
describe("Hello World", function() {
    //may be put additional describe functions or use it function
    it("should return hello world", function () {
        //here we write our test
        expect(helloWorld()).toEqual('Hello World');//note that i havent created any helloWorld() function yet, so it is test driven approach where you write a test first and assume there will be helloWorld function.
    });
});