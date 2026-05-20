// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SupplyChain
 * @dev Immutable ledger for tracking product lifecycle and ownership transfers.
 */
contract SupplyChain {
    // Enum representing the different stages of a product's lifecycle
    enum State {
        Registered,
        Shipped,
        InTransit,
        Received,
        Sold
    }

    // Struct encapsulating product details
    struct Product {
        uint256 id;
        string name;
        string batchNumber;
        address manufacturer;
        address currentOwner;
        State state;
        uint256 timestamp;
        bool exists;
    }

    // Mapping from Product ID to Product details
    mapping(uint256 => Product) public products;
    
    // Counter for assigning unique Product IDs
    uint256 public productCount;

    // Events to track transactions on the blockchain
    event ProductRegistered(uint256 indexed productId, string batchNumber, address indexed manufacturer, uint256 timestamp);
    event OwnershipTransferred(uint256 indexed productId, address indexed previousOwner, address indexed newOwner, State newState, uint256 timestamp);

    /**
     * @dev Register a new product into the supply chain ecosystem.
     * @param _name The name or description of the goods.
     * @param _batchNumber A unique identifier tying to external database records.
     */
    function registerProduct(string memory _name, string memory _batchNumber) public {
        productCount++;
        
        products[productCount] = Product({
            id: productCount,
            name: _name,
            batchNumber: _batchNumber,
            manufacturer: msg.sender,
            currentOwner: msg.sender,
            state: State.Registered,
            timestamp: block.timestamp,
            exists: true
        });

        emit ProductRegistered(productCount, _batchNumber, msg.sender, block.timestamp);
    }

    /**
     * @dev Transfer the product ownership and update its supply chain state.
     * @param _productId The on-chain ID of the product.
     * @param _newOwner The ethereum address of the recipient.
     * @param _newState The updated lifecycle state.
     */
    function transferOwnership(uint256 _productId, address _newOwner, State _newState) public {
        require(products[_productId].exists, "Product does not exist.");
        require(msg.sender == products[_productId].currentOwner, "Caller is not the current owner of this product.");
        require(_newOwner != address(0), "Cannot transfer to the zero address.");
        
        // Cache previous owner for the event
        address previousOwner = products[_productId].currentOwner;

        // Update standard tracking details
        products[_productId].currentOwner = _newOwner;
        products[_productId].state = _newState;
        products[_productId].timestamp = block.timestamp;
        
        emit OwnershipTransferred(_productId, previousOwner, _newOwner, _newState, block.timestamp);
    }

    /**
     * @dev Simple getter method to trace product data (although `public` mapping works perfectly, this can be easier for structured structs).
     * @param _productId The on-chain ID of the product.
     */
    function getProductTrack(uint256 _productId) public view returns (
        uint256 id,
        string memory name,
        string memory batchNumber,
        address manufacturer,
        address currentOwner,
        State state,
        uint256 timestamp
    ) {
        require(products[_productId].exists, "Product does not exist.");
        Product memory p = products[_productId];
        
        return (p.id, p.name, p.batchNumber, p.manufacturer, p.currentOwner, p.state, p.timestamp);
    }
}
