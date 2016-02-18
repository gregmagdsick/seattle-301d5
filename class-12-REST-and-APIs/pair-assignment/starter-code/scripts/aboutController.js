(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('#about').show().siblings().hide();

    // DONE: Call a function to load all the data.
    repos.requestRepos(repoView.index);
    // Pass a view function as a callback, so the view will render after the data is loaded.
//look for repoView object that is view-specific
  };

  module.aboutController = aboutController;
})(window);
