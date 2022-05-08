const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'ulide-party',
    api_key: '757193529144895',
    api_secret: 'zWOHPeQOb7-ZiQBXHG5STwqITJk'
});

console.log(cloudinary.url('spots/postegresql'))

