//using CITS_DataAccessLayer;
//using CITS_DataAccessLayer.Models;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Options;

//namespace Debug
//{
//    internal class Program
//    {
//        static void Main(string[] args)
//        {
//            var context = new MyDbContext();
//            var interviewRepo = new InterviewRepository(context);

//            // Test 1: Get all interviews for a candidate
//            Console.WriteLine("Interviews for candidate with ID 1:");
//            var interviews = interviewRepo.GetInterviewsByCandidateId(1);
//            Console.WriteLine(interviews.Count);
//        }
//    }
//}
