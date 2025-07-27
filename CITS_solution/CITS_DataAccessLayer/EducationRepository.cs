using System;
using System.Collections.Generic;
using System.Linq;
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

        // Get education list by candidate ID
        public List<Education> GetEducationByCandidateId(int candidateId)
        {
            return _context.Educations
                .Where(e => e.CandidateId == candidateId)
                .ToList();
        }

        // Add new education record - return the added object
        public Education AddEducation(Education education)
        {
            _context.Educations.Add(education);
            _context.SaveChanges();
            return education; // Now you return the created record (with generated ID)
        }

        // Delete an education record - return a bool indicating success/failure
        public bool DeleteEducation(int educationId)
        {
            var edu = _context.Educations.Find(educationId);
            if (edu != null)
            {
                _context.Educations.Remove(edu);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
