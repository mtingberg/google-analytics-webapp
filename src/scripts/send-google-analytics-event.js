'use strict';

module.exports = sendGoogleAnalyticsEvent;

function sendGoogleAnalyticsEvent(eventData) {
    window.ga('send', 'event', {
        'eventCategory': eventData.eventCategory,
        'eventAction': eventData.eventAction,
        'eventLabel': eventData.eventLabel,
        'eventValue': eventData.eventValue
    });
}
