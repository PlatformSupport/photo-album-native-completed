var observable = require("data/observable");
var observableArrayModule = require("data/observable-array");
var imageSourceModule = require("image-source");
var fileSystemModule = require("file-system");

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
var item7 = {
    itemImage: imageFromSource("07.jpg")
};
var item8 = {
    itemImage: imageFromSource("08.jpg")
};

array.push([item1, item2, item3, item4, item5, item6]);

var __extends = this.__extends || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p)) d[p] = b[p];

    function __() {
        this.constructor = d;
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var PhotoAlbumModel = (function (_super) {
    __extends(PhotoAlbumModel, _super);

    function PhotoAlbumModel() {
        _super.call(this);
        // Step 5 - Action a
        this.set("message", "Add new images");
    }

    return PhotoAlbumModel;
})(observable.Observable);

Object.defineProperty(PhotoAlbumModel.prototype, "photoItems", {
    get: function () {
        return array;
    },
    enumerable: true,
    configurable: true
});

PhotoAlbumModel.prototype.tapAction = function () {
    array.push(item7);
    array.push(item8);

    this.set("message", "Images added. Total images: " + array.length);
};

exports.PhotoAlbumModel = PhotoAlbumModel;