$(document).ready(function (e) {
    $("#form").on('submit', (function (e) {
        e.preventDefault();

        $.ajax({
            url: "https://ulide-party-api.herokuapp.com/api/image/save",
            type: "POST",
            data: new FormData(this),
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                console.log(data);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }));
});