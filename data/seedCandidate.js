var mongoose = require('mongoose');
var cn = require('./constantNames');
var db = require('./schema/location');
var faker = require('faker')
faker.locale = "en_IND";

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 256; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
  function makeAd() {
    var text = "";
    var possible = "abcdef0123456789";
  
    for (var i = 0; i < 40; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  

// var abbParties = ['BJP', 'AITC', 'BSP', 'CPI', 'INC', 'NCP', 'AAP', 'NPP', 'SS', 'SP'];
var parties = [

    ['Bharatiya Janata Party','BJP','url0','F7JoWf6gro5PXhfSlkrBwkjo57CihkxiYoVN0Q0vzvW2OUPUY93GspIWqY6p8H4owW9e4GDB3Di4JJzyuy8USLcONmLYxQEsrJZVUxByvQQkbW8SralXlDAXzaOoMlxVV9NFlYJGsiKczLg1txk7JbHYejZd8vXhbl7WzKiEIR0UqxiWFvWivsze2IShJ2A4w80HaOcv367XYuuNNVTn6LShZlYLkQQ5Tty7iBal1g6eCWQOIpHeAZnFlt64l4B4'],
    ['All India Trinamool Congress','AITC','url1','e16yFTKORA7pnHLciIl2n8INwYk9ApUcHYEl9f2C1nMFPKGhDoZTtRsRF9Sl6GaAxiZVQlHoggpRVUaYzf9sYZa7OZlrIQwn8WX3A1JXcizmHXmJglAG44LPF8CVfjGpzvNbAoLZLGebGDx92IPAoB3HATNOPOndCV1FeSvx5G4aPOawKv4YUXNG3Yb8IndUlRRuId2Op4XFlburTZ7wPWsE3p6HX7RyAaHPZdXIQojjoOCSq0PHxbOjQqoHgRKu'],
    ['Bahujan Samaj Party','BSP','url2','rFiuMF8fVgcxtoU0IW6ZBFLDWK365ZK9SdmpYw878ttvohuauHouai5PlGr0xmcbj6a0ig8jUi7GU1TOoRkgjSKwHR4i7YuYsenQFJNnODI2KMjabJc0PPcFp3hpTbjbO6M99NHXDJgautJyEVUN0Gjydqn2jHSPRCCBfTTbTO7uie5akKvdu5X2HFfcr83cLTRf44oMfKL786A4QwUlUY4BmMRXVMao2yKzIzlhLtQwfZxGvs0X04ZFGkT3qxcD'],
    ['Communist Party of India','CPI','url3','EjkUsnRIHNAgOnvllc9nwL44O8BfHvVtfqpGnoZAHfqJXrtcXy1uY0R27YWJ0Hu5DZ6X00ow1MYnR13cfYBI9OnR8b4HnuCPPT8FGfJaY7zWZp2f8uagBLjfB0K8u9KD4Yq22fkSZcVrDycd1T8sw0yMDfQlCNTWnAqIVuhubUUTccCE8SmVzzo75SMwM7EtWBLKbLhje54cGhe247kykpQxhzonM4u10NAfcomLBLu3s4lAVPhFtUkm62k4Hqrp'],
    ['Indian National Congress','INC','url4','xzojqUBUJWbj66eQkuD514e0cSwVcbAtb9Rrs2n0uRimlkMnw4zSt1LI7O9JCYp3GR4aS4JJQRznd5mNbA1vNsXXNTP1TjUTMsWM8Z4MiRrWhpAJU8m7NgPErd0K1FukBNV3KcsUqYyBLygEOERBG9BsqVZrXBJGZD3zWU68LmPLlEUZnG0TvFTGb7NZoM1pXhcd7uavtWerOSDYnMtdGm22LRmCH7HaTxo8GR46vWxOFrQGv1Zc5xUY1d1HGDgk'],
    ['Nationalist Congress Party','NCP','url5','ypnTZJwusiws0Hlaa1S9dJEbyrW55UrO0JikBbQpdFp3uTfJy1gmnJDjKtH2zaFaBqmvYlSApUC0Z1xI8q37OdybeIHrvJ0tMYP3RRNiIQ1v8WznpPSbBmPoezJOyfw5Q9PPLz4keUbrGhnX53shfRLT14HUX9VUj0BzICiYYSb9GvpT4AJH9yWqwf4UbI1r7KEs0lCUf3aMUhBpxS7Tjk82sCsyuCyjGLoGuK4sKRepQjaeQtebYxc6qN4OSjxO'],
    ['Aam Aadmi Party','AAP','url6','G0GcG9GqWxcQ2FBfwd2YHEDyYJ3uIjFf5OFbCH2luwJ5OaT1mkPt05qUWQN1XjanF7q4O0gpU0cSBcSaTuuXWM1PImCwT3OzYxqpPTjZ6GiLP5o8jI25z7joHvySSpmXVMas9hQpZStJ3RuucaUEcpjs1BIYPZWJk0Pm6uHhbV4vIhZIHXyn1WIAKGhQZbQKmtCD2V059zH37ZAbiyPSyRsXdVZlJElf2g1mkXhW79cluYI7c24EtevAIHTswFcA'],
    ["National People's Party",'NPP','url7','UCiWeAm5zQ2jfi3twEOXgO3PaeYJy1ykQzR79sR9hPCiPSwlTI9E9Tegt5MCVBV28DgUYl0vUbXGiobYhf4OBSVa4IjfNrNDP32DxXtXB8SgpG84m7jkKkIUnM7zDSArctO8y5tKoAnmmjMu2MYBqjY61r2rVdMVZRC1B1JHrBPsqkBiQSjAhDsFc2nHP1Kth2zczAiwuPXTdTwoDylpnGI6Cc9tdLf0wtKO4tUJx4ealvgUYXDZyDkOtDkn19YE'],
    ['Shiv Sena','SS','url8','0Jz8yt58G5LK7gHcn8o1T5HBXBEvXX9yeFlBaRBkDbzopcRXiIqeXgc49hA2x6XAwk6PgyXmHvRo5ICYHxqaiqQfwXrwrWvlGjvV4S3YWhzy9soqUbg0iQPIjsbsptP07JTNUyCniXTdO8kDk3hTxHhDNx6pbvm0pbyxsdkEGh6qkxNkSdUPgriFy6hd1SblOBqOcRx4flhR7IMurkKrGf3Yl0AN8qp206SCPuVcAIOAc0iVREWz3ZeziQMI6tu9'],
    ['Samajwadi Party','SP','url9','rNRnPfv7DuswtUEfT6ULXPWEV0r59J66AsIMSLAC8jOTHZg1yrlSunNItC7WQsM59yjKIaQKq6F2eqb9m0eSWw243QUjtYxXgJTAMWGPlUfKNjKOPNcDCcfU4qvx4m72UNOdkkoNxfSAX0M24Ehn8yxTVaAOnFFzMDVNI1cgMPJKGevrOQDmGWVJYAuimqcThCCYKkFOGz0tDvnjz2bQKRGI649s3zWUnlYXQgY5W4S9BUTlR4snftpUNTQpR4Pg']
]

// a copy to make changes and shuffle 
var PAR = parties
// var symbol = [
//     'stringUrl',
//     'stringUrl',
//     'stringUrl',
//     'stringUrl',
//     'stringUrl',
//     'stringUrl',
//     'stringUrl',
//     'stringUrl',
//     'stringUrl',
//     'stringUrl',
//     'stringUrl',
// ]

str = JSON.stringify(cn);
console.log(str);
str = JSON.stringify(cn, null, 4); // (Optional) beautiful indented output.
var cnt = 1;
for (var i = 0; i < 500; ) {
    PAR.sort( function() { return 0.5 - Math.random() } );

    faker.seed(i);

    var location = new campaign({
        name: "location" + (cnt),
        locationName : faker.address.streetName(),
        chairPName : faker.name.findName(),
        ChairPAdd : makeAd(),
        })
    cnt++;
    faker.seed(501 + i);

    while (1) {

        candi = {
            name: faker.name.findName(),
            candidateId : makeAd(),
            party: {
                name: PAR[i % 10][0],

                abb: PAR[i % 10][1],

                symbol: PAR[i % 10][2],
                partyId : PAR[i%10][3]
            }
        }
        location.candidates.push(candi)
        i++;
        if (i % 5 == 0) {
            break;
        }
    };



    console.log(location)
    location.save(function(err) {
        if (err) return handleError(err);
        // saved!
    });
}