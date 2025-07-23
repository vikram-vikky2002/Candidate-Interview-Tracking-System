# AI Resume Parser API

A Flask-based API for parsing resumes, extracting skills, and calculating job match percentages.

## Features

- Upload resumes in PDF, DOCX, or TXT format
- Extract skills from resumes
- Calculate match percentage against a job description
- Extract contact information (email, phone)
- RESTful API endpoints

## Setup

1. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\\venv\\Scripts\\activate  # On Windows
   # or
   source venv/bin/activate     # On macOS/Linux
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Download the spaCy English model:
   ```bash
   python -m spacy download en_core_web_sm
   ```

## Running the API

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Parse Resume
- **Endpoint**: `POST /api/parse`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `file`: The resume file (PDF, DOCX, or TXT)
  - `job_description`: (Optional) Job description text for match percentage

### Health Check
- **Endpoint**: `GET /api/health`
- **Response**: `{"status": "healthy"}`

## Example Usage

### Using cURL
```bash
curl -X POST -F "file=@resume.pdf" -F "job_description=Looking for a Python developer with Flask experience" http://localhost:5000/api/parse
```

### Using Python (requests)
```python
import requests

url = 'http://localhost:5000/api/parse'
files = {'file': open('resume.pdf', 'rb')}
data = {'job_description': 'Looking for a Python developer with Flask experience'}

response = requests.post(url, files=files, data=data)
print(response.json())
```

## Response Format

```json
{
  "success": true,
  "data": {
    "text": "Resume text content...",
    "skills": ["python", "flask", "machine learning"],
    "contact": {
      "email": "user@example.com",
      "phone": "+1234567890"
    },
    "match_percentage": 75.5
  }
}
```

## License

MIT
