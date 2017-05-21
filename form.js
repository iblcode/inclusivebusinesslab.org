const google = require('googleapis')
const express = require('express')

module.exports = () => {
  const app = express();

  app.get('/form', (req, res) => {
    query( 'get', {}, (response) => {
      if ( !("values" in response) ) { return res.status(500).send("error") }

      query( 'set', response, (updated) => {
        if ( !("updatedCells" in updated) ) { return res.status(500).send("error") }
        console.log("id", parseInt(response.values[0][0]))

        res.json({
          "id": parseInt(response.values[0][0])
        })
      })

    })
  })

  app.get('/schools', (req, res) => {
    query( 'getSchools', {}, (response) => {
      if ( !("values" in response) ) { return res.status(500).send("error") }
      parseResponse(response)
      res.json({
        "content": parseResponse(response)
      })

    })
  })

  app.get('/cities', (req, res) => {
    query( 'getCities', {}, (response) => {
      if ( !("values" in response) ) { return res.status(500).send("error") }
      parseResponse(response)
      res.json({
        "content": parseResponse(response)
      })

    })
  })

  return app
}

function query( type, data, callback ) {
  let jwtClient = new google.auth.JWT( key.client_email, null, key.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'], null )

  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err)
      return callback(err)
    }
    if ( type == 'get' ) { queryData( callback, jwtClient ) }
    if ( type == 'set' ) { setData( callback, jwtClient, data ) }
    if ( type == 'getSchools' ) { queryList( callback, jwtClient, 'schools!A:C' ) }
    if ( type == 'getCities' ) { queryList( callback, jwtClient, 'cities!A:B' ) }

  })
}

function queryData( callback, jwtClient ) {
  const sheets = google.sheets('v4')

  var request = {
    spreadsheetId: '1wCgP9s4PXeq7vRmJhUm_LNYu6iutboFozOIehX71yeQ',
    range: 'id!A2',
    valueRenderOption: 'FORMATTED_VALUE',
    auth: jwtClient
  }

  sheets.spreadsheets.values.get(request, function(err, response) {
    if (err) {
      console.log(err)
      return callback(err)
    }

    //console.log(JSON.stringify(response, null, 2));
    callback(response)
  })
}

function setData( callback, jwtClient, data ) {
  const sheets = google.sheets('v4')

  var resource = Object.assign({}, data)
  resource.values[0][0] = parseInt(data.values[0][0])+1

  var request = {
    spreadsheetId: '1wCgP9s4PXeq7vRmJhUm_LNYu6iutboFozOIehX71yeQ',
    range: 'id!A2',
    valueInputOption: 'RAW',
    resource: resource,
    auth: jwtClient
  }

  sheets.spreadsheets.values.update(request, function(err, response) {
    if (err) {
      console.log(err)
      return callback(err)
    }

    //console.log(JSON.stringify(response, null, 2));
    callback(response)
  })
}

function queryList( callback, jwtClient, range ) {
  const sheets = google.sheets('v4')

  var request = {
    spreadsheetId: '1wCgP9s4PXeq7vRmJhUm_LNYu6iutboFozOIehX71yeQ',
    range: range,
    valueRenderOption: 'FORMATTED_VALUE',
    auth: jwtClient
  }

  sheets.spreadsheets.values.get(request, function(err, response) {
    if (err) {
      console.log(err)
      return callback(err)
    }

    // console.log(JSON.stringify(response, null, 2));
    callback(response)
  })
}

function parseResponse(response) {
  var answer = []

  // get keys
  var keys = response.values[0]

  for( var i=1; i<response.values.length; i++ ) {
    var item = {}

    for( var ii=0; ii<keys.length; ii++ ) {
      item[keys[ii]] = (response.values[i][ii] || 'undefined' )
    }

    answer.push(item)
  }

  return answer
}








