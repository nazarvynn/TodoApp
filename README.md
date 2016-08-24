# TodoApp
Todo application using MEAN (Mongo, Express, Angular, Node).

## Application structure
```
- public            <!-- holds all our files for our frontend angular application -->
----- core.js       <!-- all angular code for our app -->
----- index.html    <!-- main view -->
- package.json      <!-- npm configuration to install dependencies/modules -->
- server.js         <!-- Node configuration -->
```

## MongoDB
* Database: "todoApp"
`use todoApp`
* Collection: "TodoList"
````
db.createCollection("TodoList")

#Optional
db.createCollection("TodoList", {autoIndexID: true})
``