function getActivitiesBasedOnLocation(location) {
    fetch('/api/activities/', {
        body: JSON.stringify({
            location: location,
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }) //get request
        .then(response => response.json())
        .then(data => {
            addActivities(data)
        })
}

function addActivities(dataMap) {
    dataMap.forEach(element => {
        addToSelect(element.title, 'activities')
    })
}


function addToSelect(value, name) {
    let x = document.getElementById(name)
    let option = document.createElement('option')
    option.text = value
    option.value = value
    x.add(option)
}


function prepareActivities() {
    document.getElementById('activities').innerHTML = '<option disabled hidden value=\'\'>Choose activities...</option>'
    let location = document.getElementById('general-place').value
    getActivitiesBasedOnLocation(location)
}