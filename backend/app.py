from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.dialects.mysql import JSON

app = Flask(__name__)
CORS(app)

# MySQL database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root!123@localhost/tags_trees'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ------------------------
# Model Definition
# ------------------------
class Tree(db.Model):
    __tablename__ = 'tree'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    tree_data = db.Column(JSON, nullable=False)

with app.app_context():
    db.create_all()

# ------------------------
# API Routes
# ------------------------
@app.route('/api/trees', methods=['GET'])
def get_trees():
    trees = Tree.query.all()
    return jsonify([
        {"id": t.id, "name": t.name, "tree": t.tree_data}
        for t in trees
    ])

@app.route('/api/trees/add', methods=['POST'])
def add_tree():
    root_name = request.json.get('root_name', 'Root Node')
    # minimal starter tree
    default_tree = {
        "name": root_name,
        "children": []
    }
    new_tree = Tree(name=root_name, tree_data=default_tree)
    db.session.add(new_tree)
    db.session.commit()
    return jsonify({
        "id": new_tree.id,
        "name": new_tree.name,
        "tree": new_tree.tree_data
    }), 201

@app.route('/api/tags/<int:tree_id>', methods=['PUT'])
def update_tree(tree_id):
    tree = Tree.query.get_or_404(tree_id)
    data = request.json
    # save entire JSON directly
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
    app.run(debug=True)
