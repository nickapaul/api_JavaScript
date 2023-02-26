var JSONbig = require('json-bigint');
module.exports = {
    createAnimal: async function (pname) {
        var url = "https://petstore.swagger.io/v2/pet"
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "id": 0,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": pname,
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = await fetch(url, requestOptions)
        return await response.text()
    },

    getPet: async function (petId){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          const response = await fetch("https://petstore.swagger.io/v2/pet/" + petId, requestOptions)
          return await response.text()
    },

    createPetAndGetId: async function(pname){
        let createPetApiResp = await this.createAnimal(pname)
        let createPetApiResp_json = JSONbig.parse(createPetApiResp)
        return createPetApiResp_json.id.toString()
    },

    getPetById: async function(petId){
        let getPetApiResp = await this.getPet(petId)
        return JSONbig.parse(getPetApiResp)

    }

}