labels = []
donnee = []

recupData()
recupLabels()

new Chart(document.getElementById("line-chart"), {
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
                    quarter: 'MMM YYYY'
                }
            }]
        },
        title: {
            display: false,
            text: 'Latency between you and Google.fr'
        }
    }
});

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