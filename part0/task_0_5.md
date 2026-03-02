Below is a sequence diagram depicting interactions when user opens the page https://studies.cs.helsinki.fi/exampleapp/spa
You can view the diagram in a visual format using https://mermaid.live/

sequenceDiagram
    participant browser
    participant server

    browser->>server: GET /exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET /exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET /exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file (+form logic)
    deactivate server

    browser->>server: GET /exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "...", "date": "..." }, ... ]
    deactivate server
