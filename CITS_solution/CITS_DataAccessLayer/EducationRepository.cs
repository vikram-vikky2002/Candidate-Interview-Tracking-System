using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CITS_DataAccessLayer.Models;

namespace CITS_DataAccessLayer
{
    public class EducationRepository
    {
        public CitsdbContext _context { get; set; }
        public EducationRepository()
        {
            _context = new CitsdbContext();
        }
        public List<Education> GetEducationByCandidateId(int candidateId)
        {
            return _context.Educations
                .Where(e => e.CandidateId == candidateId)
                .ToList();
        }

        // Add new education record
        public void AddEducation(Education education)
        {
            _context.Educations.Add(education);
            _context.SaveChanges();
        }

        // Delete an education record
        public void DeleteEducation(int educationId)
        {
            var edu = _context.Educations.Find(educationId);
            if (edu != null)
            {
                _context.Educations.Remove(edu);
                _context.SaveChanges();
            }
        }
    }
}
