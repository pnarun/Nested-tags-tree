import os

# Load environment variables with fallback defaults
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "root!123")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_NAME = os.getenv("DB_NAME", "tags_trees")

# Construct the SQLAlchemy connection URI
SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

# General settings
DEBUG_MODE = os.getenv("DEBUG_MODE", "True") == "True"
