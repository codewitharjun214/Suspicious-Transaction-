import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USER;
const PASSWORD = process.env.NEO4J_PASSWORD;

console.log("ETH URI:", URI ? "FOUND" : "MISSING");
console.log("ETH USER:", USER ? "FOUND" : "MISSING");
console.log("ETH PASSWORD:", PASSWORD ? "FOUND" : "MISSING");

if (!URI || !USER || !PASSWORD) {
  console.error("Missing ETH Neo4j environment variables");
}

const driver = neo4j.driver(
  URI,
  neo4j.auth.basic(USER, PASSWORD)
);

export const verifyNeo4jConnections = async () => {
  console.log("Verifying Neo4j connection...");

  try {
    await driver.verifyAuthentication();

    const serverInfo = await driver.getServerInfo();

    console.log("Neo4j connection established");
    console.log(serverInfo);

    return true;
  } catch (err) {
    console.error("Neo4j connection error:");
    console.error(err);
    console.error("Message:", err?.message);
    console.error("Cause:", err?.cause);

    throw err;
  }
};

export const getDriver = () => driver;