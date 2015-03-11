# Google Analytics in a Web App

This sample application demonstrates how to send app level events to Google Analytics.
The events captured will appear under menu section 'Behavior' (as of March 2015). Please note there
is some delay before events captured appear in statistics (up to 24 hours in some cases).


## Install

Clone the repo (e.g. using ssh):
```bash
$ git clone git@bitbucket.org:mtingberg/google-analytics-webapp.git
```

Install dependencies:
```bash
$ npm install
```

To run locally:
```bash
$ grunt server
```


## Prerequisites

Please note that the this project requires a recent browser in order to run correctly, due to use of
features such as flexbox (i.e. an up-to-date Chrome, Firefox or Safari, or, IE11 or later).


## How to use it

In `enableGoogleAnalytics` in `main.js`:

Change UA-XXXXX-X to your site's google analytics ID.


## General

In the *Event tracking* section of the [Google Analytics Developer Guide](https://developers.google.com/analytics/devguides/collection/analyticsjs/)
there is a described usage of the four available fields: `category`, `action`, `label` and `value`.

There is however, nothing that stops you from using the fields for what makes most sense for your particular application,
since they are just strings and a number (the `value` field). This is the approach taken in the sample application.

When using the fields for non-standard purposes, it is recommended to define a tracking strategy early on and
stick to it for consistency reasons.


## Acknowledgements

google-analytics-webapp is a project by [Magnus Tingberg](https://github.com/mtingberg).
