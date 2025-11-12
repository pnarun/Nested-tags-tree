📁 README.md
# 🌳 Nested Tags Tree Manager

A full-stack web application to create, edit, and visualize nested tag/tree structures interactively.  
Built with **React (frontend)** + **Flask (backend)** + **MySQL (database)**.

## 🚀 Features

✅ Create multiple tree structures dynamically  
✅ Add or remove child tags recursively  
✅ Edit tag names and data fields inline  
✅ Save or export trees to the database in JSON format  
✅ Auto-collapse all trees except the latest edited one  
✅ Clean JSON export format without redundant fields  
✅ Config-secured backend (database configs separated from code)

## 🧠 Tech Stack

| Layer         | Technology                |
|---------------|---------------------------|
| Frontend      | React.js, TailwindCSS     |
| Backend       | Flask, SQLAlchemy         |
| Database      | MySQL                     |
| API Format    | REST (JSON)               |
| Others        | CORS, JSON serialization  |

## 🛠️ Project Structure

<img width="346" height="757" alt="image" src="https://github.com/user-attachments/assets/59752ad2-14ea-4ab3-a38c-667802486e43" />

## ⚙️ Installation & Setup

### 🧩 1. Clone the repository

git clone https://github.com/pnarun/nested-tags-tree-manager.git
cd nested-tags-tree-manager

### 🗄️ 2. Backend setup (Flask)

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

### 💻 3. Frontend setup (React)

Open another terminal:

cd frontend
npm install
npm start

Frontend runs on http://localhost:3000

### 🧩 API Endpoints
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


### Screenshots of this APP
<img width="1920" height="1080" alt="App load page" src="https://github.com/user-attachments/assets/06de1886-ba4e-4045-a459-daf11ea302c1" />

<img width="1920" height="1080" alt="Tree creation page1" src="https://github.com/user-attachments/assets/13cc1f3c-c311-4986-b2a9-06a2b1878711" />

<img width="1920" height="1080" alt="Tree creation page2" src="https://github.com/user-attachments/assets/0a0001e9-254b-4496-8e9b-6339a9e1800d" />

<img width="1920" height="1080" alt="After tree creation page" src="https://github.com/user-attachments/assets/8e1b9a82-3fcb-481c-87af-427034c0d138" />

<img width="1920" height="1080" alt="Add child page1" src="https://github.com/user-attachments/assets/31d86a8c-3114-4398-86b1-0ebf0878d106" />

<img width="1920" height="1080" alt="Add child page2" src="https://github.com/user-attachments/assets/2653ef2a-9bbe-4970-880d-3acd25ea3f5d" />

<img width="1920" height="1080" alt="Tree update page1" src="https://github.com/user-attachments/assets/2e5de664-d4fd-4be5-8514-4add7c6a7226" />

<img width="1920" height="1080" alt="Tree update page2" src="https://github.com/user-attachments/assets/a3d74291-dc52-4594-a628-e3a0333ee088" />

<img width="1920" height="1080" alt="JSON tree display" src="https://github.com/user-attachments/assets/e3aa7a7a-d567-4af7-a8a0-ab4a97fbae01" />

<img width="1920" height="1080" alt="Add new tree page" src="https://github.com/user-attachments/assets/86111a36-240e-4177-aa93-944cd6dc8903" />

<img width="1920" height="1080" alt="Save new tree page" src="https://github.com/user-attachments/assets/f1e846ec-4fd5-44d0-9189-a1f49b5d7433" />

<img width="1920" height="1080" alt="Final app page" src="https://github.com/user-attachments/assets/1d8f5cd0-5f3a-4115-9aa8-3dec33ec0d88" />

