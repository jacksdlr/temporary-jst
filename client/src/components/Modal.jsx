import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AiOutlineClose, AiOutlineQuestionCircle } from 'react-icons/ai';
import {
  closeRecoveryModal,
  setRecoveryScore,
  addSet,
} from '../features/workout/workoutSlice';
import { directory } from '../utils/directory';

const Modal = () => {
  const dispatch = useDispatch();

  const { workout, recoveryModal } = useSelector((store) => store.workout);

  let musclesAllowedProgression = [];
  workout.exercises
    .filter((exercise) => exercise.performanceScore < 3)
    .map((exercise) => {
      const { muscleGroup, performanceScore } = exercise;
      let existingMuscle = musclesAllowedProgression.find(
        (muscle) => muscle.muscleGroup == muscleGroup
      );
      if (!existingMuscle) {
        musclesAllowedProgression.push({ muscleGroup, performanceScore });
      } else if (performanceScore < existingMuscle.performanceScore) {
        existingMuscle.performanceScore = performanceScore;
      }
    });

  if (!musclesAllowedProgression) {
    return;
  }

  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h3>Recovery Feedback</h3>
        <h5 className='border-bottom'>
          Before being trained again, how well did each muscle group recover
          from this workout last time?{' '}
          {/* <AiOutlineQuestionCircle
          onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          /> */}
        </h5>
        {musclesAllowedProgression.map(
          (muscle) => {
            const { muscleGroup } = muscle;
            return (
              <div key={muscleGroup} className='muscle-container border-bottom'>
                <h5 className={`muscle ${muscleGroup}`}>{muscleGroup}</h5>
                <div className='btn-container'>
                  <button
                    className={`btn answer-btn ${
                      recoveryModal[muscleGroup] == 1 && 'selected-btn'
                    }`}
                    onClick={() => {
                      dispatch(
                        setRecoveryScore({ muscleGroup, recoveryScore: 1 })
                      );
                    }}
                  >
                    Did not get sore
                  </button>
                  <button
                    className={`btn answer-btn ${
                      recoveryModal[muscleGroup] == 2 && 'selected-btn'
                    }`}
                    onClick={() => {
                      dispatch(
                        setRecoveryScore({ muscleGroup, recoveryScore: 2 })
                      );
                    }}
                  >
                    Sore only for a few hours/next day
                  </button>
                  <button
                    className={`btn answer-btn ${
                      recoveryModal[muscleGroup] == 3 && 'selected-btn'
                    }`}
                    onClick={() => {
                      dispatch(
                        setRecoveryScore({ muscleGroup, recoveryScore: 3 })
                      );
                    }}
                  >
                    Healed completely just on time
                  </button>
                  <button
                    className={`btn answer-btn ${
                      recoveryModal[muscleGroup] == 4 && 'selected-btn'
                    }`}
                    onClick={() => {
                      dispatch(
                        setRecoveryScore({ muscleGroup, recoveryScore: 4 })
                      );
                    }}
                  >
                    Still sore when next training the muscle
                  </button>
                </div>
              </div>
            );
          }
          // }
        )}
        <div className='close-buttons'>
          <button
            className='btn exit-btn'
            onClick={() => {
              dispatch(closeRecoveryModal());
            }}
          >
            Close
          </button>
          <button
            className='btn confirm-btn'
            onClick={() => {
              musclesAllowedProgression.map((muscle) => {
                const { muscleGroup, performanceScore } = muscle;

                const recoveryScore = recoveryModal[muscleGroup];
                if (!recoveryScore) {
                  toast.error(`No recovery score for ${muscleGroup}`);
                  return;
                }

                let exercises = workout.exercises
                  .filter((exercise) => exercise.muscleGroup == muscleGroup)
                  .map((exercise) => ({ ...exercise }));

                if (recoveryScore == 1 && performanceScore == 1) {
                  // muscle.allocatedSets = 3;
                  muscle.allocatedSets = 2;
                } else if (
                  (recoveryScore == 1 && performanceScore == 2) ||
                  (performanceScore == 1 && recoveryScore == 2)
                ) {
                  muscle.allocatedSets = 2;
                } else if (
                  (performanceScore == 2 && recoveryScore == 2) ||
                  (performanceScore == 2 && recoveryScore == 3) ||
                  recoveryScore == 3
                ) {
                  muscle.allocatedSets = 1;
                } else {
                  muscle.allocatedSets = 0;
                }

                for (; muscle.allocatedSets; ) {
                  exercises
                    .sort((a, b) => a.sets.length - b.sets.length)
                    .sort((a, b) => a.performanceScore - b.performanceScore);

                  const exercise = exercises[0];

                  const newSet = {
                    weight: exercise.sets[exercise.sets.length - 1].weight,
                    targetReps: exercise.repRange.match(/^\d+/)[0],
                    targetRIR:
                      exercise.sets[exercise.sets.length - 1].targetRIR,
                    newSet: true,
                  };
                  dispatch(addSet({ newSet, id: exercise._id }));

                  exercises[0] = {
                    ...exercise,
                    performanceScore: exercise.performanceScore + 1,
                    sets: [...exercise.sets, newSet],
                  };

                  muscle.allocatedSets--;
                }
              });
              dispatch(closeRecoveryModal());
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
