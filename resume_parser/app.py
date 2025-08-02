import asyncio
import json
import os
import re
from typing import List, Dict, Any, Optional

import PyPDF2
import spacy
from docx import Document
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from hypercorn.asyncio import serve
from hypercorn.config import Config
from pdfminer.high_level import extract_text
from werkzeug.utils import secure_filename

# Configure Gemini
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in environment variables")

genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the Gemini model
model = genai.GenerativeModel('gemini-1.5-flash')

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load spaCy model
try:
    nlp = spacy.load('en_core_web_sm')
except:
    os.system('python -m spacy download en_core_web_sm')
    nlp = spacy.load('en_core_web_sm')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(filepath: str) -> str:
    try:
        return extract_text(filepath)
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""

def extract_text_from_docx(filepath: str) -> str:
    try:
        doc = Document(filepath)
        return '\n'.join([paragraph.text for paragraph in doc.paragraphs])
    except Exception as e:
        print(f"Error extracting text from DOCX: {e}")
        return ""

def extract_skills_with_gemini(text: str, job_description: str = "", other_details: str = "") -> dict:
    """
    Use Gemini AI to extract skills and other relevant information from resume text.
    """
    try:
        prompt = """
        Analyze the following resume text and other details 
        """ + other_details + """
        
        and then extract the following information in JSON format:
        {
            "skills": ["list", "of", "technical", "skills"],
            "experience_years": 0 (related to the job description),
            "education": ["highest degree", "institution", "year of passing"],
            "match_percentage": 0.0 (percentage match with the job description),
            "summary": "brief professional summary"
        }
        
        Resume Text:
        """ + text[:15000]  # Limit text length to avoid token limits
        
        if job_description:
            prompt += """
            
            Match the resume against the following job description:
            """ + job_description[:5000]  # Limit job description length
        
        response = model.generate_content(prompt)
        # print("Gemini Response:", response.text)
        
        try:
            # Try to parse the response as JSON
            result = json.loads(response.text)
        except json.JSONDecodeError:
            # If response is not valid JSON, try to extract JSON from the text
            json_match = re.search(r'```(?:json\n)?(.*?)```', response.text, re.DOTALL)
            if json_match:
                result = json.loads(json_match.group(1).strip())
            else:
                # Fallback to extracting just the skills
                skills_pattern = r'\b(python|java|javascript|c\+\+|c#|ruby|php|swift|kotlin|django|flask|react|angular|vue|node\.js|express|spring|sql|mongodb|postgresql|mysql|aws|azure|docker|kubernetes|git|machine learning|deep learning|ai|data analysis|pandas|numpy|tensorflow|pytorch|scikit-learn|nlp|computer vision)\b'
                result = {"skills": list(set(re.findall(skills_pattern, text.lower())))}
        
        # Ensure all required fields exist in the result
        if not isinstance(result.get('skills'), list):
            result['skills'] = []
        if not isinstance(result.get('experience_years'), (int, float)):
            result['experience_years'] = 0
        if not isinstance(result.get('education'), list):
            result['education'] = []
        if not isinstance(result.get('match_percentage'), (int, float)):
            result['match_percentage'] = 0.0
        if not isinstance(result.get('summary'), str):
            result['summary'] = ''
            
        return result
    except Exception as e:
        print(f"Error in extract_skills_with_gemini: {str(e)}")
        return {"skills": [], "experience_years": 0, "education": [], "summary": ""}

def extract_skills(text: str) -> List[str]:
    # Fallback to basic skill extraction if Gemini fails
    skills = [
        'python', 'java', 'javascript', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin',
        'django', 'flask', 'react', 'angular', 'vue', 'node.js', 'express', 'spring',
        'sql', 'mongodb', 'postgresql', 'mysql', 'aws', 'azure', 'docker', 'kubernetes',
        'git', 'machine learning', 'deep learning', 'ai', 'data analysis', 'pandas',
        'numpy', 'tensorflow', 'pytorch', 'scikit-learn', 'nlp', 'computer vision'
    ]
    
    doc = nlp(text.lower())
    found_skills = set()
    
    for skill in skills:
        if skill in text.lower():
            found_skills.add(skill)
    
    for chunk in doc.noun_chunks:
        chunk_text = chunk.text.lower()
        if any(skill in chunk_text for skill in skills):
            found_skills.add(chunk_text)
    
    return list(found_skills)

def calculate_match_percentage(resume_text: str, job_description: str = "") -> float:
    # Simple implementation - can be enhanced with more sophisticated matching
    if not job_description:
        return 0.0
    
    resume_skills = set(extract_skills(resume_text))
    job_skills = set(extract_skills(job_description))
    
    if not job_skills:
        return 0.0
    
    match_percentage = (len(resume_skills.intersection(job_skills)) / len(job_skills)) * 100
    return round(min(match_percentage, 100), 2)  # Cap at 100%

@app.route('/api/parse', methods=['POST'])
async def parse_resume():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    job_description = request.form.get('job_description', '')
    other_details = request.form.get('other_details', '')
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Extract text based on file type
        if filename.lower().endswith('.pdf'):
            text = extract_text_from_pdf(filepath)
        elif filename.lower().endswith('.docx'):
            text = extract_text_from_docx(filepath)
        else:  # txt
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    text = f.read()
            except UnicodeDecodeError:
                try:
                    with open(filepath, 'r', encoding='latin-1') as f:
                        text = f.read()
                except Exception as e:
                    print(f"Error reading TXT file with fallback encoding: {e}")
                    return jsonify({'error': 'Unable to read the text file. Unsupported encoding.'}), 500
        
        # Clean up the uploaded file
        try:
            os.remove(filepath)
        except Exception as e:
            print(f"Error removing file: {e}")
        
        # Extract information using Gemini AI
        gemini_response = extract_skills_with_gemini(text, job_description, other_details)

        # print("Gemini Response:", gemini_response)
        
        # Fallback to basic extraction if Gemini fails
        if not gemini_response or 'skills' not in gemini_response:
            gemini_response = {
                'skills': extract_skills(text),
                'experience_years': 0,
                'education': [],
                'summary': ''
            }
        
        # Calculate match percentage
        # match_percentage = calculate_match_percentage(text, job_description)
        
        # Extract contact information
        email = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
        phone = re.search(r'\+?[\d\s-]{10,}', text)
        
        return jsonify({
            'success': True,
            'data': {
                'summary': gemini_response.get('summary', ''),
                'skills': gemini_response.get('skills', []),
                'experience_years': gemini_response.get('experience_years', 0),
                'education': gemini_response.get('education', []),
                'contact': {
                    'email': email.group(0) if email else '',
                    'phone': phone.group(0).strip() if phone else ''
                },
                'match_percentage': gemini_response.get('match_percentage', 0.0),
                'analysis': gemini_response  # Include full Gemini response for debugging
            }
        })
    
    return jsonify({'error': 'File type not allowed'}), 400

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=7183)
