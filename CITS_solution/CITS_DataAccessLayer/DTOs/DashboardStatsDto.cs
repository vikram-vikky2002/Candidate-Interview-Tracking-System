using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITS_DataAccessLayer.DTOs
{
    public class DashboardStatsDto
    {
        public int TotalCandidates { get; set; }
        public int InterviewsScheduled { get; set; }
        public int SelectedCandidates { get; set; }
        public int RejectedCandidates { get; set; }
    }
}
