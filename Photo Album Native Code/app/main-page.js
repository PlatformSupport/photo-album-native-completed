// Application logic

var modelModule = require("./view-model");
var model = new modelModule.PhotoAlbumModel();

function onPageLoaded(args) {
  var page = args.object;
  page.bindingContext = model;
};

function buttonTap(args) {
  model.tapAction();
}

exports.buttonTap = buttonTap;
exports.onPageLoaded = onPageLoaded;
