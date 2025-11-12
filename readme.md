📁 README.md
# 🌳 Nested Tags Tree Manager

A full-stack web application to create, edit, and visualize nested tag/tree structures interactively.  
Built with **React (frontend)** + **Flask (backend)** + **MySQL (database)**.

---

## 🚀 Features

✅ Create multiple tree structures dynamically  
✅ Add or remove child tags recursively  
✅ Edit tag names and data fields inline  
✅ Save or export trees to database in JSON format  
✅ Auto-collapse all trees except the latest edited one  
✅ Clean JSON export format without redundant fields  
✅ Config-secured backend (database configs separated from code)

---

## 🧠 Tech Stack
_____________________________________________
| Layer         | Technology                |
|---------------|---------------------------|
| Frontend      | React.js, TailwindCSS     |
| Backend       | Flask, SQLAlchemy         |
| Database      | MySQL                     |
| API Format    | REST (JSON)               |
| Others        | CORS, JSON serialization  |
|_______________|___________________________|

---

## 🛠️ Project Structure



tags-tree-manager/
│
├── backend/
│ ├── app.py
│ ├── models.py
│ ├── utils/
│       └── config.py
│ 
│
├── frontend/
│ ├── src/
│ │ ├── App.js
│ │ └── components/
│ │     └── TagView.js
│ ├── package.json
│ └── package-lock.json
│
├── README.md
└── requirements.txt


---

## ⚙️ Installation & Setup

### 🧩 1. Clone the repository
```bash
git clone https://github.com/pnarun/nested-tags-tree-manager.git
cd nested-tags-tree-manager

🗄️ 2. Backend setup (Flask)
cd backend
python -m venv venv
venv\Scripts\activate        # (Windows)
# or
source venv/bin/activate     # (macOS/Linux)


Create a .env or config.py inside utils/ folder:

# utils/config.py
MYSQL_USER = "root"
MYSQL_PASSWORD = "root!123"
MYSQL_HOST = "localhost"
MYSQL_DB = "tags_trees"


Then install dependencies:

pip install -r ../requirements.txt


Run backend:

python app.py


Backend runs on http://127.0.0.1:5000

💻 3. Frontend setup (React)

Open another terminal:

cd frontend
npm install
npm start


Frontend runs on http://localhost:3000

📌 Place all your screenshots in a folder named screenshots in your project root,
and update filenames accordingly in the table above.

🧩 API Endpoints
Method	Endpoint	Description
GET	/api/trees	Fetch all root-level trees
POST	/api/trees/add	Add new tree
PUT	/api/tags/<id>	Update existing tree
DELETE	/api/tags/<id>	Delete a tree
GET	/api/tags	(optional future use)
🧰 Example JSON Output
{
  "name": "root",
  "children": [
    {
      "name": "child1",
      "children": [
        { "name": "child1-child1", "data": "c1-c1 Hello" },
        { "name": "child1-child2", "data": "c1-c2 JS" }
      ]
    },
    { "name": "child2", "data": "c2 World" }
  ]
}

🧑‍💻 Author

Arun P N
📧 [arunpn866@gmail.om]
🌐 [https://www.linkedin.ocm/in/pnarun]
💼 [https://www.github.com/pnarun]