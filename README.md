# Album Hub

Album Hub is a personal album library where the user can rate them and their tracks

![image](https://github.com/user-attachments/assets/c6ae109d-399d-4a9d-8135-8018ad53152d)


#### Technologies involved:
 - The front-end is made by HTML, CSS and JavaScript,with also JavaScript library node-vibrant
 - The back-end is made by JavaScript, Node.js and its modules, JSON, and making use of the LastFM API
 - Node modules used: express, open, path, fs

<br>

# How to use it?

### What do you need:
  
  - Node.js (required for execution)
  - Terminal (required for execution) 
  - Internet Browser (required for interface)

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

  
#### Server
  - After it starts running, the program will create a local host server with the gate 2727, so you can access the interface

  ```
    > album-hub@3.0.0 start
    > node source/server.js

    Server running on http://localhost:2727/views/index.html
  ```

### Interface:

  - To manage your library, just acces the local server page with the corresponding gate (by default it's 2727)
  - You can add or remove albums, see all the albums in your library, search for other albums and access the album page, where you can rate the album and its tracklist

### First Steps:

  #### How to add your first album?
  - After after opening the interface on the browser, something like this should appear:
  <br>

  ![image](https://github.com/user-attachments/assets/12edb1a4-f3f8-48fd-9bbc-a7684827d280)

  
  - Click 'Add an Album+', the search album interface should appear
  <br>

  ![image](https://github.com/user-attachments/assets/7ec6cf0c-f45f-4f21-b0ed-996d2c08ce1f)

  - Type the name of the album and the artist in the interface, then hit search
  - Let's take 'Yeezus' by 'Kanye West' for example. 
  <br>

  ![image](https://github.com/user-attachments/assets/d0c8e897-dbcd-42e5-bb85-64b7562f1478)

  - After that, hit 'Add Album to library'

  - That's how the main page should look like now:
  <br>

  ![image](https://github.com/user-attachments/assets/c2070d77-85c5-47f2-896d-9561bd92ff35)

  - If you click on the album, you will be able to see the tracklist and the link to the album page
  <br>

  ![image](https://github.com/user-attachments/assets/2ee52252-d7ed-4041-8d27-a4c42ec28b02)

  - This is what the album page should look like
  <br>

  ![image](https://github.com/user-attachments/assets/a59332ae-9885-44bb-87f8-49cd2b3a06bc)

  - To rate the album, click the button on the upper-right, an interface should appear
  - Fill the inputs with your ratings, then hit submit
  <br>

  ![image](https://github.com/user-attachments/assets/5d3aa6a7-7f8b-4876-b114-e77df11eb7cf)

  - That's it ! You added your first album and gave your first rating
  <br>

  ![image](https://github.com/user-attachments/assets/8494513f-ce6d-4e46-a8e3-8a7afee6c8ac)
