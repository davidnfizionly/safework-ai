import os
import uuid
import boto3
import openai
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from fpdf import FPDF
from io import BytesIO

# --- Init App ---
app = Flask(__name__)

# --- AWS Clients ---
s3 = boto3.client('s3')
textract = boto3.client('textract')

# --- Env Vars ---
S3_BUCKET = os.environ.get("S3_BUCKET")
AWS_REGION = os.environ.get("AWS_REGION", "us-east-1")
openai.api_key = os.environ.get("OPENAI_API_KEY")

# --- TEXT EXTRACTION ---
def extract_text_from_file(file_stream, file_type):
    if file_type.lower() not in ["jpg", "jpeg", "png", "pdf"]:
        raise ValueError("Unsupported file type")

    file_bytes = file_stream.read()
    response = textract.detect_document_text(Document={'Bytes': file_bytes})
    text = "\n".join([item["Text"] for item in response.get("Blocks", []) if item["BlockType"] == "LINE"])
    return text

# --- GPT-4 ANALYSIS ---
def generate_feedback_with_gpt4(extracted_text):
    prompt = f"""
You are a safety and risk assessment expert. Analyze the following maintenance or safety report text and provide:

1. **Risks Identified** 🔴 Mention any hazards, failures, or dangerous conditions.
2. **Safety Recommendations** ✅ Give practical suggestions to mitigate those risks.
3. **Overall Assessment** 🟡 Summarize how safe the environment appears based on the content.

Use clear, professional English.

Extracted Text:
\"\"\"
{extracted_text}
\"\"\"
"""
    try:
        completion = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert in safety and risk assessment."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=800
        )
        return completion.choices[0].message.content.strip()
    except Exception as e:
        print(f"[GPT-4 ERROR] {e}")
        raise e

# --- PDF GENERATION ---
def generate_pdf(feedback, filename):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, feedback)

    output_path = f"/tmp/{filename}"
    pdf.output(output_path)
    return output_path

# --- MAIN ENDPOINT ---
@app.route('/upload-document', methods=['POST'])
def upload_document():
    file = request.files['file']
    filename = secure_filename(file.filename)
    file_ext = filename.rsplit('.', 1)[1].lower()

    file.stream.seek(0)
    extracted_text = extract_text_from_file(file.stream, file_ext)
    feedback = generate_feedback_with_gpt4(extracted_text)

    return jsonify({
        "fileId": str(uuid.uuid4()),
        "filename": filename,
        "riskScore": 0,  # Tu peux ajouter un calcul plus tard
        "extractedText": extracted_text,
        "feedback": feedback  # ✅ Le feedback IA est bien retourné
    })

# --- LAUNCH ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
