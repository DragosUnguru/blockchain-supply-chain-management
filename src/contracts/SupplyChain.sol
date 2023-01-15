// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SupplyChain {

    // Events
    event ProductCreated(
        address indexed from,
        uint256 indexed productId,
        string productName
    );
    event ProductTransferred(
        address indexed from,
        address indexed to,
        uint256 indexed productId
    );
    event ProductStatusChanged(
        uint256 indexed productId,
        string status
    );

    // State Variables
    struct Product {
        uint256 id;
        address owner;
        string productName;
        string status;
    }

    mapping(uint256 => Product) products;
    uint256 productCounter;

    // Methods
    function getUserProducts(address _user) public view returns (Product[] memory) {
        Product[] memory result = new Product[](productCounter);
        uint resultIndex = 0;

        for (uint i = 0; i <= productCounter; i++) {
            if (products[i].owner == _user) {
                result[resultIndex] = products[i];
                resultIndex++;
            }
        }
        return result;
    }

    function createProduct(string memory _productName) public {
        productCounter++;
        products[productCounter] = Product(productCounter, msg.sender, _productName, "Created");
        emit ProductCreated(msg.sender, productCounter, _productName);
    }

    function transferProduct(uint256 _productId, address _to) public {
        require(products[_productId].owner == msg.sender, "You are not the owner of this product.");
        products[_productId].owner = _to;
        emit ProductTransferred(msg.sender, _to, _productId);
    }

    function updateProductStatus(uint256 _productId, string memory _status) public {
        require(products[_productId].owner == msg.sender, "You are not the owner of this product.");
        products[_productId].status = _status;
        emit ProductStatusChanged(_productId, _status);
    }

    function getProduct(uint256 _productId) public view returns (address, string memory, string memory) {
        return (products[_productId].owner, products[_productId].productName, products[_productId].status);
    }
}