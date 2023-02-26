const { assert } = require('chai');
var faker = require('faker');
const helper = require('../helpers/petStoreHelper');

describe('Pet Store API tests', () => {
    it('Given pet is created, then pet is retrieved by Id', async () => {
        // Arrange        
        var pname = faker.name.firstName()

        // Act
        let petId = await helper.createPetAndGetId(pname) 
        let get_resp = await helper.getPetById(petId)
        let petName = get_resp.name

        // Assert
        assert.equal(pname, petName)
    })
})