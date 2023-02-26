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

    createOrder: async function (petId) {
        var url = "https://petstore.swagger.io/v2/store/order"
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSONbig.stringify({
            "id": 0,
            "petId": petId,
            "quanity": "1",
            "shipDate": this.getFullQualifgiedDate(),
            "status": "placed",
            "complete": true
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = await fetch(url, requestOptions)
        return await response.text()
    },

    getOrder: async function (orderId = '9') {
        var url = "https://petstore.swagger.io/v2/store/order/" + orderId
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const response = await fetch(url, requestOptions)
        return await response.text()
    },

    getPet: async function (petId) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch("https://petstore.swagger.io/v2/pet/" + petId, requestOptions)
        return await response.text()
    },

    createPetAndGetId: async function (pname) {
        let createPetApiResp = await this.createAnimal(pname)
        let createPetApiResp_json = JSONbig.parse(createPetApiResp)
        return createPetApiResp_json.id.toString()
    },

    getPetById: async function (petId) {
        let getPetApiResp = await this.getPet(petId)
        return JSONbig.parse(getPetApiResp)

    },
    getFullQualifgiedDate: function () {
        let today = new Date();
        var month = this.getFormattedMonth(today);
        var date = this.getFormattedDate(today);
        let year = today.getFullYear().toString();
        let hour = this.getFormattedHour(today);
        let min = this.getFormattedMin(today);
        let sec = this.getFormattedSec(today);
        let milliseconds = this.getFormattedMilliSec(today);
        return year + '-' + month + '-' + date + 'T' + hour + ':' + min + ':' + sec + '.' + milliseconds + 'Z'
    },

    getFormattedMonth: function (today) {
        let raw_month = today.getMonth();
        let raw_month_w_offset = raw_month + 1;
        if (raw_month_w_offset < 10) {
            return '0' + raw_month_w_offset.toString();
        }
        else {
            return raw_month_w_offset.toString();
        }

    },

    getFormattedDate: function (today) {
        let raw_date = today.getDate();
        if (raw_date < 10) {
            return '0' + raw_date.toString();
        }
        else {
            return raw_date.toString();
        }

    },

    getFormattedHour: function (today) {
        let raw_hour = today.getHours();
        if (raw_hour < 10) {
            return '0' + raw_hour.toString();
        }
        else {
            return raw_hour.toString();
        }

    },

    getFormattedMin: function (today) {
        let raw_min = today.getMinutes();
        if (raw_min < 10) {
            return '0' + raw_min.toString();
        }
        else {
            return raw_min.toString();
        }

    },

    getFormattedSec: function (today) {
        let raw_sec = today.getSeconds();
        if (raw_sec < 10) {
            return '0' + raw_sec.toString();
        }
        else {
            return raw_sec.toString();
        }

    },

    getFormattedMilliSec: function (today) {
        let raw_millisec = today.getMilliseconds();
        if (raw_millisec < 10) {
            return '0' + raw_millisec.toString();
        }
        else {
            return raw_millisec.toString();
        }

    }

}