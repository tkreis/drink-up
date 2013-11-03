var lastReminder = new Date().getTime();
function checkReminder(){
  var currentTime = new Date().getTime();
  if((currentTime-lastReminder)/1000 >= 1 ){
    lastReminder = currentTime;
    updateTabs('new');
  }
}
setTimeout( checkReminder , 1000)
}




function updateTabs(msg){
  chrome.tabs.query({}, function(tabs) {
    foreach(tab in tabs){
      chrome.tabs.sendMessage(tab.id, {greeting: msg}, function(response) {
        console.loge('ok thanks');
        debugger;
      });
    }
  });
}
