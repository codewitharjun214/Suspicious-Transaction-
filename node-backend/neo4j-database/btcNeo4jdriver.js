import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.BTC_NEO4J_URI;
const USER = process.env.BTC_NEO4J_USER;
const PASSWORD = process.env.BTC_NEO4J_PASSWORD;

console.log("BTC URI:", URI ? "FOUND" : "MISSING");
console.log("BTC USER:", USER ? "FOUND" : "MISSING");
console.log("BTC PASSWORD:", PASSWORD ? "FOUND" : "MISSING");

if (!URI || !USER || !PASSWORD) {
  console.error("Missing BTC Neo4j environment variables");
}

const driver = neo4j.driver(
  URI,
  neo4j.auth.basic(USER, PASSWORD)
);

export const verifyBtcNeo4jConnection = async () => {
  console.log("Verifying BTC Neo4j connection...");

  try {
    await driver.verifyAuthentication();

    const serverInfo = await driver.getServerInfo();

    console.log("BTC Neo4j connection established");
    console.log(serverInfo);

    return true;
  } catch (err) {
    console.error("BTC Neo4j connection error:");
    console.error(err);
    console.error("Message:", err?.message);
    console.error("Cause:", err?.cause);

    throw err;
  }
};

export const getDriver = () => driver;