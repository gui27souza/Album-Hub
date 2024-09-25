# Album Hub

Album Hub is a personal album library where the user can rate them and their tracks

![image](https://github.com/user-attachments/assets/83e12475-7c84-4089-8b0b-dacdc15a8263)


#### Technologies involved:
 - The front-end is made by HTML, CSS and JavaScript, also making use of the LastFM API and JavaScript library node-vibrant
 - The back-end is made by JavaScript, Node.js and its modules, JSON, and making use of the LastFM API
 - Node modules used: express, open, path, readline, fs, node-fetch

<br>

# How to use it?

### What do you need:
  
  - Node.js (required for execution)
  - Terminal (required for execution, recommended: bash/zsh) 
  - Internet Browser (required for interface, recommended: Google Chrome)
  - A LastFM API key, you can create an account and get one [here](https://www.last.fm/api#getting-started)

### Set up:

  - Clone the repository or download the zip file
  - Open the directory in the terminal
  - Set up the node modules
  ```
    npm install
  ```
  
  - Run the program
  ```
    npm start
  ```

  - Only in your first time using, you will be required to give your API key
  - It will also be asked once about a username, feel free to choose any !
  
  #### Server
  - After it starts running, the program will create a local host server with the gate 2727, so you can access the interface
  - It will be asked if you'd like to open the interface in your default browser

  ```
    Insert an username: your_username
    Insert your LastFM API key: your_api_key

    Gate 2727
    link: http://localhost:2727/views/index.html

    Would you like to open the interface in your default browser?
    1 - Yes
    2 - No
  ```

### Terminal/Interface:

  - To manage your library, execute the commands in the terminal
  - You can add or remove albums, list all the albums in your libraries, rate albums and their tracklists and search for albums

  - In the browser interface, you can see all your albums, search and order them in your library

### First Steps:

  #### How to add your first album?
  - After executing the node command, something like this should appear:
  <br>

  ```
    Welcome, your_username !

            -----Album Hub-----

    1 - Add album
    2 - Rate Album/Tracklist
    3 - Remove album
    4 - Search album
    5 - Search album tracklist

    0 - End program
  ```
  
  - Type 1 to add your first album, after you will get asked about the name of the album and the artist, lets take 'Yeezus' by 'Kanye West' for example
  <br>

  ```
    Welcome, your_username !

            -----Album Hub-----

    1 - Add album
    2 - Rate Album/Tracklist
    3 - Remove album
    4 - Search album
    5 - Search album tracklist

    0 - End program

    1

    Album Name: yeezus
    Artist: kanye west
  ```

  - It will be asked if yu'd like to rate the album and its tracklist
  <br>

  ```
    Album Name: yeezus
    Artist: kanye west

    Would you like to rate it?
    1 - Yes
    2 - No

    1

    Rate: 10

    Would you like to rate the tracks?
    1 - Yes
    2 - No

    2

    Album added to you library!
  ```

  - This is what you should see in the interface
  <br>
  
  ![image](https://github.com/user-attachments/assets/a7e56fea-cacd-4a0a-89f4-f7b28b2e9625)

  - And if you click on the album, you will be able to see its tracklist and link to the album page
  <br>

  ![image](https://github.com/user-attachments/assets/fc98a259-a60a-4057-b89b-e7927a94ea0e)

  - This is what the album page should look like
  <br>

  ![image](https://github.com/user-attachments/assets/d8d0be9f-a22a-4235-ade2-de54f4deacca)