// Wait for PhoneGap to connect with the device
document.addEventListener("deviceready",onDeviceReady,false);
// PhoneGap is ready to be used!
function onDeviceReady() {
    console.log('Device is ready')
}

function askRoll(){
    var rollno = prompt('Enter Roll No','50001');
    return rollno
}
function capturePhoto(){
    navigator.camera.getPicture(onPhotoURISuccess, onPhotoURIFail, 
        { quality: 50, 
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true
        }); 
}

function uploadImage(imageURI, fileName) {
    var serverURL = 'http://192.168.0.104/imageserver/index.php'
    var options = new FileUploadOptions();
    options.fileKey = 'file';
    options.fileName = fileName+'.jpg';
    options.mimeType = "image/jpeg";
    var ft = new FileTransfer();
    ft.upload(imageURI, serverURL, onUploadSuccess, onUploadError, options);
}
function onUploadSuccess(){
    alert('upload successful');
}
function onUploadError(){
    alert('upload failed');
}

function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('myImage');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
    rollno = askRoll();
    if (rollno == null || rollno == "") {
        alert("Roll number cannot be empty.")
    } else {
        uploadImage(imageURI, rollno);
    }
}
function onPhotoURIFail(message) {
    alert('Image Capture Failed because: ' + message);
}
function showerror(){
    alert('There was an error');
}

