var axios = require('axios')
const ISBNAPI = "https://isbn.market.alicloudapi.com/ISBN";
const APPCODE = process.env.ALIYUN_APP_CODE;

const isbnModel = {
    getIsbn: function(isbn){
        return axios.get(ISBNAPI,{
            params: {
                "isbn": isbn, 
              },
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `APPCODE ${APPCODE}`
              }
        })
    }
}


module.exports = isbnModel;
