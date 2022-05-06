let counter = 4;

function addelement() {

    let completelist = document.getElementById("thelist");

    completelist.innerHTML += "<li>Item " + counter + "</li>";
    counter++;
}

function teste(){
    let completelist = document.getElementById("thelist");
    for (let i = 0; i < 100; i++) {
        completelist.innerHTML += "<li>Item " + i + "</li>";
    }
}

window.onload = teste()
