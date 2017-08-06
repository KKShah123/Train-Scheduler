
$(document).ready(function(){
 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB1M9DgKGNFe_rq4hS79fVINovYTAoZQqQ",
    authDomain: "train-schedule-a18ef.firebaseapp.com",
    databaseURL: "https://train-schedule-a18ef.firebaseio.com",
    projectId: "train-schedule-a18ef",
    storageBucket: "train-schedule-a18ef.appspot.com",
    messagingSenderId: "373166613164"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;



$("#addTrain").on("click", function() {

  trainName = $('#nameInput').val().trim();
  destination = $('#destInput').val().trim();
  firstTrainTime = $('#timeInput').val().trim();
  frequency = $('#freqInput').val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

    return false;
});


// MAIN PROCESS + INITIAL CODE
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  // update the variable with data from the database
  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrainTime = snapshot.val().firstTrainTime;
  frequency = snapshot.val().frequency;


  // moment.js methods for time calls and calculations.
  var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
  var nowMoment = moment(); 
  // creates a moment object of current date and time and storing it in a variable whenever the user click the submit button

  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");


  // add table
  var tr = $('<tr>');
  var a = $('<td>');
  var b = $('<td>');
  var c = $('<td>');
  var d = $('<td>');
  var e = $('<td>');
  a.append(trainName);
  b.append(destination);
  c.append(frequency);
  d.append(formatNextArrival);
  e.append(minutesAway);
  tr.append(a).append(b).append(c).append(d).append(e);
  $('#newTrains').append(tr);


  });
});

