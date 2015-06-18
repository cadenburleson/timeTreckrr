var db;

// Used to get a hold of specific timers by their int in the database
// increment along with the creation of a new timer so that it stays consistant
var timerInt = 0;

var startDate = Math.floor(Date.now() / 1000);

// Used to access all your trackers (arrays)
// var newTracker = [{
//   url: itemURL,
//   hours: timeLimitHrs,
//   minutes: timeLimitMins
// }];

function indexedDBOk(){
  return "indexedDB" in window;
}

// Checks if you can use indexedDB
document.addEventListener("DOMContentLoaded", function() {
  // No IndexedDB suppport.
  if (!indexedDBOk) return;

  // Opens a request to open a database
  var DBOpenRequest = window.indexedDB.open("TimerData", 1);

  // This event handles the event whereby a new version of the database needs to be created
  // Either one has not been created before, or a new version number has been submitted via the
  // window.indexedDB.open line above
  // it is only implemented in recent browsers
  DBOpenRequest.onupgradeneeded = function(evt) {
    var thisDB = evt.target.result;

    console.log("Database Upgraded = Success");

    // Only able to define object stores in this function so I've heard?
    if (!thisDB.objectStoreNames.contains("timers")) {
      var objectStore = thisDB.createObjectStore("timers", { autoIncrement: true });
      console.log('Database-ObjectStore / "timers" / Created = Success');
      // First arg is name of index, second is the path
      objectStore.createIndex("timers", "url", {unique : true});
      // os.creatIndex("url", "url", { unique : true });

    }

  }

  // Returns the open database onsucess
  DBOpenRequest.onsuccess = function(evt) {
    // store the result of opening the database in the db variable. This is used a lot below
    // db = DBOpenRequest.result;
    db = evt.target.result;

    console.log("Database Created = Success");
    console.dir(evt.target.result);
    console.log("Current Object Stores : ");
    console.dir(db.objectStoreNames);
  };

  DBOpenRequest.onerror = function(evt) {
    console.log('Database Created = Failed');
  }

}, false);


function deleteTimerDatabase() {
  var deleteData = indexedDB.deleteDatabase('TimerData');
  console.log('Timer Database Deleted Successfully');
};

function addTimerData() {

  var url = $("#itemURL").val();
  var hours = $("#timeLimitHrs").val();
  var minutes = $("#timeLimitMins").val();

  console.log("About to add :" + url + "/" + hours + "/" + minutes);

  //get transaction
  var transaction = db.transaction(["timers"], "readwrite");
  //ask for store
  var store = transaction.objectStore("timers");

  console.log("store Index Names = " + store.indexNames);
  // console.log(objectStore.indexNames);

  //define a timer
  var timer = {
    url: url,
    hours: hours,
    minutes: minutes
  }

  //perform the add
  // var request = store.put
  // var request = objectStore.add(timerData[i]);
  var request = store.add(timer);
  
  request.onerror = function(e) {
    console.log("error", e.target.error.name);
    console.dir(e.target);
  }
  request.onsuccess = function(e) {
    timerInt ++;
    console.log("timerInt : " + timerInt);
    console.log("successfully added a timer");
  }

}
  
var timerName;

//maybe name TimerData
//So that you can do
// TimerData.getMinutes
function getTimerData() {

  var url = $("#itemURL").val();
  var hours = $("#timeLimitHrs").val();
  var minutes = $("#timeLimitMins").val();

  var transaction = db.transaction(["timers"], "readonly");
  var store = transaction.objectStore("timers");

  var getRequest = store.get(timerInt);

  getRequest.onsuccess = function(e) {
    var result = e.target.result;

    console.log("url : " + url);
    console.log("hours : " + hours);
    console.log("minutes : " + minutes);

    console.dir(result);

    function getUrl() {

    }
    function getHours() {

    }
    function getMinutes() {

    }

    // console.log("getTimerData :" + result.url);
  }

}

// Timers.getTimer.byName
// Timers.getTimer.byHash

function Timers() {
  var timersArray = [];
  function getTimer() {
    var myTimer;
    function byHash(){
    }
    function byName(){
    }

  }
}

function getAllTimersFromDataBase() {

  // var myTimers = [];
  var myTimersByUrl = [];
  var myTimersByKey = [];
  
  var transaction = db.transaction(["timers"], "readonly");
  var store = transaction.objectStore("timers");

  store.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      myTimersByUrl.push(cursor.value.url);
      myTimersByKey.push(cursor.key);
      cursor.continue();
    }
    else {
      console.dir("All your timer info by Url : " + myTimersByUrl);
      console.dir("All your timer info by Key : " + myTimersByKey);
    }
  };

  // function byUrl() {
  //     store.openCursor().onsuccess = function(event) {
  //     var cursor = event.target.result;
  //     if (cursor) {
  //       myTimersByUrl.push(cursor.value.url);
  //       cursor.continue();
  //     }else {
  //       console.dir("All your timer info by Url : " + myTimersByUrl);
  //     }
  //   };
  // }


  // function byKey() {
  //     store.openCursor().onsuccess = function(event) {
  //     var cursor = event.target.result;
  //     if (cursor) {
  //       myTimersByKey.push(cursor.key);
  //       cursor.continue();
  //     }else {
  //       console.dir("All your timer info by key : " + myTimersByKey);
  //     }
  //   };
  // }

}

function getData() {

  var objectStore = db.transaction("timers").objectStore("timers");
  // var request = objectStore.get(newTracker.url);

  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      alert("Name for SSN " + cursor.key + " is " + cursor.value.newTracker[0].itemURL);
      cursor.continue();
    }
    else {
      alert("No more entries!");
    }
  };


}


