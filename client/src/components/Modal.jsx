import { AiOutlineQuestionCircle } from 'react-icons/ai';

const Modal = ({ musclesTrained }) => {
  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h3>Soreness Feedback</h3>
        <h5 className='border-bottom'>
          Before being trained again, how well did each muscle group recover
          from this workout last time?{' '}
          <AiOutlineQuestionCircle
          /* onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)} */
          />
        </h5>
        {musclesTrained.map((muscle) => (
          <div className='muscle-container border-bottom'>
            <h5 className={`muscle ${muscle}`}>{muscle}</h5>
            <div className='btn-container'>
              <button className='btn answer-btn'>Did not get sore</button>
              <button className='btn answer-btn'>
                Sore only for a few hours/next day
              </button>
              <button className='btn answer-btn'>
                Healed completely just on time
              </button>
              <button className='btn answer-btn'>
                Still sore when next training the muscle
              </button>
            </div>
          </div>
        ))}
        <div className='close-buttons'>
          <button className='btn exit-btn'>Close</button>
          <button className='btn confirm-btn'>Confirm</button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
