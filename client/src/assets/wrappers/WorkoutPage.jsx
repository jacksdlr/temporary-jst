import styled from 'styled-components';

const Wrapper = styled.section`
  .container {
    border-radius: var(--borderRadius);
    width: 100%;
    background: var(--white);
    padding: 1rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-2);
    display: flex;
    flex-direction: column;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
  .options {
    color: var(--textColor);
  }
  .options:hover {
    cursor: pointer;
    color: var(--primary-500);
  }
  h4 {
    margin: 0;
    font-size: 1.3rem;
    text-transform: none;
  }
  .warning-container {
    display: flex;
    flex-direction: column;
    background: var(--primary-500);
    color: white;
    padding: 1rem;
    margin-bottom: 2rem;
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    text-align: center;
    justify-content: center;
    cursor: pointer;
  }
  .workout-warning {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .warning-info {
    align-self: center;
    padding-top: 0.5rem;
    margin-top: 0.5rem;
    border-top: 2px solid white;
    max-width: 80%;
  }
  .number {
    font-size: 1.5rem;
  }
  p {
    margin: 0;
  }
  .muscles {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    row-gap: 0.5rem;
    padding-top: 1rem;
    margin-top: 0.5rem;
    border-top: 1px solid var(--grey-100);
  }
  .border-bottom {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--grey-100);
  }
  .muscle {
    padding: 0.2rem 0.6rem;
    margin: 0;
    margin-right: 1rem;
    border-radius: var(--borderRadius);
  }
  .notes {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    row-gap: 0.5rem;
  }
  .note {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.25rem;
    padding: 0.5rem;
    background: #fcfbc7;
  }
  .note p {
    flex: 1 0 20%;
    margin: 0;
    line-height: 1rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    padding-bottom: 1rem;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .submit-btn {
    margin: 0 auto;
    width: 100%;
    max-width: var(--max-width);
    height: 3rem;
    font-size: 1.25rem;
    font-weight: bold;
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // Modal stuff
  .recovery-modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .recovery-modal {
    display: flex;
    flex-direction: column;
    background: var(--white);
    width: 80vw;
    max-width: 800px;
    border-radius: var(--borderRadius);
    padding: 1rem;
    text-align: left;
    justify-content: center;
    text-transform: none;
    overflow: auto;
  }
  h3 {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  h5 {
    text-transform: none;
  }
  .muscle-container {
    margin-bottom: 1rem;
  }
  .muscle-container .muscle {
    width: 100%;
    /* margin: 0 auto; */
    /* margin-bottom: 1rem; */
    text-align: left;
    font-size: 1.5rem;
    border-radius: var(--borderRadius) var(--borderRadius) 0 0;
    border: 1px solid var(--grey-100);
    border-bottom: 0;
  }
  .btn-container {
    display: flex;
    box-shadow: var(--shadow-2);
    border: 1px solid var(--primary-400);
    gap: 1px;
    height: 5rem;
    overflow: hidden;
    width: 100%;
    border-radius: 0 0 var(--borderRadius) var(--borderRadius);
  }
  .answer-btn {
    background: var(--primary-400);
    color: var(--white);
    border-radius: 0;
    box-shadow: none;
    margin: 0 auto;
    flex: 1;
    width: 100%;
    text-transform: none;
    padding: 1rem;
  }
  /* .answer-btn:nth-of-type(1) {
    border-radius: var(--borderRadius) 0 0 var(--borderRadius);
  }
  .answer-btn:nth-of-type(4) {
    border-radius: 0 var(--borderRadius) var(--borderRadius) 0;
  } */
  .answer-btn:hover,
  .selected-btn {
    background: var(--white);
    color: var(--primary-400);
    /* box-shadow: var(--shadow-3); */
  }
  .close-buttons {
    display: flex;
    width: 100%;
    height: 3rem;
    gap: 1rem;
    justify-content: space-between;
  }
  .confirm-btn,
  .exit-btn {
    height: 100%;
    width: 50%;
    flex: 1;
  }
  .confirm-btn {
    background: var(--white);
    color: var(--green-dark);
    border: 1px solid var(--green-dark);
  }
  .confirm-btn:hover {
    background: var(--green-light);
  }
  .exit-btn {
    background: var(--white);
    color: var(--red-dark);
    border: 1px solid var(--red-dark);
  }
  .exit-btn:hover {
    background: var(--red-light);
  }
  /*   .info {
    max-height: 0;
    overflow: hidden;
    max-width: 100%;
    padding: 0;
    border-radius: var(--borderRadius);
    background-color: var(--primary-100);
    transition: var(--slow-transition);
  }
  .show-calories {
    max-height: 500px;
  } */
  @media (max-width: 992px) {
    .recovery-modal {
      justify-content: flex-start;
      width: 90vw;
      max-height: 80vh;
      border-top: 10px solid white;
      border-bottom: 10px solid white;
    }
    .muscle {
      font-size: 1rem;
    }
    .muscle-container .muscle {
      font-size: 1.2rem;
    }
    /* .border-bottom {
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
    } */
    .btn-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      font-size: 0.8rem;
      height: auto;
    }
    /* .answer-btn:nth-of-type(1) {
      border-radius: var(--borderRadius) 0 0 0;
    }
    .answer-btn:nth-of-type(2) {
      border-radius: 0 var(--borderRadius) 0 0;
    }
    .answer-btn:nth-of-type(3) {
      border-radius: 0 0 0 var(--borderRadius);
    }
    .answer-btn:nth-of-type(4) {
      border-radius: 0 0 var(--borderRadius) 0;
    } */
    h5 {
      font-size: 1rem;
    }
  }
  @media (min-width: 992px) {
    h4 {
      font-size: 1.563rem;
    }
    .number {
      font-size: 1.953rem;
    }
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
    .recovery-modal {
      padding: 2rem;
    }
    .confirm-btn,
    .exit-btn {
      width: 25%;
    }
    .answer-btn:hover,
    .selected-btn {
      flex: 1.1;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
