# Intelligent Agent-Powered Information Platform about the Erasmus+ Experience in Łódź

## 📘 Description

The theoretical part of the work explores studying as an important phase in an individual’s life, with a focus on student mobility and participation in Erasmus+ study exchanges.
It concludes with an overview of intelligent assistants based on RAG (Retrieval-Augmented Generation) technology.

The practical part involves the development of a web platform focused on the Erasmus+ experience in Łódź, and the implementation of an intelligent assistant.
This assistant is powered by an existing language model that has been trained and fine-tuned on a custom dataset, ensuring it can effectively respond to user queries and provide relevant, accurate information.

---

## 🧰 Technologies Used

### 🔹 Frontend
- React (Vite)
- JSX
- CSS

### 🔹 Backend
- Python - Custom scraper for data collection
- Python (FastAPI)

### 🔹 Other Tools
- LaTeX / MiKTeX (in VS Code) for documentation

---

## 🚀 How to Run the Application

### 🔸 Frontend
```bash
cd Frontend
npm install
npm run dev
```
### 🔸 Backend
```bash
cd Backend
uvicorn main:app -reload
