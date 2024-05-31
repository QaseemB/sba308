const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];





function getLearnerData(course, ag, submissions) {
  let ProcessedLearners = {};

  // Step 1: Calculate weighted average and assign percentages for each assignment
  for (const submission of submissions) {
      const learnerId = submission.learner_id;
      const assignmentId = submission.assignment_id;
      const score = submission.submission.score;
      
      // Skip unsubmitted assignments
      if (!ProcessedLearners[learnerId]) {
          ProcessedLearners[learnerId] = {
              id: learnerId,
              totalScore: 0,
              totalPointsPossible: 0,
              assignmentScores: {}
          };
      }
      
      const assignment = ag.assignments.find(a => a.id === assignmentId);
      
      // Exclude unsubmitted assignments
      if (assignment && new Date(assignment.due_at) <= new Date()) {
          const pointsPossible = assignment.points_possible;
          ProcessedLearners[learnerId].totalScore += score;
          ProcessedLearners[learnerId].totalPointsPossible += pointsPossible;
          ProcessedLearners[learnerId].assignmentScores[assignmentId] = (score / pointsPossible) * 100;
      }
  }

  // Step 2: Calculate weighted average for each learner
  for (const learnerId in ProcessedLearners) {
      const learner = ProcessedLearners[learnerId];
      learner.avg = (learner.totalScore / learner.totalPointsPossible) * 100;
  }

  return Object.values(ProcessedLearners);
}

// Example usage
const results = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(results);
