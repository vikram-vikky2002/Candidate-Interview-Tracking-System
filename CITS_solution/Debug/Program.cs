using CITS_DataAccessLayer;

namespace Debug
{
    internal class Program
    {
        static void Main(string[] args)
        {
            InterviewRepository repository = new InterviewRepository();

            var res = repository.GetInterviewsByInterviewer(1);
            Console.WriteLine(res.Count);
        }
    }
}
