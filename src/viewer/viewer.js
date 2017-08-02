import Files from './files';
import Tools from './tools';
import Commands from './commands';

export default {
  submit() {
    $('.modal').addClass('show');
    $('.loading-overlay').removeClass('invisible');
  },
  initViewer() {
    const $submit = $('.viewer-actions button.submit');
    const $viewer = $('.viewer-wrapper');
    const $element = $('#conerstoneViewport')[0];

    $viewer.removeClass('invisible');

    Tools.$element = $element;
    Commands.$element = $element;

    $(window).on('resize', () => cornerstone.resize($element, true));
    $submit.on('click', () => this.submit());

    cornerstone.enable($element);

    Files.getCaseImages().then(function (imagesIds) {
      Tools.initTools(imagesIds);
      Commands.initCommands();

      cornerstone.loadImage(imagesIds[0]).then(function(image) {
        cornerstone.displayImage($element, image);
      });
    }).catch();

  }
}
