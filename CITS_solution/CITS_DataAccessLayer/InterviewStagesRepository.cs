using CITS_DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITS_DataAccessLayer
{
    public class InterviewStagesRepository
    {
        public CitsdbContext Context { get; set; }

        public InterviewStagesRepository()
        {
            Context = new CitsdbContext();
        }


        public List<InterviewStage> GetAllInterviewStages()
        {
            List<InterviewStage> interviewStages = new List<InterviewStage>();
            try
            {
                interviewStages = Context.InterviewStages.ToList();
            }
            catch (Exception)
            {
                interviewStages = null;
            }

            return interviewStages;
        }

        public bool AddInterviewStage(InterviewStage stage)
        {
            try
            {
                Context.InterviewStages.Add(stage);
                Context.SaveChanges();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
