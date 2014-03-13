function initialize() {

    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var points = [];
    var pointArray = new google.maps.MVCArray();
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    nite.init(map);
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointArray
    });

    heatmap.set('gradient', [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]);
    heatmap.setMap(map);

    var index = 0;
    var socket = io.connect(window.location.origin)
    var max = 400;

    socket.on('tweet', function(data){
        /*var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data.geo.coordinates[0], data.geo.coordinates[1]),
            map: map,
            title: data.text
        });

        marker.setMap(map);
        console.log(marker);*/
        if(pointArray.getLength() < max){
            pointArray.push(new google.maps.LatLng(data[1], data[0]));
        } else {
            pointArray.setAt(index % max, new google.maps.LatLng(data[1], data[0]));
        }
        index++;
    })
}



google.maps.event.addDomListener(window, 'load', initialize);
