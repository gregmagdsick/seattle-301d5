(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*This method is called in routes.js by page(/article/:id)
  This method takes the parameters ctx and next, which manages state and sets
  the next callback in the chain.

  This method defines the function articleData that sets the article property of
  the context(ctx) to be equal to the variable article.  Once that is defined,
  it calls Article.findWhere, which is invoked with 'id', ctx.params.id, and
  the articleData function as it's parameters this function will perform a SQL
  SELECT returning a record that matches the id passed into the function. This
  function will then invoke the articleData function as it's callback, setting
  ctx.articles to the returned article, following which the next() callback is invoked..
  */
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  This method is called in routes.js by page('/author/:authorName')
  This method functions almost identically to articlesController.loadById, except
  that instead of using id and article, you are searching by author, so
  Article.findWhere will return an array of articles, rather than one article.

  In additon, the parameter ctx.params.authorName.replace('+', ' '), is replacing
  the '+' with an empty space ' '.
  */
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  This method is called in routes.js by page('/category/:categoryName').
  This method functions almost identically to articlesController.loadById, except
  that instead of using id and article, you are searching by category, so
  Article.findWhere will return an array of articles, rather than one article.
  */
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  
  /*
  This method is called in routes.js by page('/').
  This method is checking to see if Article.all is not empty.
  If Article.all is not empty then set ctx.articles to Artcile.all.
  If Artcile.all is empty then it calls Article.fetchAll and sets articeData as its callback.
  Article.fetchAll checks to see if there is any data in the database.
  If there is data stored, the rows are loaded.
  If no data is stored, then the database is populated from the json file, and then grabs articles from the DB.
  */

  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
