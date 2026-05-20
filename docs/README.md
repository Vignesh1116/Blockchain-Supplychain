# Blockchain-Enabled Secure and Transparent Supply Chain Management System

## Project Architecture Overview

This project is a decentralized, AI-driven Supply Chain Management system. It seamlessly integrates a traditional web technology stack with Ethereum smart contracts for immutable tracking and Machine Learning for predictive analytics to detect fraud and predict supply chain risks.

### Directory Structure

```text
project-root/
 ├── frontend/               # React.js + Tailwind CSS application
 │   ├── public/             
 │   ├── src/                
 │   │   ├── components/     # UI Components (Dashboards, Tables, Modals)
 │   │   ├── pages/          # Pages (Track Item, Verify Item)
 │   │   ├── context/        # React context (Web3State, AuthState)
 │   │   ├── services/       # API Integration (Axios for backend communication)
 │   │   └── App.js          
 │   ├── package.json        
 │   └── tailwind.config.js  
 ├── backend/                # Python FastAPI server
 │   ├── app/                
 │   │   ├── api/            # API Endpoints (RESTful Routes)
 │   │   ├── models/         # SQLAlchemy DB Models (PostgreSQL)
 │   │   ├── schemas/        # Pydantic Schemas (Data Validation)
 │   │   ├── services/       # Core Business Logic (DB interactions, Auth)
 │   │   ├── ml_service/     # Communication with ML model for live predictions
 │   │   ├── web3_service/   # web3.py integration for writing/reading from blockchain
 │   │   └── main.py         
 │   └── requirements.txt    
 ├── blockchain/             # Ethereum + Solidity development environment
 │   ├── contracts/          # Solidity Smart Contracts (e.g., SupplyChain.sol)
 │   ├── scripts/            # Deployment scripts
 │   ├── test/               # Smart contract unit tests (Mocha/Chai or pytest)
 │   └── hardhat.config.js   # Hardhat or Truffle config
 ├── ml_models/              # Python Scikit-learn
 │   ├── data/               # Raw & processed datasets for training
 │   ├── notebooks/          # Jupyter notebooks for model exploration
 │   ├── src/                # Model training, validation, & inference scripts
 │   │   ├── train.py        
 │   │   └── predict.py      
 │   ├── models/             # Serialized model files (e.g., model.pkl)
 │   └── requirements.txt    
 ├── database/               # PostgreSQL Database Management
 │   ├── init.sql            # Initialization scripts
 │   └── migrations/         # Alembic or similar database migrations
 ├── docker/                 # Containerization & Orchestration
 │   ├── docker-compose.yml  # Compose file joining frontend, backend, postgres, ml
 │   ├── Dockerfile.frontend 
 │   └── Dockerfile.backend  
 └── docs/                   # System Documentation
     ├── architecture.md     # High-level architecture (this file)
     └── api_docs.md         # API definitions
```

---

## Component Roles & Communication

The ecosystem operates seamlessly by distributing responsibilities across its five main components, ensuring that it is robust, scalable, and decentralized.

### 1. Frontend (React.js + Tailwind CSS)
* **Role**: The main interface for the different stakeholders (manufacturers, distributors, retailers, consumers).
* **Communication**:
  * **To Backend**: Communicates via standard `HTTPS/REST` API calls (using Axios or Fetch) to authenticate users, fetch item histories from the database, and trigger machine learning predictions.
  * **To Blockchain (Optional but recommended)**: Utilizes a Web3 provider (like MetaMask and `ethers.js`) injected into the browser. This allows users to locally sign smart contract transactions (e.g., registering a new product) and interact directly with the Ethereum blockchain node.

### 2. Backend (Python FastAPI)
* **Role**: The central orchestrator that abstracts the complexity of database operations, blockchain reading, and machine learning inference.
* **Communication**:
  * **To Database**: Establishes a connection with `PostgreSQL` using an ORM like SQLAlchemy to query relational data—such as user credentials, off-chain product metadata, and cached ML responses.
  * **To Blockchain**: Uses `web3.py` to listen for smart contract events or quickly read state variables from Ethereum (via an RPC provider like Infura or local Hardhat node) to serve aggregated data to the frontend without heavy client-side processing.
  * **To ML Models**: Sends relevant data payloads (e.g., product journey time, weather conditions, entity reputation) to the ML inference scripts or a dedicated ML microservice.

### 3. Machine Learning (Python Scikit-learn)
* **Role**: Analyzes tracking data to spot anomalies (fraud detection) or foresee logistic interruptions (risk prediction).
* **Communication**:
  * Typically, the ML model is serialized (`.pkl` or `.joblib` format) and loaded securely into the FastAPI backend during server startup.
  * *Alternative Architecture*: Runs as a separate microservice, exposing its own REST API endpoint or gRPC service, which the FastAPI backend triggers.

### 4. Blockchain (Ethereum + Solidity)
* **Role**: Provides cryptographic, immutable proof of custody and tracks the lifecycle of components and items across the supply chain.
* **Communication**:
  * Exposes Smart Contract functions (e.g., `updateItemStatus()`, `registerManufacturer()`).
  * Yields public logs (`Events`) which are watched by the Backend to immediately synchronize off-chain PostgreSQL databases whenever transactions confirm on the chain.

### 5. Database (PostgreSQL)
* **Role**: Stores complex, high-volume state that does not need true decentralization or is too expensive to place entirely on Ethereum.
* **Communication**:
  * Operates strictly behind the Backend. Contains highly-structured data that aligns directly with FastAPI's Pydantic schemas.

## The Full Lifecycle (Example Flow)

1. **Product Hand-off**: A manufacturer registers a batch of goods via the **Frontend**. They sign a transaction via MetaMask. 
2. **Blockchain Recording**: The transaction is verified and added to the **Ethereum** ledger. A `ProductCreated` event is emitted.
3. **Synchronization**: The **Backend** catches this event, parses the new supply chain data, and saves its details into **PostgreSQL**.
4. **Analysis**: Under the hood, the backend requests a quick prediction from the **ML Model** based on the manufacturer's IP location and historical behavior.
5. **Dashboard Rendering**: The **Frontend** queries the database and renders the updated item tree beautifully using **Tailwind CSS**, showing a "Green" risk score next to the new batch thanks to a clean ML prediction.
