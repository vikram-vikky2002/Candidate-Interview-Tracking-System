using CITS_DataAccessLayer.DTOs;
using CITS_DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;


public class UtilityRepository
{
    public CitsdbContext _context { get; set; }
    public UtilityRepository()
    {
        _context = new CitsdbContext();
    }

    // Candidate progress tracker
    public CandidateProgressDto GetCandidateProgress(int candidateId)
    {
        var candidate = _context.Candidates
            .Include(c => c.CurrentStage)
            .Include(c => c.Interviews)
                .ThenInclude(i => i.Stage)
            .FirstOrDefault(c => c.CandidateId == candidateId);

        if (candidate == null) return null;

        var completedStages = candidate.Interviews
            .Where(i => i.Status == "Completed")
            .Select(i => i.Stage.StageName)
            .Distinct()
            .ToList();

        return new CandidateProgressDto
        {
            CandidateName = candidate.FullName,
            CurrentStage = candidate.CurrentStage?.StageName,
            CompletedStages = completedStages
        };
    }

    // Dashboard statistics
    public DashboardStatsDto GetDashboardStats()
    {
        return new DashboardStatsDto
        {
            TotalCandidates = _context.Candidates.Count(),
            InterviewsScheduled = _context.Interviews.Count(i => i.Status == "Scheduled"),
            SelectedCandidates = _context.Candidates.Count(c => c.Status == "Selected"),
            RejectedCandidates = _context.Candidates.Count(c => c.Status == "Rejected")
        };
    }

    // Search interviews
    public List<Interview> SearchInterviews(DateTime? from, DateTime? to, string interviewerEmail)
    {
        var query = _context.Interviews
            .Include(i => i.Interviewer)
            .AsQueryable();

        if (from.HasValue)
            query = query.Where(i => i.ScheduledDateTime >= from.Value);

        if (to.HasValue)
            query = query.Where(i => i.ScheduledDateTime <= to.Value);

        if (!string.IsNullOrEmpty(interviewerEmail))
            query = query.Where(i => i.Interviewer.Email == interviewerEmail);

        return query.ToList();
    }
}
