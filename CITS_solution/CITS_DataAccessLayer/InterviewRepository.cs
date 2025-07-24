using CITS_DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITS_DataAccessLayer
{
    public class InterviewRepository
    {
        public CitsdbContext Context { get; set; }

        public InterviewRepository()
        {
            Context = new CitsdbContext();
        }

        //Interview CRUD
        public List<Interview> GetInterviewsByCandidateId(int candidateId)
        {
            List<Interview> interviews = new List<Interview>();

            try
            {
                interviews = Context.Interviews
                                .Include(i => i.Stage)
                                .Include(i => i.Interviewer)
                                .Where(i => i.CandidateId == candidateId)
                                .ToList();
            }
            catch (Exception ex)
            {
                interviews = null;
            }

            return interviews;
        }

        public List<Interview> GetInterviewsByInterviewer(int userId)
        {
            List<Interview> interviews = new List<Interview>();

            try
            {
                interviews = Context.Interviews
                                .Include(i => i.Candidate)
                                .Include(i => i.Stage)
                                .Where(i => i.InterviewerId == userId)
                                .ToList();
            }
            catch (Exception ex)
            {
                interviews = null;
            }

            return interviews;
        }

        public List<Interview> GetUpcomingInterviewsByDate(DateTime date)
        {
            List<Interview> interviews = new List<Interview>();

            try
            {
                interviews = Context.Interviews
                                .Include(i => i.Candidate)
                                .Include(i => i.Interviewer)
                                .Include(i => i.Stage)
                                .Where(i => i.ScheduledDateTime == date.Date && i.Status == "Scheduled")
                                .ToList();
            }
            catch (Exception ex)
            {
                interviews = null;
            }

            return interviews;
        }

        public bool ScheduleInterview(Interview interview)
        {
            try
            {
                Context.Interviews.Add(interview);
                Context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateInterviewStatus(int interviewId, string status)
        {
            try
            {
                var interview = Context.Interviews
                                    .FirstOrDefault(i => i.InterviewId == interviewId);

                if (interview == null)
                {
                    return false;
                }

                interview.Status = status;
                Context.Interviews.Update(interview);
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
