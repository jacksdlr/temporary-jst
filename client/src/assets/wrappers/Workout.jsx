import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-areas:
      'meso meso'
      'session date';
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  footer {
    border-top: 1px solid var(--grey-100);
    margin-top: auto;
  }
  .main-icon {
    // maybe make this random color
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 0.9rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    color: var(--white);
    grid-area: meso;
    margin-bottom: 0.5rem;
  }
  h5 {
    margin-bottom: 0.25rem;
  }
  .info {
    grid-area: session;
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .Planned {
    background: #fcefc7;
    color: #e9b949;
  }
  .Completed {
    background: #e0e8f9;
    color: #647acb;
  }
  .Incomplete {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .muscles {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    row-gap: 0.5rem;
    padding-bottom: 1rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid var(--grey-100);
  }
  .muscles p {
    padding: 0.2rem 0.6rem;
    margin: 0;
    margin-right: 1rem;
    border-radius: var(--borderRadius);
  }
  .exercises p {
    margin: 0;
  }
  .status {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    font-size: 1rem;
    text-align: center;
    width: auto;
    height: 30px;
    padding: 5px;
    padding-top: 7px;
    margin-top: 0.5rem;
    grid-area: date;
  }
  .icon {
    margin-top: 3px;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.5rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Wrapper;
