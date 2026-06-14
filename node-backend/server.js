import dotenv from 'dotenv';
dotenv.config({ override: true });
import express from 'express';
import bodyParser from 'body-parser';
import { initializeGraphqlServer } from './services/neo4jinstance.js';
import { initializeBtcNeo4jServer } from './services/btcNeoInstance.js';
import { verifyNeo4jConnections } from './neo4j-database/neo4jdriver.js';
import { verifyBtcNeo4jConnection } from './neo4j-database/btcNeo4jdriver.js';
import { traceFundFlow } from './services/etherscanService.js';
import getEventsByTransactionHash from './services/eventManager.js';
import TransactionDatasetGenerator from './services/generateDataset.js';
import mapBtcFlow from './services/mapBtcFlow.js';
import cors from 'cors';
import router from './routes/routes.js';
const app = express();
const PORT = process.env.PORT || 4000;
import fetchCoinGeckoData from './dashboardServer.js'

app.use(cors({
  origin: process.env.CORS_ORIGIN || ["http://localhost:5173", "http://localhost:5174"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

const startApp = async () => {
  try {
    await verifyNeo4jConnections();
    await verifyBtcNeo4jConnection();
    await initializeGraphqlServer();
    await initializeBtcNeo4jServer();
  } catch (err) {
    console.error('Startup failed:', err);
    process.exit(1);
  }
};

startApp();
// 0x307834c338866516DB9f5784aBc4C43484a8363a
// 0xEae7380dD4CeF6fbD1144F49E4D1e6964258A4F4
// 0xf9C0b9E489d8bb53B98bdfDc8B4cf13426a6bBcb
// getEventsByTransactionHash("0x1f87af615627d6d640e41bfb09438b9faa2ae92bf53b6565de41441e39a5325e")
// traceFundFlow("0xEae7380dD4CeF6fbD1144F49E4D1e6964258A4F4", new Set(), 1).then(() => {
//     console.log('Fund flow tracing completed.');
// })

// **********DATASET GENERATION**********

// const txHash = "0x4c954f24f4cf94e1ed1ce2d5d788eded98b3d873f0b06c07c44694300a1ba921";

// const seedAddresses = [
//   { address: '3D1xsYjkitAQR3MmgP5xyvs3vKNSiu7vot', isExchange: false }, 

// ];

// const generateDataset = new TransactionDatasetGenerator();

// generateDataset.generateDataset(seedAddresses, 10);


// **********BTC FLOW MAPPING**********
// const btcFlowMapper = new mapBtcFlow();
// const startAddress = 'bc1qqsa6ac4aeqf6h0xrfea9dj73khjxe8twu4el53g6ln8es9acmn2qddza00';
// const MAX_DEPTH = 3;

// btcFlowMapper
//      .startMapping(startAddress, MAX_DEPTH)
//      .then(() => {
//       console.log('BTC flow mapping completed.');
//       return btcFlowMapper.driver.close();
//      })
//      .catch((error) => {
//       console.error("Error during tracing:", error);
//       return btcFlowMapper.driver.close();
//     });
  // Route to fetch CoinGecko data
app.get('/coingecko', async (req, res) => {
  try {
      const data = await fetchCoinGeckoData();
      // Remove .data since the API response is already processed
      const exchanges = data.slice(0, 10);
      
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(exchanges); // Use .json() instead of .send() for JSON responses
  } catch (error) {
      res.status(500).json({ error: error.message }); // Use .json() for consistency
  }
});

  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.use("/", router);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(
            `Port ${PORT} is already in use. Stop the process using that port or run "npx kill-port ${PORT}" and try again.`
        );
        process.exit(1);
    }
    console.error("Server error:", error);
    process.exit(1);
});



    