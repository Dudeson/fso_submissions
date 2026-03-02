Below is a sequence diagram depicting interactions when user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes
You can view the diagram in a visual format using https://mermaid.live/

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST form data to /exampleapp/new_note 
    activate server
    server-->>browser: 302 Redirect to /exampleapp/notes
    deactivate server

    browser->>server: GET /exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET /exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET /exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET /exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "...", "date": "..." }, ... ]
    deactivate server
