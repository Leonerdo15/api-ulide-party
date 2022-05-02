let num = 0
let json1

async function messages1() {
    let html = "<ul class='message' id='message'>";
    let completelist = document.getElementById("text");
    for (let i = 0; i < json1.length; i++) {
        html += "<li id='demo' class='demo'>" + json1[i].umg_um.um_me_id.me_text + "</li>"
    }
    html += "</ul>"
    completelist.innerHTML += html
    num ++
}

async function removeOld() {
    json1 = await getData()
    const element = document.getElementById("message");
    console.log(json1)
    element.remove();
    await messages1()
}

async function getData(){
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://ulide-party-api.herokuapp.com/api/userMessagesGroups/group/1';


    const response = await fetch(targetUrl)
    return await response.json()
}

setInterval(removeOld, 5000)
// setInterval(messages1, 5000)


/**
 * POST message
 * */


function openChat() {
    document.getElementById('chatbox').style.display='block';
    $('.btn-chat').hide();
}
function closeChat() {
    document.getElementById('chatbox').style.display='none';
    $('.btn-chat').show();
}
function postMessage() {
    const text = $(this).find("textarea[name='msg']").val();

    let xhr = new XMLHttpRequest();
    let url = "https://ulide-party-api.herokuapp.com/api/userMessagesGroups";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            setInterval(removeOld, 5000)
            console.log(json);
        }else {
            setInterval(removeOld, 5000)
        }
    };

    let store = {
        "um_gr_id": 1,
        "me_text": document.getElementById('msg').value,
        "us_id": 1
    }
    console.log("text ->>>>>> ", text)
    let data = JSON.stringify(store);
    console.log(xhr.responseText)
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log(data)
    xhr.send(data);
}



window.onload = async function() {
    await removeOld()
};

// function messages() {
//     let completelist = document.getElementById("message");
//     for (let i = 0; i < 5; i++) {
//         completelist.innerHTML += "<li id='demo' class='demo'>Item " + i + "</li>";
//     }
//     const element = document.getElementById("demo");
//     element.remove();
// }