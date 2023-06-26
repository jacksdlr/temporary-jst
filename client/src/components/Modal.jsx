const Modal = ({ musclesTrained }) => {
  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4 className='border-bottom'>
          How well did each muscle group recover from this workout last time
          before being trained again?
        </h4>
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
        <div className='btn-container'>
          <button className='btn exit-btn'>Close</button>
          <button className='btn confirm-btn'>Confirm</button>
        </div>
      </div>
    </aside>
  );
};
export default Modal;
