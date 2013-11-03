(function(){

  var lastReminder = new Date().getTime();

  checkReminder();
  createResponseListener();

  function checkReminder(){
    var currentTime = new Date().getTime();
    if((currentTime-lastReminder)/1000/60/60 >= 1 ){
      lastReminder = currentTime;
      updateTabs('new');
    }
    setTimeout( checkReminder , 1000)
  }


  function updateTabs(msg){
    chrome.tabs.query({}, function(tabs) {
      for(tab in tabs){
        chrome.tabs.sendMessage(tabs[tab].id, {msg: msg});
      }
    });
  }

  function createResponseListener(){
    chrome.extension.onMessage.addListener(
      function(request, sender, sendResponse) {
        if (request.msg == 'closed'){
          updateTabs(request.msg);
        }
      });
  }
})();
