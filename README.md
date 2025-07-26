<h1 align="center">📝 To‑Do List Application</h1>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square"/>
  <img src="https://img.shields.io/github/languages/top/Pranav-by/To-Do-List?style=flat-square"/>
  <img src="https://img.shields.io/github/last-commit/Pranav-by/To-Do-List?style=flat-square"/>
</p>

<p align="center">
  A clean, functional, and user-friendly task manager built with <b>Django</b>, <b>Python</b>, <b>JavaScript</b>, <b>HTML/CSS</b>, and <b>SQLite</b>. <br>
  Easily create, track, and complete your daily tasks from a modern web interface.
</p>

---
## ✨ Features

- ✅ **Add** new tasks with ease  
- 📝 **Edit** existing tasks  
- 🗑️ **Delete** unwanted tasks  
- ✅ **Mark** tasks as completed  
- 🧠 **SQLite** database for persistent storage  
- 🌐 **Responsive design** — works on all devices  
- 💡 Simple UI with intuitive experience  

---

## ⚙️ Installation

To run this project locally, follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/Pranav-by/To-Do-List.git
cd To-Do-List

# 2. Create a virtual environment
python -m venv venv

# 3. Activate the environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Apply migrations
python manage.py migrate

# 6. Run the development server
python manage.py runserver
