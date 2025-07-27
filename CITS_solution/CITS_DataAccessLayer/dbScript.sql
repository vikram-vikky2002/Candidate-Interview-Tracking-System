USE [master]
GO

IF (EXISTS (SELECT name FROM master.dbo.sysdatabases 
WHERE ('[' + name + ']' = N'CITSDB'OR name = N'CITSDB')))
DROP DATABASE CITSDB
GO

-- Create Database
CREATE DATABASE CITSDB;
GO
USE CITSDB;
GO

-- 1. Roles Table (Recruiter, Interviewer, Admin)
CREATE TABLE Roles (
    RoleID INT CONSTRAINT pk_Roles_RoleID PRIMARY KEY IDENTITY,
    RoleName VARCHAR(50) NOT NULL CONSTRAINT uq_Roles_RoleName UNIQUE
);
GO

-- 2. Users Table
CREATE TABLE Users (
    UserID INT CONSTRAINT pk_Users_UserID PRIMARY KEY IDENTITY,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL CONSTRAINT uq_Users_Email UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    RoleID INT NOT NULL CONSTRAINT fk_Users_RoleID FOREIGN KEY REFERENCES Roles(RoleID),
    CreatedAt DATETIME CONSTRAINT def_Users_CreatedAt DEFAULT GETDATE()
);
GO


-- 3. InterviewStages Table
CREATE TABLE InterviewStages (
    StageID INT CONSTRAINT pk_InterviewStages_StageID PRIMARY KEY IDENTITY,
    StageName VARCHAR(50) NOT NULL -- e.g., Resume Screening, Tech Round 1, HR, Final
);
GO


-- 4. Candidates Table (Enhanced version)
CREATE TABLE Candidates (
    CandidateID INT CONSTRAINT pk_Candidates_CandidateID PRIMARY KEY IDENTITY,
    FullName VARCHAR(100),
    Email VARCHAR(100),
    Phone VARCHAR(20),
    ResumeLink VARCHAR(255),
    Experience_Years INT,
    Match_Percentage FLOAT,
    Summary TEXT,
    CurrentStageID INT CONSTRAINT fk_Candidates_CurrentStageID FOREIGN KEY REFERENCES InterviewStages(StageID),
    Status VARCHAR(50) NOT NULL CONSTRAINT chk_Candidates_Status CHECK (Status IN ('In Progress', 'Selected', 'Rejected', 'Applied')),
    AppliedFor VARCHAR(100),
    CreatedAt DATETIME CONSTRAINT def_Candidates_CreatedAt DEFAULT GETDATE()
);
GO


-- 5. Education Table
CREATE TABLE Education (
    EducationID INT PRIMARY KEY IDENTITY(1,1),
    CandidateID INT,
    Degree VARCHAR(255),
    Institute VARCHAR(255),
    Year VARCHAR(10),
    FOREIGN KEY (CandidateID) REFERENCES Candidates(CandidateID)
);
GO


-- 6. Skills Table
CREATE TABLE Skills (
    SkillID INT PRIMARY KEY IDENTITY(1,1),
    Skill_Name VARCHAR(100) UNIQUE
);
GO


-- 7. CandidateSkills Table
CREATE TABLE CandidateSkills (
    ID INT PRIMARY KEY IDENTITY(1,1),
    CandidateID INT,
    SkillID INT,
    FOREIGN KEY (CandidateID) REFERENCES Candidates(CandidateID),
    FOREIGN KEY (SkillID) REFERENCES Skills(SkillID)
);
GO


-- 8. Interviews Table
CREATE TABLE Interviews (
    InterviewID INT CONSTRAINT pk_Interviews_InterviewID PRIMARY KEY IDENTITY,
    CandidateID INT NOT NULL CONSTRAINT fk_Interviews_CandidateID FOREIGN KEY REFERENCES Candidates(CandidateID),
    ScheduledDateTime DATETIME,
    InterviewMode VARCHAR(50) NOT NULL CONSTRAINT chk_Interviews_InterviewMode CHECK (InterviewMode IN ('Online', 'Offline')),
    InterviewerID INT NOT NULL CONSTRAINT fk_Interviews_InterviewerID FOREIGN KEY REFERENCES Users(UserID),
    StageID INT NOT NULL CONSTRAINT fk_Interviews_StageID FOREIGN KEY REFERENCES InterviewStages(StageID),
    Status VARCHAR(50) NOT NULL CONSTRAINT chk_Interviews_Status CHECK (Status IN ('Scheduled', 'Completed', 'Cancelled'))
);
GO

-- 9. Evaluation Table
CREATE TABLE Evaluations (
    EvaluationID INT CONSTRAINT pk_AI_Evaluations_EvaluationID PRIMARY KEY IDENTITY,
    CandidateID INT NOT NULL CONSTRAINT fk_AI_Evaluations_CandidateID FOREIGN KEY REFERENCES Candidates(CandidateID),
  	InterviewID INT NOT NULL CONSTRAINT fk_Evaluations_InterviewID FOREIGN KEY REFERENCES Interviews(InterviewID),
    EvaluationType VARCHAR(100), -- e.g., Resume Score, Personality Score
    Score FLOAT,
    Feedback TEXT,
    EvaluatedAt DATETIME DEFAULT GETDATE()
);
GO

select * from Roles;
select * from Users;
select * from InterviewStages;
select * from Candidates;
select * from Education;
select * from Skills;
select * from CandidateSkills;
select * from Interviews;
select * from Evaluations;
    