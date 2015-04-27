
// var idb = window.indexedDB.open('TimerData', 1);
var idb = window.indexedDB.open('TimerData', 1);

var newTracker = [{
    // url: "http://the-site-you-want-to-track.com",
    // hours: 19,
    // minutes: 30,
    url: itemURL,
    hours: timeLimitHrs,
    minutes: timeLimitMins,

}];

idb.onsuccess = function(evt){
  // store the result of opening the database in the db variable. This is used a lot below
  // db = evt.target.result;
  db = idb.result;
  // addData();
  console.log('database successfully created');
};

// This event handles the event whereby a new version of the database needs to be created
// Either one has not been created before, or a new version number has been submitted via the
// window.indexedDB.open line above
// it is only implemented in recent browsers
idb.onupgradeneeded = function(evt) {
  var db = evt.target.result;
  var objectStore = db.createObjectStore("timers", { autoIncrement: true });
  console.log('onupgradeneeded success');
  // Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    // var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
    // addData();
    console.log('object store created');
  }

};

function addData() {

  // open a read/write db transaction, ready for adding the data
  // var transaction = db.transaction(['timers'], 'readwrite').objectStore("timers");
  var transaction = db.transaction(['timers'], 'readwrite');
  
  // report on the success of opening the transaction
    transaction.oncomplete = function(event) {
      console.log('trans success');
    };
    transaction.onerror = function(event) {
      console.log('trans fail');
    };

  // create an object store on the transaction  
  var objectStore = transaction.objectStore('timers');

  objectStore.onerror = function(event) {
    console.log('transaction error');
  };
  objectStore.onsuccess = function(event) {
    console.log('transaction success');
  };

  newTracker[0].url = itemURL;
  newTracker[0].hours = timeLimitHrs;
  newTracker[0].minutes = timeLimitMins;

  // add our newItem object to the object store
  var objectStoreRequest = objectStore.put(newTracker[0]);
  // objectstore.add(newTracker[0]);

  objectStoreRequest.onsuccess = function(event) {
    // report the success of our new item going into the database
    console.log('new item added successfully');
  }

}//END OF addData(){}

