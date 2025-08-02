USE CITSDB;
GO

INSERT INTO Roles (RoleName)
VALUES ('Recruiter'), ('Interviewer'), ('Admin');
GO

INSERT INTO Users (FullName, Email, PasswordHash, RoleID)
VALUES 
('Alice Johnson', 'alice.recruiter@cits.com', 'hashpass1', 1),
('Bob Smith', 'bob.interviewer@cits.com', 'hashpass2', 2),
('Clara Admin', 'clara.admin@cits.com', 'hashpass3', 3);
GO

INSERT INTO InterviewStages (StageName)
VALUES 
('Resume Screening'),
('Technical Round 1'),
('Technical Round 2'),
('HR Round'),
('Final Decision');
GO

INSERT INTO Candidates (FullName, Email, Phone, ResumeLink, Experience_Years, Match_Percentage, Summary, CurrentStageID, Status, AppliedFor)
VALUES 
('David Lee', 'david.lee@example.com', '9876543210', 'https://resumes.com/davidlee', 3, 85.5, 'Experienced Java developer', 2, 'In Progress', 'Backend Developer'),
('Eva Green', 'eva.green@example.com', '9123456780', 'https://resumes.com/evagreen', 5, 92.3, 'Fullstack engineer with Angular & Node.js', 3, 'In Progress', 'Full Stack Developer'),
('Frank White', 'frank.white@example.com', '9988776655', 'https://resumes.com/frankwhite', 2, 78.0, 'Python developer with data science skills', 1, 'Rejected', 'Data Analyst');
GO

INSERT INTO Education (CandidateID, Degree, Institute, Year)
VALUES
(6, 'B.Tech Computer Science', 'IIT Bombay', '2019'),
(7, 'M.Tech Information Tech', 'NIT Trichy', '2020'),
(8, 'B.Sc Statistics', 'University of Madras', '2021');
GO

INSERT INTO Skills (Skill_Name)
VALUES 
('Java'), 
('Python'), 
('Angular'), 
('Node.js'), 
('SQL'), 
('Data Analysis');
GO

INSERT INTO CandidateSkills (CandidateID, SkillID)
VALUES
(6, 1), -- David: Java
(6, 5), -- David: SQL
(7, 3), -- Eva: Angular
(7, 4), -- Eva: Node.js
(8, 2), -- Frank: Python
(8, 6); -- Frank: Data Analysis
GO


INSERT INTO Interviews (CandidateID, ScheduledDateTime, InterviewMode, InterviewerID, StageID, Status)
VALUES
(7, '2025-07-30 23:00:00', 'Online', 2, 2, 'Scheduled'),
(6, '2025-07-31 11:00:00', 'Offline', 2, 3, 'Scheduled'),
(8, '2025-07-31 15:30:00', 'Online', 2, 1, 'Cancelled');
GO

INSERT INTO Evaluations (CandidateID, InterviewID, EvaluationType, Score, Feedback)
VALUES
(7, 7, 'Technical Score', 82.0, 'Good knowledge of core Java concepts'),
(6, 6, 'Technical Score', 90.5, 'Excellent in full-stack problem solving'),
(8, 8, 'Resume Score', 70.0, 'Decent resume but lacks clarity on projects');
GO

SELECT * FROM Roles;
SELECT * FROM Users;
SELECT * FROM InterviewStages;
SELECT * FROM Interviews;
SELECT * FROM Candidates;
SELECT * FROM Education;
SELECT * FROM Skills;
SELECT * FROM CandidateSkills;
	
SELECT * FROM Evaluations;
INSERT INTO Interviews (CandidateID, ScheduledDateTime, InterviewMode, InterviewerID, StageID, Status)
VALUES
(1004, '2025-07-30 23:00:00', 'Online', 2, 2, 'Scheduled')
GO