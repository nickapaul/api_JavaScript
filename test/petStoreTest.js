const { assert } = require('chai');
var faker = require('faker');
const helper = require('../helpers/petStoreHelper');
var JSONbig = require('json-bigint');

describe('Pet Store API tests', () => {
    it('Given pet is created then pet is retrieved by Id', async () => {
        // Arrange        
        var pname = faker.name.firstName()

        // Act
        let petId = await helper.createPetAndGetId(pname)
        let get_resp = await helper.getPetById(petId)
        let petName = get_resp.name

        // Assert
        assert.equal(pname, petName)
    })

    it('Create order for pet and retreive an order', async () => {
        // Arrange        
        let petId = 9223372036854673178;

        // Act
        let order_resp = await helper.createOrder(petId)
        let order_resp_json = JSONbig.parse(order_resp)
        let get_resp = await helper.getOrder('9') // the test API is use only allows digits less than 10 for order ID so this is not a real -
        //                                           world get (im useing a different order for assertions)
        let get_resp_json = JSONbig.parse(get_resp)

        // Assert
        assert.equal(get_resp_json.id, 9)
        assert.equal(get_resp_json.petId, 19)
        assert.equal(get_resp_json.status, 'placed')

    })
})