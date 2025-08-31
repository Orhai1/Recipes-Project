## Recipes-Project
# Step 1
A basic REST API for managing recipes, built with Node.js and Express.


🛠 Tech

Node.js + Express

express-validator — request validation

morgan — HTTP request logging

JSON file as a simple data store


⚙️ Setup & Run

      npm install
      
      node server.js
      
      -Server listens on http://localhost:3000


🧭 API Endpoints
- GET /api/recipes
- GET /api/recipes/:id
- POST /api/recipes
- PUT /api/recipes/:id
- DELETE /api/recipes/:id
- GET /api/recipes/stats
