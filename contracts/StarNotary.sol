//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

//Importing openzeppelin-solidity ERC-721 implemented Standard
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

// StarNotary Contract declaration inheritance the ERC721 openzeppelin implementation
contract StarNotary is ERC721 {
    // Star data
    struct Star {
        string name;
    }

    string public _name = "Haftasia";
    string public _symbol = "HFS";

    constructor() ERC721(_name, _symbol) {}

    // Implement Task 1 Add a name and symbol properties
    // name: Is a short name to your token
    // symbol: Is a short string like 'USD' -> 'American Dollar'

    // mapping the Star with the Owner Address
    mapping(uint256 => Star) public tokenIdToStarInfo;
    // mapping the TokenId and price
    mapping(uint256 => uint256) public starsForSale;

    // Create Star using the Struct
    function createStar(string memory _starName, uint256 _tokenId) public {
        // Passing the name and tokenId as a parameters
        Star memory newStar = Star(_starName); // Star is an struct so we are creating a new Star
        tokenIdToStarInfo[_tokenId] = newStar; // Creating in memory the Star -> tokenId mapping
        _mint(msg.sender, _tokenId); // _mint assign the the star with _tokenId to the sender address (ownership)
    }

    // Putting an Star for sale (Adding the star tokenid into the mapping starsForSale, first verify that the sender is the owner)
    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(
            ownerOf(_tokenId) == msg.sender,
            "You can't sale the Star you don't owned"
        );
        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0, "The Star should be up for sale");
        uint256 starCost = starsForSale[_tokenId];
        address ownerAddress = ownerOf(_tokenId);

        require(msg.value >= starCost, "You need to send enough Ether");

        _transfer(ownerAddress, msg.sender, _tokenId);

        address payable ownerAddressPayable = payable(ownerAddress);
        ownerAddressPayable.transfer(starCost);

        if (msg.value > starCost) {
            payable(msg.sender).transfer(msg.value - starCost);
        }
        starsForSale[_tokenId] = 0;
    }

    // Implement Task 1 lookUptokenIdToStarInfo
    function lookUptokenIdToStarInfo(
        uint _tokenId
    ) public view returns (string memory) {
        return tokenIdToStarInfo[_tokenId].name;
    }

    // Implement Task 1 Exchange Stars function
    function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {
        //1. Passing to star tokenId you will need to check if the owner of _tokenId1 or _tokenId2 is the sender
        //2. You don't have to check for the price of the token (star)
        //3. Get the owner of the two tokens (ownerOf(_tokenId1), ownerOf(_tokenId2)
        //4. Use _transferFrom function to exchange the tokens.
        address owner1 = ownerOf(_tokenId1);
        address owner2 = ownerOf(_tokenId2);

        require(
            msg.sender == owner1 || msg.sender == owner2,
            "Sender is not the owner of either token"
        );

        _transfer(owner1, owner2, _tokenId1);
        _transfer(owner2, owner1, _tokenId2);
    }

    // Implement Task 1 Transfer Stars
    function transferStar(address _to, uint256 _tokenId) public {
        //1. Check if the sender is the ownerOf(_tokenId)
        //2. Use the transferFrom(from, to, tokenId); function to transfer the Star

        require(
            msg.sender == ownerOf(_tokenId),
            "Sender is not the owner of the token"
        );

        _transfer(msg.sender, _to, _tokenId);
    }
}

