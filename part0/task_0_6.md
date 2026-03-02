Below is a sequence diagram depicting interactions when user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/spa
You can view the diagram in a visual format using https://mermaid.live/

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST json to /exampleapp/new_note_spa <br> {content: "...", date: "..."}
    activate server
    server-->>browser: 201 Created with {message: "note created"}
    deactivate server
