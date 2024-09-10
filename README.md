# Album Hub

Album Hub is a personal album library where the user can rate them and their tracks

#### Technologies involved:
 - The back-end is made by JavaScript, JSON, Node.js, making use of the LastFM API
 - The front-end is made by HTML, CSS and JavaScript, also making use of the LastFM API

<br>

# How to use it?

### What do you need:
  
  - Node.js (required for execution) and npm (required for installing modules)
  ```
    sudo apt install nodejs npm
  ```
  - Node.js modules: fs and readline (required for execution)
  ```
    sudo npm i -g fs readline
  ```
  - Terminal (required for execution, recommended: Bash) 
  - Internet Browser (required for interface, recommended: Google Chrome) 
  - Visual Studio Code with Live Server extension (optional for interface, but recommended for optimal use)
  - A LastFM API key, you can create an account and get one [here](https://www.last.fm/api#getting-started)

### Set up:

  - Clone the repository or download the zip file
  - Open the directory in the terminal
  - Execute the main file
  ```
    node albumHub.js
  ```
  - Only in your first time using, you will be required to give your API key

  <br>

  - for the optimal use of the interface, open the directory in the Visual Studio Code, and use the Live Server extension to open the interface in your browser

### Terminal/Interface:

  - To manage your library, execute the commands in the terminal
  - You can add or remove albums, list all the albums in your libraries, rate albums and their tracklists and search for albums 
  <br><br>

  - In the browser interface, you can see all your albums, search and order them in your library

### First Steps:

  #### How to add your first album?
  - After executing the node command, something like this should appear:
  <br>
  
  ![image](https://github.com/user-attachments/assets/5e8b44d3-6ea1-4b9c-ac0c-76028ef63d1a)
  
  - Type 1 to add your first album, after you will get asked about the name of the album and the artist, lets take 'Yeezus' by 'Kanye West' for example
  <br>
  
  ![image](https://github.com/user-attachments/assets/d8ef334b-eff5-4d43-86a0-b249d943e527)

  - This is what you should see in the interface
  <br>
  
  ![image](https://github.com/user-attachments/assets/2b1c6771-f205-41e5-92f0-aec57c0bbc1a)

  - Right after that, in the terminal, you will be asked if you want to rate the album
  <br>
  
  ![image](https://github.com/user-attachments/assets/7bb0c68c-8274-4385-b7dc-80a764335fd8)

  - and after, if you want to rate the tracks, wich will give you an average of the ratings
  <br>
  
  ![image](https://github.com/user-attachments/assets/45bbb485-0808-471a-b339-3c2796833426)
  
  - Later, this is what you should see in your library
  <br>
  
  ![image](https://github.com/user-attachments/assets/8b71556c-6e9a-4dbe-a619-d38c466a6b99)
  
  - And if you click on the album, this is what you should see
  <br>
  
  ![image](https://github.com/user-attachments/assets/a0fa7f79-d896-45b2-af51-df08c27a4685)
