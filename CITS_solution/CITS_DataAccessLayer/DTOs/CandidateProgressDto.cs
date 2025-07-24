using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CITS_DataAccessLayer.DTOs
{
    public class CandidateProgressDto
    {
        public string CandidateName { get; set; }
        public string CurrentStage { get; set; }
        public List<string> CompletedStages { get; set; }
    }
}
