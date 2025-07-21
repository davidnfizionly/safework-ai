# 🛠️ SafeWork AI – Industrial Maintenance Risk Detection

> **AWS Cleanup Guide (Free Tier Friendly)** included at the end.

---

## 🚀 Overview

SafeWork AI is a cloud-based, intelligent application designed for industrial environments. It allows employees to upload maintenance reports (PDFs or images), which are then automatically analyzed using AWS AI services. The system identifies potential safety risks (such as overheating, leaks, or explosions), generates summary PDFs, and optionally notifies supervisors.

---

## 🧱 Tech Stack

### 🌐 Frontend (React + TypeScript + Vite)
- Upload documents (PDF, JPG, PNG)
- Display extracted text and risk scores
- Download generated PDF reports
- View report history

### 🧠 Backend (Python Flask on Amazon EC2)
- Handles file uploads via REST API
- Orchestrates AI pipeline: S3 → Textract → Comprehend/GPT-4 → PDF → SNS
- Computes risk score
- Returns processed results to frontend

---

## ☁️ AWS Services Used

| AWS Service        | Purpose |
|--------------------|---------|
| **S3**             | Stores uploaded documents and generated PDF reports |
| **Textract**       | Extracts raw text from PDF/image files |
| **Comprehend**     | Performs entity recognition and risk keyword detection |
| **EC2**            | Hosts the Flask backend (API + processing logic) |
| **SNS (Optional)** | Sends email alerts if risk score is above threshold |
| **CloudWatch**     | Logs and error monitoring for the backend |

---

## 🔄 Workflow

1. User uploads a document through the web UI.
2. The file is sent to the Flask backend hosted on EC2.
3. The backend:
   - Uploads the file to S3
   - Extracts text using **Textract**
   - Analyzes text using **Comprehend** or GPT-4
   - Calculates a **risk score**
   - Generates a **PDF summary report**
   - Saves the report in S3
   - (Optional) Sends an **SNS alert**
4. Frontend fetches the results and allows PDF download.

---

## 📦 Directory Structure

```
SAFEWORKPROJECT/
├── safeworkai/                 # Frontend (React + Vite)
│   ├── src/
│   ├── index.html
│   └── vite.config.ts
├── safeworkai-backend-flask/   # Backend (Flask API)
│   ├── app.py
│   └── requirements.txt
├── .env                         # Local environment (API base URL)
└── README.md
```

---

## 🧪 How to Run Locally

### Backend (Flask)
```bash
cd safeworkai-backend-flask
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend (Vite)
```bash
cd safeworkai
npm install
npm run dev
```

---

## 📌 GitHub Actions & CI/CD

CI/CD can be integrated to automate deployment using:
- `GitHub Actions` for S3 deployment (frontend)
- `scp` or `GitHub runner` for EC2 deployment (backend)

---

## ✅ Features

- Upload PDF/images and analyze them in real-time
- Detect safety risks using NLP and ML
- Generate and download structured PDF summaries
- Optional alerting system with Amazon SNS
- Works with AWS Free Tier

---

## 📬 Contact & Acknowledgments

Built by **David Nfizi** as part of a real-world AWS portfolio project.  
For feedback or collaboration: [GitHub Profile](https://github.com/davidnfizionly)

---