import requests
import json
import os
import sys

def test_parse_resume():
    url = 'http://localhost:5000/api/parse'
    
    # Look for common resume file names in the current directory
    test_files = [f for f in os.listdir('.') if f.lower().endswith(('.pdf', '.docx', '.txt'))]
    
    if not test_files:
        print("No test files found. Please add a PDF, DOCX, or TXT file to the directory.")
        return
    
    file_path = test_files[0]  # Use the first found file
    print(f"Using test file: {file_path}")
    
    job_description = """
    We are looking for a Python developer with experience in:
    - Python, Flask, Django
    - RESTful APIs
    - Machine Learning
    - Docker and Kubernetes
    - AWS
    """
    
    try:
        with open(file_path, 'rb') as f:
            files = {'file': (os.path.basename(file_path), f, 'application/pdf')}
            data = {'job_description': job_description}
            
            print(f"Sending request to {url}...")
            response = requests.post(url, files=files, data=data)
            
            print(f"Status Code: {response.status_code}")
            print("Headers:", response.headers)
            
            try:
                print("Response JSON:")
                print(json.dumps(response.json(), indent=2))
            except json.JSONDecodeError:
                print("Response is not JSON:")
                print(response.text[:1000])  # Print first 1000 chars of response
            
    except FileNotFoundError:
        print(f"Test file not found: {file_path}")
    except requests.exceptions.ConnectionError:
        print("Could not connect to the server. Is it running? Run 'python app.py' in a separate terminal.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        import traceback
        traceback.print_exc()

def check_server():
    try:
        response = requests.get('http://localhost:5000/api/health', timeout=5)
        print(f"Server is running. Status: {response.status_code}")
        print("Response:", response.text)
        return True
    except requests.exceptions.RequestException as e:
        print(f"Server is not running or not responding: {e}")
        return False

if __name__ == '__main__':
    print("Checking if server is running...")
    if not check_server():
        print("\nPlease start the server first by running 'python app.py' in a separate terminal.")
        sys.exit(1)
    
    print("\nRunning resume parser test...")
    test_parse_resume()
