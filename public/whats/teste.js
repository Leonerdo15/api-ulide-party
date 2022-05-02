let counter = 4;

function addelement() {

    let completelist = document.getElementById("thelist");

    completelist.innerHTML += "<li>Item " + counter + "</li>";
    counter++;
}
