import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AiOutlineClose, AiOutlineQuestionCircle } from 'react-icons/ai';
import {
  closeRecoveryModal,
  setRecoveryScore,
  addSet,
} from '../features/workout/workoutSlice';
import { directory } from '../utils/directory';

const Modal = ({ musclesTrained }) => {
  const dispatch = useDispatch();

  const { workout, recoveryModal } = useSelector((store) => store.workout);

  // const musclesTesting = workout.exercises
  //   .map((exercise) => {
  //     const muscle = directory
  //       .map((item) => {
  //         if (item.exercises) {
  //           const result = item.exercises.find(
  //             (thing) => thing.name == exercise.exerciseName
  //           );
  //           if (result) {
  //             return item.muscleGroup;
  //           }
  //         }
  //       })
  //       .filter((item) => item)[0];
  //     return { muscle, score: exercise.performanceScore };
  //   })
  //   .filter((muscle) => muscle.score < 3);

  // console.log(musclesTesting);

  let musclesAllowedProgression = [];
  workout.exercises
    .map((exercise) => {
      const muscle = directory
        .map((item) => {
          if (item.exercises) {
            const result = item.exercises.find(
              (thing) => thing.name == exercise.exerciseName
            );
            if (result) {
              return item.muscleGroup;
            }
          }
        })
        .filter((item) => item)[0];
      return { muscle, score: exercise.performanceScore };
    })
    .filter((muscle) => muscle.score < 3)
    .map((item) => {
      if (!musclesAllowedProgression.find((muscle) => muscle == item.muscle)) {
        musclesAllowedProgression.push(item.muscle);
      }
    });

  if (!musclesAllowedProgression) {
    return;
  }

  console.log(musclesAllowedProgression);

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
            // if (
            //   musclesAllowedProgression.find(
            //     (allowedMuscle) => allowedMuscle == muscle
            //   )
            // ) {
            return (
              <div key={muscle} className='muscle-container border-bottom'>
                <h5 className={`muscle ${muscle}`}>{muscle}</h5>

                {/* check if they are allowed to have sets added */}

                <div className='btn-container'>
                  <button
                    className={`btn answer-btn ${
                      recoveryModal[muscle] == 1 && 'selected-btn'
                    }`}
                    onClick={() => {
                      dispatch(setRecoveryScore({ muscle, score: 1 }));
                    }}
                  >
                    Did not get sore
                  </button>
                  <button
                    className={`btn answer-btn ${
                      recoveryModal[muscle] == 2 && 'selected-btn'
                    }`}
                    onClick={() => {
                      dispatch(setRecoveryScore({ muscle, score: 2 }));
                    }}
                  >
                    Sore only for a few hours/next day
                  </button>
                  <button
                    className={`btn answer-btn ${
                      recoveryModal[muscle] == 3 && 'selected-btn'
                    }`}
                    onClick={() => {
                      dispatch(setRecoveryScore({ muscle, score: 3 }));
                    }}
                  >
                    Healed completely just on time
                  </button>
                  <button
                    className={`btn answer-btn ${
                      recoveryModal[muscle] == 4 && 'selected-btn'
                    }`}
                    onClick={() => {
                      dispatch(setRecoveryScore({ muscle, score: 4 }));
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
                if (!recoveryModal[muscle]) {
                  toast.error(`No recovery score for ${muscle}`);
                  return;
                }
              });
              workout.exercises.map((exercise, exerciseIndex) => {
                if (
                  recoveryModal[
                    directory
                      .map((item) => {
                        if (item.exercises) {
                          const result = item.exercises.find(
                            (thing) => thing.name == exercise.exerciseName
                          );
                          if (result) {
                            return item.muscleGroup;
                          }
                        }
                      })
                      .filter((item) => item)[0]
                  ] < 3
                ) {
                  const newSet = {
                    weight: exercise.sets[exercise.sets.length - 1].weight,
                    targetReps: exercise.repRange.match(/^\d+/)[0],
                    targetRIR:
                      exercise.sets[exercise.sets.length - 1].targetRIR,
                    newSet: true,
                  };
                  dispatch(addSet({ newSet, exerciseIndex }));
                }
              });
              // for (let i = 0; i < workout.exercises.length; i++) {
              //   if (
              //     recoveryModal[
              //       directory
              //         .map((item) => {
              //           if (item.exercises) {
              //             const exercise = item.exercises.find(
              //               (exercise) =>
              //                 exercise.name == workout.exercises[i].exerciseName
              //             );
              //             if (exercise) {
              //               return item.muscleGroup;
              //             }
              //           }
              //         })
              //         .filter((item) => item)[0]
              //     ] < 3
              //   ) {
              //     const newSet = {
              //       weight:
              //         workout.exercises[i].sets[
              //           workout.exercises[i].sets.length - 1
              //         ].weight,
              //       targetReps: workout.exercises[i].repRange.match(/^\d+/)[0],
              //       targetRIR:
              //         workout.exercises[i].sets[
              //           workout.exercises[i].sets.length - 1
              //         ].targetRIR,
              //       newSet: true,
              //     };
              //     dispatch(addSet({ newSet, exerciseIndex: i }));
              //   }
              // }
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
