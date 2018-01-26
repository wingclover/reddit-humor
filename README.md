# reddit-humor		 

An in-house, Aquent project to view content from multiple subreddits (currently only r/ProgrammerHumor). Check it out at [https://aquent-it-solutions.github.io/reddit-humor/](https://aquent-it-solutions.github.io/reddit-humor/).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
## Usage
The app pulls the hottest 25 posts from [Programmer Humor subreddit](https://www.reddit.com/r/ProgrammerHumor/hot/), and displays each post for a certain amount of time (20 seconds for now).

* When the image is really long, it auto scrolls up and down with a delay of 2 seconds at each stop.
* Click 'Next' button to go to the next post.
* Click 'NSFW' button if you think the post is not appropriate. It will not be shown again (not persistant if the app restarts.)
* Click 'full screen' button to display at full screen. The button will dispear when the next post is served after clicking Next in fullscreen mode.
* To exit full screen mode, either press `Esc` or slide down from top (mobile). Unfortunately Safari doesn't support use of the keyboard in fullscreen.
* The 'full screen' button should reappear when the next post is served after exiting full screen mode.

You can also use this app to pull posts from any other subreddits by adding more endpoints, but be careful that you have to add `?raw_json=1` to the end of your json request to avoid dealing with escape characters in the body of response. See explanation in the [official API doc](https://www.reddit.com/dev/api/#response_body_encoding).

## Deployment
The app is served from gh-pages branch therefore doesn't always agree with the current master.

To deploy newest content from master, `git clone` the project to your local machine, and run `npm run deploy`. It will make a build folder and automatically upload to gh-pages branch on github, from where the app is served. *No further commit is necessary after this command.* Your local copy can be deleted.

## Contribution
All help is welcome! Finding bugs, new feature ideas, etc.

Here is the current to-do list:
1. Write tests. The project has grown much larger than the original plan and proper tests should have been written. The app was created with `create-react-app` and therefore comes with `Jest`. `Chai` and `Enzyme` were installed and the first tests was created for `src/utils/index.js`. All other parts of the app needs testing.
2. Test the app in all browsers. Theoretically, this is the list of browsers that the 'full screen' button should work.
3. Make the `full screen' button disappear and reappear as soon as entering and exiting the full screen mode. Currently, you have to wait until the next post is served (wait or click next button), before you can see the change.
4. Optimize the image resizing condition. It's the `setMediaStyles` function in `App.js`. We only want to scroll images that are very long (1.5 times the height of the container). If the image is portrait, but width is not too much smaller than the height (0.7 of the heigh), we will shrink it to fit or (it is already small) just display as is. The current magic numbers (aka 1.5, 0.7, 0.9) works but may not be the best. Remember to check all screen types (laptop, desktop, mobile). Media query may be a better solution.
5. The 'NSFW' button saves your choice of image inside the app so that it doesn't show unless the app restarts. This needs to be moved to local storage.
6. A feature that's not fully implemented is to have the gif finish a full cycle (or static image finish scrolling to bottom) before switching to next post. Currently it's 20 seconds between posts and it's not always enough. We implemented a function to get the duration of a given gif url. It's in `src/utils/index.js`. It can be plugged somewhere in the app to change the time interval/ time out of the gif. As for the very long images, the time should be calculated with image height and scrolling speed.
7. This app can be released with the help of [standard-version](https://www.npmjs.com/package/standard-version) library.
7. Deployment. Currently deploy is only possible from local machine to github pages. It's probably because Github pages doesn't pickup index.html if it's not in the root directory. It would be nice if we can auto serve from master branch.
