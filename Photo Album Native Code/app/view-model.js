var observable = require("data/observable");
var observableArrayModule = require("data/observable-array");
var imageSourceModule = require("image-source");
var fileSystemModule = require("file-system");
var Everlive = require('./everlive.all.min');


var bsApiKey = 'YOUR_API_KEY';
var bsUrlScheme = 'https';

var everlive = new Everlive({
    apiKey: bsApiKey,
    scheme: bsUrlScheme
});


var directory = "/res/";

function imageFromSource(imageName) {
    return imageSourceModule.fromFile(fileSystemModule.path.join(__dirname, directory + imageName));
};

var array = new observableArrayModule.ObservableArray();

var item1 = {
    itemImage: imageFromSource("01.jpg")
};
var item2 = {
    itemImage: imageFromSource("02.jpg")
};
var item3 = {
    itemImage: imageFromSource("03.jpg")
};
var item4 = {
    itemImage: imageFromSource("04.jpg")
};
var item5 = {
    itemImage: imageFromSource("05.jpg")
};
var item6 = {
    itemImage: imageFromSource("06.jpg")
};

array.push([item1, item2, item3, item4, item5, item6]);

var item7 = {
    itemImage: imageFromSource("07.jpg")
};
var item8 = {
    itemImage: imageFromSource("08.jpg")
};

var photoAlbumModel = new observable.Observable();
photoAlbumModel.set("message", "Add new images");

var backendArray = new observableArrayModule.ObservableArray();
Object.defineProperty(photoAlbumModel, "photoItems", {
    get: function () {
        everlive.Files.get().then(function (data) {
                data.result.forEach(function (fileMetadata) {
                    var fileUrl = fileMetadata.Uri;
                    imageSourceModule.fromUrl(fileUrl).then(function (imageFromUrl) {
                        var item = {
                            itemImage: imageFromUrl
                        };
                        backendArray.push(item);
                    });
                });
            },
            function (error) {});

        return backendArray;
    },
    enumerable: true,
    configurable: true
});

photoAlbumModel.tapAction = function () {
    array.push(item7);
    array.push(item8);

    this.set("message", "Images added. Total images: " + array.length);

    // convert the local files to base64 string and upload them in the Telerik Backend Services project
    for (i = 0; i < array.length; i++) {
        var file = {
            "Filename": Math.random().toString(36).substring(2, 15) + ".jpg",
            "ContentType": "image/jpeg",
            "base64": array.getItem(i).itemImage.toBase64String("JPEG", 100)
        };

        everlive.Files.create(file,
            function (data) {},
            function (error) {});
    }
};

exports.photoAlbumModel = photoAlbumModel;