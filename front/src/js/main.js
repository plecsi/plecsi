$(function () {
  console.log('elindult')
  function includes() {
    var includes = $('[data-include]');
    $.each(includes, function () {
      var file = 'components/' + $(this).data('include') + '.html';
      $(this).load(file);
    });
  }
  includes();

});