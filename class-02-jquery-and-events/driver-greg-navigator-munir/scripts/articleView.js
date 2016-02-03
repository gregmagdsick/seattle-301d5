// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};
articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);
      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};
articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author = "' + $(this).val() + '"]').show();
    } else {
      $('article').show();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};
articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category = "' + $(this).val() + '"]').show();
    } else {
      $('article').show();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};
articleView.handleMainNav = function() {
  $('.main-nav').on('click', 'li', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content') + '').show();
  });
  $('.main-nav .tab:first').click();
};
articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('.read-on').on('click', function(e) {
    e.preventDefault();
    $(this).siblings('section').children().show();
    $(this).hide();
  });
};
articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.handleMainNav();
articleView.setTeasers();
