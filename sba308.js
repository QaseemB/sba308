const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

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
  let bestGradePossible = 0;
  const currentDate = new Date();

  ag.assignments.forEach(assignment => {
    if (new Date(assignment.due_at) <= currentDate) {
      bestGradePossible += assignment.points_possible;
    }
  });

  submissions.forEach(submission => {
    const learnerId = submission.learner_id;
    const assignmentId = submission.assignment_id;
    const score = submission.submission.score;

    const assignment = ag.assignments.find(a=> a.id === assignmentId);

    if (new Date(assignment.due_at) <= currentDate) {
      if (!ProcessedLearners[learnerId]) {
        ProcessedLearners[learnerId] = {
          id: learnerId,
          avg: 0,
          assignments: {}
        };
      }

     
      const percentageScore = (score / assignment.points_possible) * 100;
      ProcessedLearners[learnerId].avg += score;
      ProcessedLearners[learnerId].assignments[assignmentId] = percentageScore;
    }
  });

  Object.keys(ProcessedLearners).forEach(learnerId => {
    const learner = ProcessedLearners[learnerId];
    learner.avg = (learner.avg / bestGradePossible) * 100;
  });

  return Object.values(ProcessedLearners);
}

const results = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(results)
