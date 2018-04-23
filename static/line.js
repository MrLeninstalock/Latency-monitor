document.getElementById("data_div").style.visibility = "hidden";
document.getElementById("labels_div").style.visibility = "hidden";


labels = []
donnee = []

recupData()
recupLabels()

console.log(labels)
console.log(donnee)

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
        title: {
            display: false,
            text: 'Latency between you and Google.fr'
        }
    }
});

function recupData() {
    data = document.getElementById("data_div").innerHTML
    tab_data = data.split(',')
    for (var index in tab_data) {
        tmp = tab_data[index].replace("' ", "")
        tmp = tmp.replace("[", "")
        tmp = tmp.replace("]", "")
        tmp = tmp.replace(" '", "")
        donnee.push(tmp)
    }
}

function recupLabels() {
    label = document.getElementById("labels_div").innerHTML
    tab_label = label.split(',')
    for (var index in tab_label) {
        tmp = tab_label[index].replace("' ", "")
        tmp = tmp.replace("[", "")
        tmp = tmp.replace("]", "")
        tmp = tmp.replace(" '", "")
        labels.push(tmp)
     }
}