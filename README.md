# Team: String cheese
A project that finds the top trending hashtags on twitter and displays the instagram photos that correspond, by country.

##Current Functons:
1. When hovering over the map, the top hashtag trending in the country displays. 
2. When clicking on a country on the map or searching for a country it goes to a page that displays the photos from instagram corresponding to that hashtag.
3. Login 
4. Users can save countries to their account so that they can view all the pictures from those countries under their "saved" page
5. The world page displays all of the top hashtag photos from all around the world.

###References
We built our application on Meteor (https://www.meteor.com/) and used the Meteor Tutorial (https://www.meteor.com/install) and the Meteor documentation (http://docs.meteor.com/#/full/) for help.

We used Bootstrap for formatting (http://getbootstrap.com/).

The Map: We used the google geocharts API and code snippets from https://developers.google.com/chart/interactive/docs/gallery/geochart

Login: To make the login we followed and used code snippets from this tutorial: https://waaave.com/tutorial/meteor/design-a-complete-authentication-system-with-meteor/

Twitter: We used the Twitter APIs to get the top hashtags from around the country and we used Twit by ttezel found at https://atmospherejs.com/mrt/twit to interact with the Twitter API.

Router: We used Iron.Router to create our routes: http://eventedmind.github.io/iron-router/

Instagram: To get the pictures from instagram (http://instagram.com/developer/api-console/) we used instageed.js found at http://instafeedjs.com/ and used code from http://stackoverflow.com/questions/22901985/how-to-obtain-instagram-pictures-from-a-place-consuming-instagram-api for help.
