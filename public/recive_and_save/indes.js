var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        // var form = new formidable.IncomingForm();
        // form.parse(req, function (err, fields, files) {
        //     console.log(files)
        //     var oldpath = files.filetoupload.filepath;
        //     var newpath = __dirname + "\\" +files.filetoupload.originalFilename;
        //     console.log(__dirname)
        //     fs.rename(oldpath, newpath, function (err) {
        //         if (err) throw err;
        //         res.write('File uploaded and moved!');
        //         res.end();
        //     });
        // });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="https://cors-anywhere.herokuapp.com/https://ulide-party-api.herokuapp.com/api/image/save" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);