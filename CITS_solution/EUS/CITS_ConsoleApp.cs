
using System;
using System.Collections.Generic;
using CITS_DataAccessLayer;
using CITS_DataAccessLayer.Models;

namespace CITS_ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("===== CITS Console App Demo =====");

            var eduRepo = new EducationRepository();
            var skillsRepo = new SkillsRepository();
            var utilRepo = new UtilityRepository();

            // ===== Education Tests =====
            Console.WriteLine("\n--- Education ---");
            var educationList = eduRepo.GetEducationByCandidateId(1);
            foreach (var edu in educationList)
            {
                Console.WriteLine($"Degree: {edu.Degree}, Institute: {edu.Institute}, Year: {edu.Year}");
            }

            // Add a new education (commented to avoid duplicate insert)
            //eduRepo.AddEducation(new Education { CandidateId = 1, Degree = "B.Tech", Institute = "XYZ University", Year = "2020" });

            // ===== Skills Tests =====
            Console.WriteLine("\n--- Skills ---");
            //skillsRepo.AddSkill("C#");
            //skillsRepo.AssignSkillToCandidate(1, 1); // Assuming SkillID 1, CandidateID 1
            var skillList = skillsRepo.GetSkillsByCandidateId(1);
            foreach (var skill in skillList)
            {
                Console.WriteLine($"Skill: {skill.SkillName}");
            }

            // ===== Utility Tests =====
            Console.WriteLine("\n--- Dashboard Stats ---");
            var stats = utilRepo.GetDashboardStats();
            Console.WriteLine($"Total Candidates: {stats.TotalCandidates}");
            Console.WriteLine($"Scheduled Interviews: {stats.InterviewsScheduled}");
            Console.WriteLine($"Selected Candidates: {stats.SelectedCandidates}");
            Console.WriteLine($"Rejected Candidates: {stats.RejectedCandidates}");

            Console.WriteLine("\n--- Candidate Progress ---");
            var progress = utilRepo.GetCandidateProgress(1);
            if (progress != null)
            {
                Console.WriteLine($"Candidate: {progress.CandidateName}");
                Console.WriteLine($"Current Stage: {progress.CurrentStage}");
                Console.WriteLine("Completed Stages: " + string.Join(", ", progress.CompletedStages));
            }
            else
            {
                Console.WriteLine("Candidate not found.");
            }
        }
    }
}
