import axios from "axios";
//get users from the randomusers api
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCoins: async function() {
    const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', {
      params: {
        dataType: 'json'
      }
    })
    return res;
  },
  getSevenDayChart: function(param) {
    return axios.get('https://api.coingecko.com/api/v3/coins/'+param+'/market_chart?vs_currency=usd&days=7&interval=daily', {
      params: {
        dataType: 'json'
    }
  }).then(res => {
    return res
  })
  },
  getNews: function() {
    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=cryptocurrency&api-key=6GxIXjwyTzJ5a1DyahSEjwreYnmeFySP', {
      params: {
        dataType: 'json'
    }
  }).then(res => {
    // console.log(res);
    return res
  })
  }
}