Template.map.rendered = function(){
  var countryIDList = ["23424853", "23424977", "23424775", "23424768", "23424856", "23424910", "23424936", "23424740", "23424900", "23424942", "23424748", "23424950", "23424829", "23424909", "23424848", "23424846", "23424934", "23424969", "23424787", "23424982", "23424868", "23424747", "23424984", "23424901", "23424938", "23424960", "23424803"];
  var countryList = ['Italy', 'United States', 'Canada', 'Brazil', 'Japan', 'Norway', 'Russia', 'Algeria', 'Mexico', 'South Africa', 'Australia', 'Spain', 'Germany', 'Netherlands', 'India', 'Indonesia', 'Philippines', 'Turkey', 'Colombia', 'Venezuela', 'South Korea', 'Argentina', 'Vietnam', 'Malaysia', 'Saudi Arabia', 'Thailand', 'Ireland'];
  var countryHashtag = [];

  function getHashtagFromDB(){
    setTimeout(createMap, 1000);
    countryIDList.forEach(function(countryID){
        Meteor.apply("getHashtag", [EJSON.parse(countryID)], [true], function(err, result){
          // console.log("Error: " + err);
          // console.log("Result: "+ result);
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
      height: 600,
      dataMode: 'regions',
      backgroundColor: '#FFF',/* white */
      keepAspectRatio: true,
      width: $(window).width(),
      datalessRegionColor: '#F1F1F1' /* light grey */
  };

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
};
