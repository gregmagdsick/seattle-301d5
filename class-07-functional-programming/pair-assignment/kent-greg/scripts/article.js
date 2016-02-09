(function (module) {
  function Article (opts) {
    this.author = opts.author;
    this.authorUrl = opts.authorUrl;
    this.title = opts.title;
    this.category = opts.category;
    this.body = opts.body;
    this.publishedOn = opts.publishedOn;
  }

  module.Article = Article;

  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

  Article.loadAll = function(rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    Article.all = rawData.map(function(ele) {
      return new Article(ele);
    });
  };

  Article.fetchAll = function(callback) {
    if (localStorage.rawData) {
      Article.loadAll(JSON.parse(localStorage.rawData));
      articleView.initIndexPage();
      callback();
    } else {
      $.getJSON('/data/hackerIpsum.json', function(rawData) {
        Article.loadAll(rawData);
        localStorage.rawData = JSON.stringify(rawData);
        articleView.initIndexPage();
        callback();
      });
    }
  };

  Article.numWordsAll = function() {
    return Article.all.map(function(article) {
      return article.body.match(/\b\w+/g).length
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };

  Article.allAuthors = function() {
    return Article.all.map(funciton(article) {
      return article.author;
    })
    .reduce(function(a, b) {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, []);
  };

  Article.numWordsByAuthor = function() {
    // TODO: Transform each author string into an object with 2 properties: One for
    // the author's name, and one for the total number of words across all articles written by the specified author.
    return Article.allAuthors().map(function(author) {
      return {
        // someKey: someValOrFunctionCall().map(...).reduce(...), ...
      }
    })
  };
}(window));
