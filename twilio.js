"use strict";


function TwilioApp() {
  this.accountId = "AC44f8f56343c7fc28b19603c990f51af9";
  this.authToken = "a0e2307cc8f58d3302e2c31fb371de21";
  this.fromNumber = "+14243060969";

  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  this.initialize();

  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  initialize: function() {
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },


  validateMessageField: function(textStr) {
    if (textStr === "" || textStr === " ")
      return false;
    return true;
  },
  validatePhoneField: function(phoneStr) {
    if (phoneStr < 10000000000)
      return false;
    for (var dig in phoneStr)
    {
      if (typeof(dig) !== Number)
        return false;
    }
    return true;
  },
  handleMessageSend: function(event) {
    event.preventDefault();
    console.log("handleMessageSend");
    var message = this.messageInputField;
    var phoneNumber = this.phoneInputField;
    if (!this.validateMessageField(message) || this.validatePhoneField(phoneNumber))
      throw ('Error, invalid input');

    this.sendMessage(message, phoneNumber)

  },
  displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  },
  sendMessage: function(message, toNumber) {
    var account= "AC44f8f56343c7fc28b19603c990f51af9";
    var token ="a0e2307cc8f58d3302e2c31fb371de21";
    var fromNumber= +14243060969;
    //var toNumber =  +16262433867;
    $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
    success: function(x) {
      this.displayMessage(toNumber, message);
    },
    error: function(err) {
      alert("Error: invalid input");
    },
    method: 'POST',
    data: {
      From: fromNumber,
      To: toNumber,
      Body: message
    },
    headers: {
      "Authorization": "Basic " + btoa(account + ":" + token)
    }
  });
    // console.log("sendMessage");
    // $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + "AC44f8f56343c7fc28b19603c990f51af9" + '/SMS/Messages', {
    //   success: function(x) {
    //     console.log("success");
    //     this.displayMessage(toNumber, message);
    //     this.messageInputField.text("");
    //     console.log('Message sent', x);
    //   },
    //   error: function(err){
    //     console.log("failire");
    //     alert("Uh-oh. Something went wrong. :(");
    //   },
    //   method: 'POST',
    //   data: {
    //     From: 14243060969,
    //     To: toNumber,
    //     Body: message
    //   },
    //   headers: {
    //     "Authorization": "Basic " + btoa("AC44f8f56343c7fc28b19603c990f51af9" + ":" + "a0e2307cc8f58d3302e2c31fb371de21")
    //   }
    // });
  }

};



window.twilio = new TwilioApp();
