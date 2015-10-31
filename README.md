**Work in progress.**

# hashtag2logo
Backend: Turn all the active twitter users on a hashtag in the logo of your choice.

## Why?

To use *hashtag2logo*, you'll send an email to a specific email address (see "How?") with:
* A subject: a hashtag on Twitter (without the "#")
* An attachment: a logo

Upon success, the email address will send you back an email with your logo composed of the profile pictures of the users who tweeted with the hashtag you used in the subject.


## How?

### Parse the received emails

To parse the emails, we're using the [Mailjet Parse API](http://dev.mailjet.com/guides/) in server.js.

### Get the profile pictures 

To get the profile pictures of users who tweeted with the hashtag, we use the [Twitter API](https://dev.twitter.com/rest/public). (server.js).

### Create a mosaic with the profile pictures

The mosaic is created in mosaic.js with [GraphicsMagick](https://github.com/aheckmann/gm).

### Process the inboud image 

The image is resized in imageSizer.js with [GraphicsMagick](https://github.com/aheckmann/gm)

### Merge the image

The image transparency is reverted then the image is merged with the mosaic in reverterMerger.js with [GraphicsMagick](https://github.com/aheckmann/gm).

### Send an email with the final image composed of the mosaic in the logo

To send the image, we're using the [Mailjet Send API](http://dev.mailjet.com/guides/send-api-guide/).