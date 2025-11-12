from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.dialects.mysql import JSON
from utils.config import SQLALCHEMY_DATABASE_URI, DEBUG_MODE

app = Flask(__name__)
CORS(app)

# MySQL database setup
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model Definition
class Tree(db.Model):
    __tablename__ = 'tree'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    tree_data = db.Column(JSON, nullable=False)

with app.app_context():
    db.create_all()

# API Routes
@app.route('/api/trees', methods=['GET'])
def get_trees():
    trees = Tree.query.all()
    return jsonify([
        {"id": t.id, "name": t.name, "tree": t.tree_data}
        for t in trees
    ])

@app.route('/api/trees/add', methods=['POST'])
def add_tree():
    data = request.get_json()

    # If frontend sends a full tree JSON, use it
    if data and "name" in data:
        root_name = data["name"]
        tree_data = data
    else:
        # fallback: create a default tree
        root_name = data.get('root_name', 'Root Node') if data else 'Root Node'
        tree_data = {
            "name": root_name,
            "children": [
                {"name": "Child 1", "data": ""}
            ]
        }

    try:
        new_tree = Tree(name=root_name, tree_data=tree_data)
        db.session.add(new_tree)
        db.session.commit()

        return jsonify({
            "id": new_tree.id,
            "name": new_tree.name,
            "tree": new_tree.tree_data
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/api/tags/<int:tree_id>', methods=['PUT'])
def update_tree(tree_id):
    tree = Tree.query.get_or_404(tree_id)
    data = request.json
    tree.tree_data = data
    db.session.commit()
    return jsonify({"message": "Tree updated successfully", "tree": tree.tree_data})

@app.route('/api/tags/<int:tree_id>', methods=['DELETE'])
def delete_tree(tree_id):
    tree = Tree.query.get_or_404(tree_id)
    db.session.delete(tree)
    db.session.commit()
    return jsonify({"message": f"Tree {tree_id} deleted"})

if __name__ == '__main__':
    app.run(debug=DEBUG_MODE)