const key = {
  "type": "service_account",
  "project_id": "ibl-id-api",
  "private_key_id": "ba508ab1bea288b0097e84dbcf90785b644f75cd",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCXMuu0N490nCb3\nJHnmiQMVcOU+KWxhhtvMO5P4tHEgOpjpoPas7qzXsDH/gxgs2yV1sZ3ISfsmEBMb\nZsWz0y8mZZGW0P0OlU2tny3WLpWeu5stPez8SkZmzDPQ1DgCflpiSu1aBDDdDL5q\n8hZ0enrFQDpcpBbLuPZtr9yPSrR/82PuMbPXS7ki579m/T5idpDCdLMMlH8oUDCS\ng2c8YUj5yHVR7M0xTXxv9PcC3ag9OKRpC9sJh8FtqudAlD8pq55ke85THjj4TjSo\nFXg1ZCeCfG9CETWcxYo5Jc4Fba3NX/USuX8zPFsUQK8DewUTV2N8qSRQm+A8NA+S\nRIeMpSH/AgMBAAECggEACBEDzJX4pbeW+v4Ll6Y21eczmidkZg4BBMDA89A2OnC/\neID8tNxe63ro9lrGG86G2kqWW/mM2DECjYzkGBeFbAtkwwkPSlhI0DrhaFkMsaIM\nqCAMcdri+qUDHRPVXe/jxPUX+89xbYZtukLqhvhQO6nIWbaFyNFrXdq3oT8F3Jv7\nvoQZE2XRLWdkwEeScywrxTXHDqkyXgLR0FrLYzFsxXvRQfdTVO9kBk64z8urdp1t\nrThXDeCqGAq+EZut7nh+IYfCFDakiUr3iC7rG4GrMM1/QXZu1wrwUJCc3VY1dzA2\nWWv1KksB4O15yc4McaoavNZl21OOsf9el3xXdRx04QKBgQDQNu7nnrSDltlFbT6X\na08aDU1zyNw1SChlbE/3EiS07g5aKMs3hdzJeoEWHKFK2wmT2n5pqmUfBBOEkOXG\nWds+f39moqr2uYOCwAvnQVaZkAyKV9zwdJRQd8SH0XeoY56vEiE7MbbKeeFsomSl\njM4H5kT7+5YLdsNIX9VyY+kJ6QKBgQC55jDQ4qevYW5aBI6vUP3HB4NOhTeGaW0D\nHnut7shW+VIcfpP5OjEpzKFPGUcM4ZskgzeU8JEyKUYa76JSdrhnIHJ9mSSvSVef\nmwIXYUvTpT57eBCxeG0ixZ4HTDDb7Yq+wFDofoHVMtSPmpcaDEBYLgQh4TwKT8nx\nqNUjZ0xzpwKBgHMtgBiWXSrRnlzeYppmXPp/U1HyUYYT5Wy9brqwyadgbIYJPOj4\n3rqBTrkJm1uKMREd84HGJWvz2Ewjz0da24IGC1aeM06KLqp8S9lf9mS6H4XDts84\n3fZpWkj7YWK/wL79m25gQMpeg4mRh3Vgn3QVOCHf+Q9cYgg+IxfFFttJAoGBAIMy\nPclt7MINlP/ar4hzNGc+miDUS7eEt/a3kLnUB3e6RYTuoCgINaI2VLGqOUaSAhfm\ns1dd4FryXhOsg3aHauT9NVAGwKkkrb5qezNc61LXEB27Qqy9POiJZ1nnH6RXJNAy\nkedDQQXh9bnTdEhh1RdmgmwWtXThkrgGW0W9JWuJAoGBAIO6Ekoc44UTIR4GewmH\nZ+c943kF82FA4KenEaP0jTn75i1oiHiLMa11Ybeu4PhEgR1jPrzmhC/JAr8AedrT\n+H2jKDdBsIS/7HntfsIorVQo6eawPSH8V8nHek7M6AaMaXCnwf5ZNcY5yv6tYmfq\nPYcq0H22i8jOjvM5PNcK9vv6\n-----END PRIVATE KEY-----\n",
  "client_email": "iblidapi@ibl-id-api.iam.gserviceaccount.com",
  "client_id": "104532168113454158139",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/iblidapi%40ibl-id-api.iam.gserviceaccount.com"
}
