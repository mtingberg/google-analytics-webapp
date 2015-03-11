'use strict';

var $ = require('browserify-zepto'),
    sendGoogleAnalyticsEvent = require('./send-google-analytics-event'),

    $imageElement = $('.image-element a');


enableGoogleAnalytics();

// send analytics events for clicks/taps on class 'image-element' elements
$imageElement.on('click', function (e) {
    console.info('Sending Analytics event,',
        'eventCategory:', 'Google analytics web app',
        'eventAction:', 'link',
        'eventLabel:', e.target.title,
        'eventValue:', 0
    );

    // a short delay before redirecting, for being able to read the previous console message
    e.preventDefault();
    var $link = $(this).attr('href');

    setTimeout(function () {
        if (window.ga) {
            sendGoogleAnalyticsEvent({
                'eventCategory': 'Google analytics web app',
                'eventAction': 'link',
                'eventLabel': e.target.title,
                'eventValue': 0
            });
        }

        window.location.href = $link;
    }, 3000);
});

function enableGoogleAnalytics() {
    window.ga = window.ga||function(){(window.ga.q=window.ga.q||[]).push(arguments);};
    window.ga.l =+ new Date();

    // change UA-XXXXX-X to be your site's google analytics ID
    window.ga('create', 'UA-XXXXX-X', 'auto');

    window.ga('set', {
        'appName': 'Google analytics web app',
        'appVersion': '0.1.0'
    });

    window.ga('send', 'pageview');
}
