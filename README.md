# Course & User REST API (created with Express and Sequelize)

## How to use the project
1. Run npm install
2. Run npm start

## Routes included

- A /api/users GET route that will return all properties and values for the currently authenticated User along with a 200 HTTP status code.
- A /api/users POST route that will create a new user, set the Location header to "/", and return a 201 HTTP status code and no content.
- A /api/courses GET route that will return all courses including the User associated with each course and a 200 HTTP status code.
- A /api/courses/:id GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.
- A /api/courses POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
- A /api/courses/:id PUT route that will update the corresponding course and return a 204 HTTP status code and no content. Only the owner of the course, as specified by userId is allowed to do this.
- A /api/courses/:id DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content. Only the owner of the course, as specified by userId is allowed to do this.