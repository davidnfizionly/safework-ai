# 🦺 SafeWork AI – Industrial Maintenance Risk Detection

**SafeWork AI** is a cloud-powered safety assistant for industrial environments. It enables employees to upload maintenance reports (PDFs or images), which are analyzed by AI to detect potential safety hazards such as overheating, leaks, or failures. The system then generates summarized reports and alerts supervisors when critical risks are detected.

---

## 🚀 Live Demo

⚙️ _[Deployed on AWS EC2 + S3]_

---

## 📦 Project Type

AI-Powered Web App – Server-hosted backend on EC2, AI analysis pipeline, and real-time PDF report generation.

---

## 🧰 Technologies Used

### 🌐 Frontend
- **React + TypeScript + Vite** – Modern interface for document upload, risk score, result display, and report downloads

### 🧠 Backend
- **Python (Flask)** – Handles file uploads, AWS orchestration, PDF generation, and API logic
- **Amazon EC2** – Hosts the Flask backend server

### ☁️ AWS Services
| Service            | Role                                                                 |
|--------------------|----------------------------------------------------------------------|
| Amazon **S3**       | Store raw uploaded files and generated PDF reports                  |
| Amazon **Textract** | Extract raw text from PDFs and image documents                      |
| Amazon **Comprehend** | Detect critical entities, keywords, and risks in text               |
| Amazon **SNS** (optional) | Notify supervisor by email if risk score is too high        |
| Amazon **CloudWatch** | Monitor backend logs and errors                                  |

---

## ✨ Key Features

- Upload PDF or image reports
- AI-based risk score calculation
- Entity detection using AWS Comprehend or GPT-4
- Automated generation of clean PDF summaries
- Notifications via AWS SNS (optional)
- Historical report access and PDF download
- Real-time communication between frontend and backend

---

## 🔁 How It Works (Workflow)

1. User uploads a maintenance report via the frontend.
2. The file is sent to Flask API hosted on EC2.
3. Flask backend:
   - Uploads file to S3
   - Launches AWS Textract to extract text
   - Analyzes the text with Comprehend or GPT-4
   - Calculates a safety risk score
   - Generates a downloadable PDF report
   - Sends optional alerts via SNS
4. Results are shown in the React interface.

---

## 🧱 Architecture Diagram

🖼️ _See project folder or GitHub for the full diagram (SafeWorkAI_Architecture.png)_

---

## 📁 Folder Structure (simplified)

```
safeworkproject/
├── safeworkai-backend-flask-part1/
│   ├── app.py
│   ├── requirements.txt
├── safeworkai/
│   ├── src/
│   ├── index.html
│   └── .env
├── .github/
│   └── workflows/
├── README.md
```

---

## ⚙️ Deployment Instructions

### Backend (EC2)
- Launch EC2 instance (Ubuntu, t2.micro)
- Install Python + Flask + boto3
- Clone repo and run `python app.py`
- Set up IAM Role for EC2 with S3, Textract, Comprehend, SNS permissions

### Frontend (Vite)
- Set `VITE_API_BASE_URL` in `.env` to EC2 public IP (port 5000)
- Run `npm install && npm run dev`

---

## 🧹 AWS Cleanup Guide (Free Tier)

- EC2 instance (stop or terminate)
- S3 bucket (delete files if needed)
- IAM roles (if no longer used)
- CloudWatch log groups (optional)
- SNS Topics (optional)

---

## 🙌 Acknowledgments

Built by David Nfizi as part of a real-world AWS Cloud & AI portfolio project.