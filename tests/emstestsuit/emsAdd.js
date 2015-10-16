module.exports = {
	
  'Test for EMS-APPLICATION' : function (client) {
    client
      .url('http://172.27.59.18:3010/#/add')
      .waitForElementVisible('body', 1000)
      .assert.title('Employee Application')
      .assert.visible('input')
      .setValue('input[name=code]', '1234')
	  .setValue('input[name=name]', 'Navin')
	  .setValue('input[name=city]', 'chennai')
      .waitForElementVisible('input[id=btn_add1]', 1000)
      .click('input[id=btn_add1]')
     
  },
  'List of Employees' : function(client,browser){
	  client
	  .url('http://172.27.59.18:3010/#/add')
	  .waitForElementVisible('body', 1000)
	  .assert.title('Employee Application')
	.end();
	}
}
