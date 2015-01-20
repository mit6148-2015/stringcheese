
var countryIDList = ["23424853", "23424977", "23424775", "23424768", "23424856", "23424910", "23424936", "23424740", "23424900", "23424942", "23424748", "23424950", "23424829"];
var countryList = ['Italy', 'United States', 'Canada', 'Brazil', 'Japan', 'Norway', 'Russia', 'Algeria', 'Mexico', 'South Africa', 'Australia', 'Spain', 'Germany'];
var countryHashtag = [];

function getHashtagFromDB(){
setTimeout(createMap, 1000);
countryIDList.forEach(function(countryID){
    Meteor.apply("getHashtag", [EJSON.parse(countryID)], [true], function(err, result){
      console.log("Error: " + err);
      console.log("Result: "+ result);
      countryHashtag.push(result);
    });  
});
}

getHashtagFromDB();


var mapInfo = [['Country', 'hashtag']];
function createMap(){
  for(var i =0; i<countryList.length; i++){
    console.log(countryHashtag[i]);
    mapInfo.push([countryList[i], countryHashtag[i]]);
  }
  google.load('visualization', '1', {packages: ['geochart'], callback: drawMap});
}


function drawMap() {
  var data = google.visualization.arrayToDataTable(mapInfo);

  var options = {
      width: 834,
      height: 650,
      dataMode: 'regions',
      backgroundColor: '#129793', /* light blue */
      keepAspectRatio: true,
      width: $(window).width(),
      datalessRegionColor: '#408640' /* green */
  };
  options['colors']=['#FF7260','#FFD800'];

  var container = document.getElementById('regions_div');
  //if(container!=null){
  var chart = new google.visualization.GeoChart(container);
  google.visualization.events.addListener(chart, 'select', myClickHandler);
  chart.draw(data, options);
      
      // alerts
      // tells you row and column
  function myClickHandler(){
    var selection = chart.getSelection();
    var message;
    for (var i = 0; i < selection.length; i++) {
      var item = selection[i];
      if (item.row != null && item.column != null) {
        message = item.row;
        // message += '{row:' + item.row + ',column:' + item.column + '}';
      } else if (item.row != null) {
        message = item.row;
        // message += '{row:' + item.row + '}';
      } else if (item.column != null) {
        message = item.column;
        // message += '{column:' + item.column + '}';
      }
    }
    // if (message == '') {
    //     message = 'nothing';
    // }
    var countryClicked = countryList[message];
    window.location.assign("/country/"+countryClicked);
    //  alert('You selected ' + countryClicked);
  }
    

  
}