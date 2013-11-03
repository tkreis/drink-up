(function(){

  var notifier, closeBtn;
  var closeText = "Ok, Ok. I'll go";
  var notificationText = "Drink up and get new water";
  var notificationId = 'water-reminder';
  var notificationClass = 'water-reminder';

  createListeners();

  function createListeners(){
    chrome.extension.onMessage.addListener(
      function(request, sender, sendResponse) {
        switch(request.msg){
          case 'new': 
            executeCreateNotifierRequest();
            break;
          case 'closed':
            executeCloseNotifierRequest();
            break;
        }
      });
  }

  function executeCloseNotifierRequest(){
    removeNotifier();
  }

  function executeCreateNotifierRequest(){
    if(!hasReminderVisible()){
      createReminder();
    }
  }

  function hasReminderVisible(){
    return !(document.getElementById('water-reminder') === null);
  }


  function createReminder(){
    var notifier = createNotificationWrapper(); 
    notifier.appendChild(createCloseBtn());
    window.document.body.appendChild(notifier);
  }

  function createNotificationWrapper(){
    notifier = document.createElement('div');
    title = document.createElement('h1');

    title.textContent  = notificationText;
    notifier.id = notificationId;
    notifier.className = notificationClass;
    notifier.appendChild(title);
    return notifier;
  }

  function createCloseBtn(){
    closeBtn = document.createElement('a');
    closeBtn.textContent = closeText;
    closeBtn.addEventListener('click', function(){
      removeNotifier();
    });
    return closeBtn;
  }

  function removeNotifier(){
    closeBtn.removeEventListener('click');
    notifier.parentNode.removeChild(notifier);

    chrome.extension.sendMessage({msg: "closed"});
  }
})();
