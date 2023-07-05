import styled from 'styled-components';

const Wrapper = styled.section`
  .modal-container {
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
  .modal {
    display: flex;
    flex-direction: column;
    background: var(--white);
    width: 80vw;
    max-width: 800px;
    border-radius: var(--borderRadius);
    padding: 1rem;
    text-align: center;
    justify-content: center;
    text-transform: none;
    overflow: auto;
  }
  h3 {
    text-transform: none;
  }
  p {
    margin-top: 0;
    max-width: 100%;
  }
  .btn-container {
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
`;

export default Wrapper;
