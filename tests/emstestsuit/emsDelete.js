module.exports = {
  'Delete Test for EMS-APPLICATION' : function (client) {
	  client
      .url('http://172.27.59.18:3010/#/add')
      .waitForElementVisible('body', 1000)
      .end();     
  }
}


