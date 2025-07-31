using CITS_DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITS_DataAccessLayer
{
    public class EvalutionRepository
    {
        public CitsdbContext _context { get; set; }
        public EvalutionRepository()
        {
            _context = new CitsdbContext();
        }
        public bool AddEvaluation(Evaluation evaluation)
        {
            try
            {
               var t = _context.Evaluations.Add(evaluation);
                if (t != null)
                {
                    _context.SaveChanges();
                    var interview = _context.Interviews.Find(evaluation.InterviewId);
                    if (interview != null)
                    {
                        interview.Status = "Completed";
                        _context.SaveChanges();
                    }
                }
                else
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public List<Evaluation> GetEvaluationsByCandidateId(int candidateId)
        {
            try
            {
                return _context.Evaluations
                    .Where(e => e.CandidateId == candidateId)
                    .ToList();
            }
            catch (Exception ex)
            {
                return new List<Evaluation>();
            }
        }

        public List<Evaluation> GetEvaluationsByInterviewerId(int interviewerId)
        {
            try
            {
                return _context.Evaluations
                    .Where(e => e.InterviewId == interviewerId)
                    .ToList();
            }
            catch (Exception ex)
            {
                return new List<Evaluation>();
            }
        }
        public Evaluation GetEvaluationByInterviewId(int interviewId)
        {
            return _context.Evaluations.FirstOrDefault(e => e.InterviewId == interviewId);
        }
    }
}
    

