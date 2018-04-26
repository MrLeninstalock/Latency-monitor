labels = []
donnee = []



function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function drawLine() {

    recupData()
    recupLabels()

    

    window.myLine = new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label :'Latency (ms)',
                data: donnee,
                backgroundColor: [
                    'rgba(6, 0, 173, 0.2)'
                ],
                borderColor: [
                    'rgba(6, 0, 173, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                xAxes: [{
                    type: 'time',
                    distribution: 'linear',
                    displayFormats: {
                        millisecond: 'h:mm:ss.SSS a'
                    }
                }]
            },
            title: {
                display: false,
                text: 'Latency between you and Google.fr'
            },
            pan: {
                // Boolean to enable panning
                enabled: true,
    
                // Panning directions. Remove the appropriate direction to disable 
                // Eg. 'y' would only allow panning in the y direction
                mode: 'xy'
            },
    
            // Container for zoom options
            zoom: {
                // Boolean to enable zooming
                enabled: true,
    
                // Zooming directions. Remove the appropriate direction to disable 
                // Eg. 'y' would only allow zooming in the y direction
                mode: 'xy',
            }
        }
    });
}

function resetZoom() {
    window.myLine.resetZoom()
}

function recupData() {
    data = he.decode(data_var)
    tab_data = data.split(',')
    for (var index in tab_data) {
        tmp = tab_data[index].replace("'", "")
        tmp = tmp.replace("[", "")
        tmp = tmp.replace("]", "")
        tmp = tmp.replace("'", "")
        donnee.push(tmp)
    }
}

function recupLabels() {
    label = he.decode(labels_var)
    tab_label = label.split('\',')
    for (var index in tab_label) {
        tmp = tab_label[index].replace("'", "")
        tmp = tmp.replace("[", "")
        tmp = tmp.replace("]", "")
        tmp = tmp.replace("'", "")
        labels.push(tmp)
     }
}