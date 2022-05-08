function senImage() {
    var name = document.getElementById("firstname").value;

    window.location.href = "http://ulide-party-api.herokuapp.com/api/image/save/" + name
}