var notifier, closeBtn;

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.msg == "new")
      if(!hasReminderVisible()){
        createReminder();
      }
      if(request.msg == 'closed'){
        removeNotifier();
      }
  });

  function hasReminderVisible(){
    return !(document.getElementById('water-reminder') === null);
  }


  function createReminder(){
    notifier = document.createElement('div');
    closeBtn= document.createElement('a');

    closeBtn.textContent = "Ok Ok, I'll go";
    notifier.textContent  = 'Drink up, and get new water';
    notifier.id = 'water-reminder';
    notifier.className= 'water-reminder';
    notifier.appendChild(closeBtn);
    window.document.body.appendChild(notifier);

    closeBtn.addEventListener('click', function(){
      removeNotifier();
    });
  }

  function removeNotifier(){
    closeBtn.removeEventListener('click');
    notifier.parentNode.removeChild(notifier);

    chrome.extension.sendMessage({msg: "closed"});
  }
