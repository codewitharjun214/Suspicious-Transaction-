import neo4j from 'neo4j-driver'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env', override: true })

const URI = process.env.NEO4J_URI || "neo4j://127.0.0.1:7687";
const USER = process.env.NEO4J_USER || "neo4j";
const PASSWORD = process.env.NEO4J_PASSWORD || "India@7507535622";

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

export const verifyNeo4jConnections = async () => {
  console.log("Verifying Neo4j connection...");
  try {
    if (!PASSWORD) {
      console.warn('NEO4J_PASSWORD is not set. Please set NEO4J_URI, NEO4J_USER and NEO4J_PASSWORD in environment for production deployments.');
    }
    await driver.verifyAuthentication();
    const serverInfo = await driver.getServerInfo();
    console.log('Neo4j connection established');
    console.log(serverInfo);
  } catch (err) {
    console.error(`Neo4j connection error\n${err}\nCause: ${err.cause}`);
    throw err;
  }
};

export const getDriver = () => driver;
