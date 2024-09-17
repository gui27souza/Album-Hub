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
  - Access the src directory
  ```
    cd src/
  ```
  - Execute the main file
  ```
    node app.js
  ```
  - Only in your first time using, you will be required to give your API key
  - It will also be asked once about a username, feel free to choose any !
  
  #### Server
  - After executing the app.js file, the program will create a local host server with the gate 2727, so you can access the interface
  - It will be asked if you'd like to open the interface in your default browser
  ![image](https://github.com/user-attachments/assets/6f069162-a904-4c43-92f5-8cde71eb0bd5)


### Terminal/Interface:

  - To manage your library, execute the commands in the terminal
  - You can add or remove albums, list all the albums in your libraries, rate albums and their tracklists and search for albums

  - In the browser interface, you can see all your albums, search and order them in your library

### First Steps:

  #### How to add your first album?
  - After executing the node command, something like this should appear:
  <br>

  ![image](https://github.com/user-attachments/assets/af56111f-b6c4-44c3-b410-e9e06b39d9d8)

  
  - Type 1 to add your first album, after you will get asked about the name of the album and the artist, lets take 'Yeezus' by 'Kanye West' for example
  <br>
  
  ![image](https://github.com/user-attachments/assets/d79d08c7-a475-4d70-883e-4b693ffbfea0)

  - It will be asked if yu'd like to rate the album and its tracklist
  <br>

  ![image](https://github.com/user-attachments/assets/e9eac407-123e-4f59-8f2a-6e40b149d333)

  - This is what you should see in the interface
  <br>
  
  ![image](https://github.com/user-attachments/assets/a7e56fea-cacd-4a0a-89f4-f7b28b2e9625)

  - And if you click on the album, you will be able to see its tracklist and link to the album page
  <br>

  ![image](https://github.com/user-attachments/assets/fc98a259-a60a-4057-b89b-e7927a94ea0e)

  - This is what the album page should look like
  <br>

  ![image](https://github.com/user-attachments/assets/d8d0be9f-a22a-4235-ade2-de54f4deacca)