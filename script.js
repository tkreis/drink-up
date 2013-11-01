var lastReminder = new Date().getTime();
function checkReminder(){
var currentTime = new Date().getTime();
 if((currentTime-lastReminder)/1000/60 >= 1 ){
   lastReminder = currentTime;
   if(document.getElementById('water-reminder') === null){
     createReminder();
   }
  }
    
     setTimeout( checkReminder , 1000)
}


function createReminder(){
   var notifier = document.createElement('div');
   var closeBtn= document.createElement('a');

   closeBtn.textContent = "Ok Ok, I'll go";
   notifier.textContent  = 'Drink up, and get new water';
   notifier.id = 'water-reminder';
   notifier.className= 'water-reminder';
   notifier.appendChild(closeBtn);
   window.document.body.appendChild(notifier);

   closeBtn.addEventListener('click', function(){
     closeBtn.removeEventListener('click');
     notifier.parentNode.removeChild(notifier);
   });
}


 checkReminder();
