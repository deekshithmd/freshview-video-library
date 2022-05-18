<p align="center">
  <img src="https://i.postimg.cc/fR92NM3L/fresh.png" height="150px" width="180px"/>
</p>

# FreshView Video Library

 ## Table of contents
 * [About](#about)
 * [Features](#features)
 * [Installation](#installation)
 * [Walkthrough](#walkthrough)
 
 ## About
 FreshView is a video library application which consists of agriculture activity related videos. In this library you can watch videos based on your interest by applying filter on video list.
 
 ## Features
 There are different features available in different pages of site
 
 1. Navigation bar
    * Logo is provided at first, it has the feature that if you click on logo when you are in different pages you will reach homepage.
    * Searchbar provided in the navigation bar, as of now no functionality added to this.
    * Profile icon is provided to give user's profile details
    * Theme button provided to toggle between `light` and `dark` theme.
 
 2. Home Page <br>
  There are 3 sections in homepage
    * Banner: 
      This is just to attract the attention of customer, `Explore Now` button provided to get into video listing page
    * Categories: 
      In this section mainly 5 categories provided, user can choose required category and check videos of selected category
    * Trending courses: 
      In this section videos with highest number of views is listed, so that user can check good videos.
    
 3. Video Listing <br>
    This pages contains different features to ease the user experience
      * Filter bar provided at the top of this section so that user can filter videos based on his/her interest. Mainly there are 6 filters
         1. `All` this is default filter applied on videos, this lists all videos
         2. `Other` this filter used to display non-categorized videos
         3. `Dairy Farming`, `Poultry Farming`, `Forest Farming`, `Fish Farming`, `Vegetable Farming`, `Fruit Farming` these are the different filters avilable in the              filter bar.
      * Video list section provided in this page
      * Side Navigation bar provided to navigate between different sections like `Home`, `Explore`, `Watchlater`, `Playlists`, `Liked`, `History`.
 4. Video card:
      * Each video card consists of thumbnail of respoctive video.
      * One CTA button which is having option to add video to watchlater and to playlist.
  
 5. Playlist <br>
    This section lists all created playlists. 
      * User can create and delete playlist here. If new playlist created then it is displayed with default thumbnail.
      * On clicking any playlist, user can see all videos added to that playlist, user also can any video from playlist and can add to watchlater.
 6. Liked <br>
      * This section displays all liked videos
      * User can remove video from liked list
 7. Watch Later <br>
      * This section display all videos saved to watch later.
      * User can remove any video from watchlater list
 8. History <br>
      * This section designed to display keep track of watch history.
      * When user enters single video mode, that video is recorded in the history.
 9. Single Video Page <br>
      * User can watch video only by entering this mode.
      * When user clicks on any video thumbnail, single video mode opens
      * In this mode `Like`, `Watchlater`, `Add to playlist` functionalities provided and design for displaying video details provided but functionality not added.
      * Recommended video section provided which lists videos from category of playing video.
10. User authentication <br>
      Following functionalities provided for user authentication
      * User Login
      * User Signp
      * User Logout
11. User Profile.<br>
      * This section displays users profile data
12. Loader & Alerts <br>
      * Loaders displays during action processing
      * Alerts displays when processing/Action completed

 
## Installation

* Clone the repository on local machine 
  ```
  git clone https://github.com/deekshithmd/freshview-video-library.git
  
  cd freshview-video-library
  ```
* Configure secret file <br>
  
  Create `.env` file in project folder and add the following code,
  ```
  REACT_APP_JWT_SECRET="your_secret_code"
  ```
  
* Install dependencies using package installer 
  ```
  npm install
  ```
  
* Run the app
  ```
  npm start
  ```
  
 ## Walkthrough
 
![FreshViiew]()
