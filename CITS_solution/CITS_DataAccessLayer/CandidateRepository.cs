using CITS_DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITS_DataAccessLayer
{
    public class CandidateRepository
    {
        public CitsdbContext _context { get; set; }
        public CandidateRepository()
        {
            _context = new CitsdbContext();
        }
        //GetAllCandidates
        public List<Candidate> GetAllCandidates()
        {
            List<Candidate> candidates = new List<Candidate>();
            try
            {
                candidates = _context.Candidates.ToList();
            }
            catch (Exception ex)
            {
                candidates = null;
            }
            return candidates;
        }
        //GetCandidateById
        public Candidate GetCandidateById(int candidateId)
        {
            Candidate candidate = new Candidate();
            try
            {
                candidate = _context.Candidates.FirstOrDefault(c => c.CandidateId == candidateId);
            }
            catch (Exception ex)
            {
                candidate = null;
            }
            return candidate;
        }
        //AddCandidate
        public int AddCandidate(Candidate candidate)
        {
            try
            {
                _context.Candidates.Add(candidate);
                _context.SaveChanges();
                return candidate.CandidateId;
            }
            catch (Exception ex)
            {
                return -99;
            }
        }
        //UpdateCandidate
        public bool UpdateCandidate(Candidate candidate)
        {
            try
            {
                var existingCandidate = _context.Candidates.FirstOrDefault(c => c.CandidateId == candidate.CandidateId);
                if (existingCandidate != null)
                {
                    existingCandidate.FullName = candidate.FullName;
                    existingCandidate.Email = candidate.Email;
                    existingCandidate.Phone = candidate.Phone;
                    existingCandidate.AppliedFor = candidate.AppliedFor;
                    existingCandidate.ExperienceYears = candidate.ExperienceYears;
                    existingCandidate.ResumeLink = candidate.ResumeLink;
                    existingCandidate.Status = candidate.Status;
                    existingCandidate.Summary = candidate.Summary;
                    existingCandidate.MatchPercentage = candidate.MatchPercentage;
                    existingCandidate.CurrentStageId = candidate.CurrentStageId;
                    existingCandidate.CreatedAt = candidate.CreatedAt;
                    _context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        //DeleteCandidate
        public bool DeleteCandidate(int candidateId)
        {
            try
            {
                var candidate = _context.Candidates.FirstOrDefault(c => c.CandidateId == candidateId);
                if (candidate != null)
                {
                    _context.Candidates.Remove(candidate);
                    _context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        //GetCandidatesByStatus
        public List<Candidate> GetCandidatesByStatus(string status)
        {
            List<Candidate> candidates = new List<Candidate>();
            try
            {
                candidates = _context.Candidates.Where(c => c.Status == status).ToList();
            }
            catch (Exception ex)
            {
                candidates = null;
            }
            return candidates;
        }
    }
}
