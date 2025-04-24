# Album-Hub Patch Notes

#### Planned next features

- Artist Page
- User Page
- Create lists
- Custom rates

### Album-Hub 3.0

- Major Interface Funcionality update
  - Add albums to the library via index
  - Rate album and tracklist via album page
  
- Album Color Shadow on album-item on index

- Program architechture rebuild

- Scrapped:
  - Custom rates

### Album-Hub 2.1

- Custom rates
  - instrumental
  - cover
  - aesthetic
  - firts listen impact

- Backend: app modules organization

### Album-Hub 2.0

- File architecture rebuild
  - Source
    -  app.js - main file
    -  server.js - creates server
    -  file-handler.js - deals with data to object and data update
    -  user-interface.js - opens the user interface in the terminal
    -  api.js - functions that makes use of LastFM API
  - Public
    - views - HTML Files
    - css - CSS Files
    - js - JavaScript for browser files
    - data - data and user-data files

- Album Page in Interface
  - Each album has a web page, with customized colors (uses node-vibrant javascript library)

- Removed functions:
  - See library in the terminal

### Album-Hub 1.0

- Backend functions: Add album, Remove album, Rate album/Tracklist, See library, Search album, Search Tracklist
- Frontend functions: Album display in the interface, Album/Tracks rate display in the interface