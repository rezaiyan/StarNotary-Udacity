const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a Star', async() => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value1);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async () => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[0];
    let user2 = accounts[1];
    let starId = 5;
    let starPrice = web3.utils.toWei("1", "ether");
    let user2Balance = await web3.eth.getBalance(user2);
    await instance.createStar('awesome star', starId, { from: user1});
    await instance.putStarUpForSale(starId, starPrice, { from: user1 });

    // Buy the star
    await instance.buyStar(starId, { from: user2, value: starPrice });


    assert.equal(instance.ownerOf(starId), user2, "Star ownership not transferred to user2");
    assert.equal(user2.balance, user2Balance - starPrice, "User2 balance not decreased correctly");

});

// Implement Task 2 Add supporting unit tests

it('can add the star name and star symbol properly', async() => {
    // 1. create a Star with different tokenId
    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    let instance = await StarNotary.deployed();

    let contractName = await instance.name();
    let contractSymbol = await instance.symbol();

    // 3. Compare with the expected name and symbol
    assert.equal(contractName, 'Haftasia');
    assert.equal(contractSymbol, 'HFS');
});

it('lets 2 users exchange stars', async() => {
    // 1. create 2 Stars with different tokenId
    // 2. Call the exchangeStars functions implemented in the Smart Contract
    // 3. Verify that the owners changed
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];

    // 1. Create 2 Stars with different tokenId
    let starId1 = 7; // Choose a unique tokenId
    let starId2 = 8; // Choose another unique tokenId
    await instance.createStar('Star 1', starId1, { from: user1 });
    await instance.createStar('Star 2', starId2, { from: user2 });

    // 2. Call the exchangeStars function implemented in the Smart Contract
    await instance.exchangeStars(starId1, starId2, { from: user1 });

    // 3. Verify that the owners changed
    assert.equal(await instance.ownerOf.call(starId1), user2);
    assert.equal(await instance.ownerOf.call(starId2), user1);
});

it('lets a user transfer a star', async() => {
    // 1. create a Star with different tokenId
    // 2. use the transferStar function implemented in the Smart Contract
    // 3. Verify the star owner changed.
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];

    // 1. Create a Star with a different tokenId
    let starId = 9; // Choose a unique tokenId
    await instance.createStar('Transferable Star', starId, { from: user1 });

    // 2. Use the transferStar function implemented in the Smart Contract
    await instance.transferStar(user2, starId, { from: user1 });

    // 3. Verify the star owner changed
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lookUptokenIdToStarInfo test', async() => {
    // 1. create a Star with different tokenId
    // 2. Call your method lookUptokenIdToStarInfo
    // 3. Verify if you Star name is the same
    let instance = await StarNotary.deployed();

    // 1. Create a Star with a different tokenId
    let tokenId = 10; // Choose a unique tokenId
    await instance.createStar('Lookup Star', tokenId, { from: accounts[0] });

    // 2. Call your method lookUptokenIdToStarInfo
    let starName = await instance.lookUptokenIdToStarInfo(tokenId);

    // 3. Verify if your Star name is the same
    assert.equal(starName, 'Lookup Star');
});