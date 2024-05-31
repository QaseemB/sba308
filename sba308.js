// The provided course information.
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
    console.log(ag)
    let ProcessedLearners = {};
    let bestGradePossible = 0
    const currentDate = new Date();
AssignmentGroup.assignments.forEach(assignment => {
    if (new Date(assignment.due_at) <= currentDate) {
        bestGradePossible += assignment.points_possible;
    }
});
    // let sum = 0
    // for(const abc of ag){
        for (abc in ag ){
        //  bestGradePossible += abc.points_possible;
        if (ag.hasOwnProperty(abc)){
            const assignment = ag[abc];
            bestGradePossible += abc.points_possible;
        }
        

    }
   for (xyz of submissions){
    const learnerId = xyz.learner_id;
    const totalpoints = xyz.submission.score;
    // const assignedProject= xyz.assignment_id;
    if (!ProcessedLearners[learnerId]){
        ProcessedLearners[learnerId] = {
            id: learnerId,
            totalPointsEarned: 0,  
            assignments:  0,
            avg: {}
        };   
    //    let weightedgrad = ad.find(w => w.id === assignmentID).points_possible / bestGradePossible;
        // let weightedgrade = 1;
     } 
     let weightedgrade = 1;
     ProcessedLearners[learnerId].totalPointsEarned += totalpoints * weightedgrade;
     ProcessedLearners[learnerId].avg.push({
        assignmentID : xyz.assignment_id,
        score: totalpoints
     });
    }
    return Object.values(ProcessedLearners);
  }
  const results = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(results);

  