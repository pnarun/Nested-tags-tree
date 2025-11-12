from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# SQLite database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root!123@localhost/tags_trees'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model for tags
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    data = db.Column(db.String(100), nullable=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=True)

    children = db.relationship('Tag')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "data": self.data,
            "children": [child.to_dict() for child in self.children]
        }

# Create database tables
with app.app_context():
    db.create_all()

# API Routes
@app.route('/api/tags', methods=['GET'])
def get_tags():
    root_tags = Tag.query.filter_by(parent_id=None).all()
    return jsonify([tag.to_dict() for tag in root_tags])

@app.route('/api/tags', methods=['POST'])
def create_tag():
    data = request.json
    tag = Tag(name=data['name'], data=data.get('data'), parent_id=data.get('parent_id'))
    db.session.add(tag)
    db.session.commit()
    return jsonify(tag.to_dict()), 201

@app.route('/api/tags/<int:tag_id>', methods=['PUT'])
def update_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    data = request.json
    tag.name = data.get('name', tag.name)
    tag.data = data.get('data', tag.data)
    db.session.commit()
    return jsonify(tag.to_dict())

@app.route('/api/tags/<int:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()
    return jsonify({"message": "Deleted"})

if __name__ == '__main__':
    app.run(debug=True)
