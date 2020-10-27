/*
	Main JS
*/

function sliderInit() {

    $.each($('.slider'), function(index, val) {

        var _this = $(this);
        var element = $(this).find('.slider-inner');
        var sliderItemsCount = element.first().find('.slider-item').length;
        var sliderItemWidth = element.first().find('.slider-item').outerWidth(true);
        var offsetPx = 0;
        var startingOffset = 0;
        var sliderInit;
        var current_offset = 0;
        var sliderDirection = $(this).data('slider-direction');

        // get slider width
        var sliderWidth = sliderItemsCount * sliderItemWidth;

        // if slider is wider than the viewport
        if (sliderWidth > $(window).outerWidth()) {
            if ($(window).outerWidth() < 768) {
                // slow down slider on mobile
                var sliderSpeed = $(this).data('slider-speed') * 2;
                var sliderSlowSpeed = 50 * 2;

            } else {
                var sliderSpeed = $(this).data('slider-speed');
                var sliderSlowSpeed = 50;
            }

            // make sure to clone only one time
            if (element.length < 2) {
                element.clone().appendTo($(this)).addClass('clone');
            }

            if (sliderDirection == 'rtl') {
                // move slider at the end of the cloned element as a starting point
                startingOffset = (sliderWidth*2 - $(window).outerWidth())
                offsetPx = startingOffset;
                $(this).css('transform', 'translate3d(-'+startingOffset+'px,0,0)');
            }

            // slider functionality
            var startSlider = function () {
                if (sliderDirection == 'rtl') {
                    offsetPx -= 1;

                    _this.css({
                        'transform': 'translate3d(-' + offsetPx + 'px, 0, 0)'
                    });

                    // reset slider position
                    if (Math.abs(offsetPx) < sliderWidth - $(window).outerWidth()) {
                        _this.css('transform', 'translate3d(-'+startingOffset+'px,0,0)');

                        offsetPx = startingOffset
                    }
                } else {
                    offsetPx += 1;
                    _this.css({
                        'transform': 'translate3d(-' + offsetPx + 'px, 0, 0)'
                    });

                    // reset slider position
                    if (Math.abs(offsetPx) > sliderWidth) {
                        _this.css('transform', 'translate3d(0,0,0)');

                        offsetPx = 0
                    }
                }
            }

            // init slider
            sliderInit = setInterval(startSlider, sliderSpeed);

            // disable hover for mobile
            if ($(window).outerWidth() > 768) {
                // on mouse over clear interval and set a new one with decreased speed and current offset
                _this.mouseover(function() {
                    clearInterval(sliderInit);

                    // get current offset
                    current_offset = parseInt(_this.css('transform').split(',')[4]);
                    offsetPx = Math.abs(current_offset);

                    sliderInit = setInterval(startSlider, sliderSlowSpeed);
                });

                // on mouse leave clear interval and set a new one with initial speed and current offset
                _this.mouseleave(function() {
                    clearInterval(sliderInit);

                    // get current offset
                    current_offset = parseInt(_this.css('transform').split(',')[4]);
                    offsetPx = Math.abs(current_offset);

                    sliderInit = setInterval(startSlider, sliderSpeed);
                });

            }
        } else {
            console.log('manji si baki')
        }
    });

}

$(document).ready(function() {

    sliderInit();

});

$(window).load(function() {


});

$(window).resize(function() {
    if ($(window).outerWidth() < 768) {
        sliderInit();
    }
});