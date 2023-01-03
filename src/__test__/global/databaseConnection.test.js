/* generate database test */
const db = require("../../database/connections/MongoDBConnection");
const { config } = require("../../config/enviroment.config");

describe("Database Connection", () => {
    test("should connect to MongoDB", () => {
        expect(db.connection.host).toBe(config.development.dbURL);
	});
});
