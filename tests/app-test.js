const request = require("supertest");
const app = require("../app");
const expect = require("chai").expect;

describe("Username validation", () => {
    it("shows username should not be empty alert", (done) => {
      const newUser = {
        username: "",
        email:"lorem@gmail.com",
        password: "randompassword24sS",
        confirmPassword: "randompassword24sS"
      };
  
      request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Username should not be empty");
          done();
        });
    });

    it("shows username should be atleast 4 characters long alert", (done) => {
      const newUser = {
        username: "lor",
        email:"lorem@gmail.com",
        password: "randompassword24sS",
        confirmPassword: "randompassword24sS"
      };
  
      request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Username must be atleast 4 characters long");
          done();
        });
    });

    it("shows username should not include spaces alert", (done) => {
      const newUser = {
        username: "lor em",
        email:"lorem@gmail.com",
        password: "randompassword24sS",
        confirmPassword: "randompassword24sS"
      };
  
      request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Username should not include spaces");
          done();
        });
    });
  });

  describe("Email validation", () => {
    it("shows Invalid email alert", (done) => {
      const newUser = {
        username: "lorem",
        email:"loremgmail.com",
        password: "randompassword24sS",
        confirmPassword: "randompassword24sS"
      };
  
      request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Invalid email");
          done();
        });
    });

    it("shows email should not be empty alert", (done) => {
      const newUser = {
        username: "lorem",
        email:"",
        password: "randompassword24sS",
        confirmPassword: "randompassword24sS"
      };
  
      request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Email should not be empty");
          done();
        });
    });

    it("shows mail already exists alert", (done) => {
      const newUser = {
        username: "lorem",
        email:"halit@re-coded.com",
        password: "randompassword24sS",
        confirmPassword: "randompassword24sS"
      };
  
      request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Email already exists");
          done();
        });
    });
  });

  describe("Password validation", () => {
    it("shows password requirments alert", (done) => {
      const newUser = {
        username: "lorem",
        email:"loremgmail.com",
        password: "randompasswords",
        confirmPassword: "randompasswords"
      };
  
      request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Invalid email");
          done();
        });
    });

    it("shows password not matching", (done) => {
      const newUser = {
        username: "lorem",
        email:"",
        password: "randompassword24sS",
        confirmPassword: "randompassword24s"
      };
  
      request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Email should not be empty");
          done();
        });
    });
  });

  describe("Successful register", () => {
    it("shows success alert", (done) => {
      const newUser = {
        username: "lorem",
        email:"lorem@gmail.com",
        password: "randompasswordssS24",
        confirmPassword: "randompasswordssS24"
      };
  
      request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Congratulations, your account has been successfully created");
          done();
        });
    });

    it("shows email already used when same email is used", (done) => {
      const newUser = {
        username: "lorem",
        email:"lorem@gmail.com",
        password: "randompasswordssS24",
        confirmPassword: "randompasswordssS24"
      };
  
      request(app)
        .post("/users")
        .set("Content-Type", "application/json")
        .send(newUser)
        .expect("Content-Type", "text/html; charset=utf-8")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Email already exists");
          done();
        });
    });
  });