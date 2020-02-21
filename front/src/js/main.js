$(function () {

  function includes() {
    var includes = $('[data-include]');
    $.each(includes, function () {
      var files = 'components/' + $(this).data('include') + '.html';
      $(this).load(files);
    });
  }
  includes();
});