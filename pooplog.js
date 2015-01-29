(function () {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "pooplog.json", true);
	xhr.onreadystatechange = function () {
		if (this.readyState !== (this.DONE || 4)) {
			return;
		}

		var poops = JSON.parse(xhr.responseText);

		google.load("visualization", "1", {
		    packages: ["corechart"]
		});
		google.setOnLoadCallback(drawChart);
		
		function drawChart() {
			var i, data = [['Pooping Time', 'Time (minutes)']];
		
			for (i = 0; i < poops.length; i += 1) {
				data.push([(new Date(poops[i].date)).toString(), poops[i].duration / 60000]);
			}
		
		    data = google.visualization.arrayToDataTable(data);
		
		    var options = {
		        title: 'Time Spent Pooping',
		        legend: {
		            position: 'none'
		        },
		    };
		
		    var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
		    chart.draw(data, options);
		}
	};
	xhr.send();

}());
