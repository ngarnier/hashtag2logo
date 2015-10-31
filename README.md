**Work in progress.**

# hashtag2logo
Backend: Turn all the active twitter users on a hashtag into the logo of your choice.


## What?

To use *hashtag2logo*, you can send an email to a specific email address (see "How?") with:
* A subject: a hashtag on Twitter (without the "#")
* An attachment: a logo on a **transparent background**

Upon success, the email address will send you back an email with your logo composed of the profile pictures of the users who tweeted with the hashtag you used in the subject.


## How?

### Parse the received emails

To parse the emails, we're using the [Mailjet Parse API](http://dev.mailjet.com/guides/#parse-api-process-inbound-emails) in server.js.

### Get the profile pictures

To get the profile pictures of the users who tweeted with the hashtag, we use the [Twitter API](https://dev.twitter.com/rest/public) in server.js.

### Create a mosaic with the profile pictures

The mosaic is created in mosaic.js with [GraphicsMagick](https://github.com/aheckmann/gm).

### Process the inboud image 

The logo you sent is resized in imageSizer.js with [GraphicsMagick](https://github.com/aheckmann/gm) to fit the mosaic.

### Merge the image

The transparency of the image you sent is reverted then the image is merged with the mosaic in reverterMerger.js with [GraphicsMagick](https://github.com/aheckmann/gm).

### Send an email with the final image composed of the mosaic in the logo

**Still need to be done.** To send the image, we're using the [Mailjet Send API](http://dev.mailjet.com/guides/send-api-guide/) in server.js.

## Running your own version of *hashtag2logo*

To run your own version of *hashtag2logo* clone the repo and: 
* create a credentials.js file with your Twitter credentials (consumer_key, consumer_secret, access_token, access_token_secret) to execute the request with the [Twitter API](https://dev.twitter.com/rest/public)
* create an instance of the Parse API as explained [here](http://dev.mailjet.com/guides/#basic-setup) and follow the steps to set up your webhook




