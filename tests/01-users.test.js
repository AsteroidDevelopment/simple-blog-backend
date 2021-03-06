const server = require('../server.js');
const request = require('supertest');
var knexCleaner = require('knex-cleaner');
const bcrypt = require('bcryptjs')
// our connection to the database
const db = require('../data/dbConfig.js');
// the data access file we are testing
const Users = require('../components/users/user-model.js');
//Remove the test database.


const incomplete_creds = {username: "testuser", user_email: null, password: "test"}
const good_user_creds = {username: "testuser", user_email: "testuser@user.com", password: "test"}
const user_hash = bcrypt.hashSync("testuser", 2)
let user_obj = {}
let user_token = ""
let user_id = 0
const good_mod_creds = {username: "testmod", user_email: "testmod@user.com", password: "test"}
const mod_hash = bcrypt.hashSync("testmod", 2)
let mod_obj = {}
let mod_token = ""
let mod_id = 0
const good_admin_creds = {username: "testadmin", user_email: "testadmin@user.com", password: "test"}
const admin_hash = bcrypt.hashSync("testadmin", 2)
let admin_obj = {}
let admin_token = ""
let admin_id = 0

console.log("TESTING USERS")

describe("User Tests",  () => {
    it("Finding user tests", async () => {
      await knexCleaner.clean(db)
      expect(1).toBe(1);
    })

    describe("Register endpoint", () => {
        it("Register with incomplete credentials", async () => {
            const expectedStatusCode = 500;
            const response = await request(server).post('/api/users/auth/register').send(incomplete_creds);
            expect(response.status).toBe(expectedStatusCode);
        })
        it("Register normal user", async () => {
            const expectedStatusCode = 201;
            const response = await request(server).post('/api/users/auth/register').send(good_user_creds);
            res = JSON.parse(response.text)
            user_obj = res.user
            user_id = user_obj.user_id
            expect(response.status).toBe(expectedStatusCode);
        })
        it("Register with exact same credentials", async () => {
            const expectedStatusCode = 500;
            const response = await request(server).post('/api/users/auth/register').send(good_user_creds);
            expect(response.status).toBe(expectedStatusCode);
        })
      })

      describe("Logging in & verifying", () => {
        it("Try logging in without verifying", async () => {
            const expectedStatusCode = 500;
            const response = await request(server).post('/api/users/auth/login').send(good_user_creds);
            expect(response.status).toBe(expectedStatusCode);
        })
        it("Verify", async () => {
            const expectedStatusCode = 200;
            const response = await request(server).get(`/api/users/auth/verify/${user_id}/${encodeURIComponent(user_hash)}`);
            expect(response.status).toBe(expectedStatusCode);
        })
        it("Try logging in again, should pass", async () => {
            const expectedStatusCode = 200;
            const response = await request(server).post('/api/users/auth/login').send(good_user_creds);
            user_token = JSON.parse(response.text).token
            expect(response.status).toBe(expectedStatusCode);
        })
        it("Access the dashboard.", async () => {
            const expectedStatusCode = 200;
            const response = await request(server).get('/api/users/dashboard').set("Authorization", user_token)
            expect(response.status).toBe(expectedStatusCode);
        })
        it("Try to access the users list, expect failure.", async () => {
            const expectedStatusCode = 500;
            const response = await request(server).get('/api/users/admin/user-list').set("Authorization", user_token)
            expect(response.status).toBe(expectedStatusCode);
        })
        it("Logout", async () => {
            const expectedStatusCode = 200;
            const response = await request(server).delete('/api/users/auth/logout').set("Authorization", user_token)
            expect(response.status).toBe(expectedStatusCode);
        })
      })


      describe("Admin", () => {
        it("Register & verify mod, grab dashboard & confirm role", async () => {
            let response = await request(server).post('/api/users/auth/register').send(good_mod_creds);
            res = JSON.parse(response.text)
            mod_obj = res.user
            mod_id = mod_obj.user_id
            response = await request(server).get(`/api/users/auth/verify/${mod_id}/${encodeURIComponent(mod_hash)}`);
            await Users.update( {user_role:2} , mod_obj.user_id)
            mod_obj = await Users.findById(mod_obj.user_id)
            expect(mod_obj.user_role).toBe(2);
        })
        it("Register & verify admin, grab dashboard & confirm role", async () => {
            let response = await request(server).post('/api/users/auth/register').send(good_admin_creds);
            res = JSON.parse(response.text)
            admin_obj = res.user
            admin_id = admin_obj.user_id
            response = await request(server).get(`/api/users/auth/verify/${admin_id}/${encodeURIComponent(admin_hash)}`);
            await Users.update({user_role:3}, admin_obj.user_id)
            admin_obj = await Users.findById(admin_obj.user_id)
            expect(admin_obj.user_role).toBe(3);
        })
        describe("Moderator", () => {
          it("Log in as Moderator", async () => {
              const expectedStatusCode = 200;
              const response = await request(server).post('/api/users/auth/login').send(good_mod_creds);
              mod_token = JSON.parse(response.text).token
              expect(response.status).toBe(expectedStatusCode);
          })
          it("Ban the user", async () => {
              const expectedStatusCode = 200;
              const response = await request(server).post('/api/users/admin/ban').send({user_id: user_id}).set("Authorization", mod_token);
              expect(response.status).toBe(expectedStatusCode);
          })
          it("Log in as that user, expect failure", async () => {
              const expectedStatusCode = 500;
              const response = await request(server).post('/api/users/auth/login').send(good_user_creds);
              expect(response.status).toBe(expectedStatusCode);
          })
          it("Unban the user", async () => {
              const expectedStatusCode = 200;
              const response = await request(server).post('/api/users/admin/unban').send({user_id: user_id}).set("Authorization", mod_token);
              expect(response.status).toBe(expectedStatusCode);
          })
          it("Log in as that user, expect success", async () => {
              const expectedStatusCode = 200;
              const response = await request(server).post('/api/users/auth/login').send(good_user_creds);
              expect(response.status).toBe(expectedStatusCode);
          })
          it("Try to promote user, expect failure", async () => {
              const expectedStatusCode = 500;
              const response = await request(server).post('/api/users/admin/promote').send({user_id: user_id, user_role: 2}).set("Authorization", mod_token);
              expect(response.status).toBe(expectedStatusCode);
          })
        })
        describe("Admin", () => {
          it("Log in as Admin", async () => {
              const expectedStatusCode = 200;
              const response = await request(server).post('/api/users/auth/login').send(good_admin_creds);
              admin_token = JSON.parse(response.text).token
              expect(response.status).toBe(expectedStatusCode);
          })
          it("Promote User", async () => {
              const expectedStatusCode = 200;
              const response = await request(server).post('/api/users/admin/promote').send({user_id: user_id, user_role: 2}).set("Authorization", admin_token);
              expect(response.status).toBe(expectedStatusCode);
          })
          it("Demote User", async () => {
              const expectedStatusCode = 200;
              const response = await request(server).post('/api/users/admin/promote').send({user_id: user_id, user_role: 1}).set("Authorization", admin_token);
              expect(response.status).toBe(expectedStatusCode);
          })
          it("Promote Mod", async () => {
              const expectedStatusCode = 200;
              const response = await request(server).post('/api/users/admin/promote').send({user_id: mod_id, user_role: 3}).set("Authorization", admin_token);
              expect(response.status).toBe(expectedStatusCode);
          })
          it("Demote Mod", async () => {
              const expectedStatusCode = 200;
              const response = await request(server).post('/api/users/admin/promote').send({user_id: mod_id, user_role: 2}).set("Authorization", admin_token);
              expect(response.status).toBe(expectedStatusCode);
          })
        })
      })
  })


   require('./02-pantheons.js')
   require('./03-kinds.js')
   require('./04-categories.js')
   require('./05-symbols.js')
