(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    // DONE: How would you like to fetch your repos? Don't forget to call the callback. ".done(othermethod)"
    var repoUrl = 'https://api.github.com/users/gregmagdsick/repos';
    var eTag;
    $.ajax({
      url: repoUrl + '?per_page=5&sort=updated',
      type: 'GET',
      headers: { 'Authorization': 'token ' + gitubToken},
      success: function (data, message, xhr) {
        eTag = xhr.getResponseHeader('eTag');
        console.log(data);
        repos.all = data;
      }
    }).done(callback);
    //   function(){
    //   if (localStorage.eTag !== eTag) {
    //     localStorage.eTag = eTag;
    //     $.getJSON(repoUrl, function(data){
    //       localStorage.setItem('repos', JSON.stringify(data));
    //     });
    //   } else {
    //     repos.All = JSON.parse(localStorage.repos);
    //   }
    // })
    ;
  };

  // DONE: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
