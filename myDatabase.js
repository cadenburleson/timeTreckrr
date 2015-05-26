var db;

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
      thisDB.createObjectStore("timers", { autoIncrement: true });
      console.log('Database-ObjectStore / "timers" / Created = Success');
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


var startDate = Math.floor(Date.now() / 1000);


function addTimerData() {

  var url = $("#itemURL").val();
  var hours = $("#timeLimitHrs").val();
  var minutes = $("#timeLimitMins").val();

  console.log("About to add :" + url + "/" + hours + "/" + minutes);

  //get transaction
  var transaction = db.transaction(["timers"], "readwrite");
  //ask for store
  var store = transaction.objectStore("timers");

  //define a timer
  var timer = {
    url: url,
    hours: hours,
    minutes: minutes
  }

  //perform the add
  // var request = store.put
  var request = store.add(timer);

  request.onerror = function(e) {
    console.log("error", e.target.error.name);
    
  }
  request.onsuccess = function(e) {
    console.log("successfully added a timer");
  }

}

function getTimerData(x) {

  // x = $("#itemURL").val();

  var transaction = db.transaction(["timers"], "readonly");
  var store = transaction.objectStore("timers");

  var getRequest = store.get(x);

  getRequest.onsuccess = function(e) {
    var result = e.target.result;
    console.dir(result);
    // console.log("getTimerData :" + result.url);
  }

}

// function addData() {

//   // loadData();
//   //Get a transaction
//   // open a read/write db transaction, ready for adding the data
//   var transaction = db.transaction(['timers'], 'readwrite');
//   // report on the success of opening the transaction
//   transaction.oncomplete = function(event) { console.log('addData() transaction = success'); };
//   transaction.onerror = function(event) { console.log('addData() transaction = fail'); };
//   //Ask for the objectStore
//   var objectStore = transaction.objectStore("timers");
  
//   newTracker[0].startTime = startDate;
//   newTracker[0].url = itemURL;
//   newTracker[0].hours = timeLimitHrs;
//   newTracker[0].minutes = timeLimitMins;

//   // add our newItem object to the object store
//   var objectStoreRequest = objectStore.put(newTracker[0]);

//   objectStoreRequest.onsuccess = function(event) {
//     // report the success of our new item going into the database
//     console.log('new item added successfully');
//   }

//   getData();

// }//END OF addData(){}


var urls = [];

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


