
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
            label :labels,
            data: donnee,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'World population per region (in millions)'
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