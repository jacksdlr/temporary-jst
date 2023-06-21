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
  .options:hover {
    cursor: pointer;
    color: var(--primary-500);
  }
  h4 {
    margin: 0;
    font-size: 1.3rem;
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
  .muscles p {
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
  .btn-container {
    display: grid;
    width: 100%;
  }
  .submit-btn {
    box-shadow: var(--shadow-2);
    margin: 0 auto;
    width: 100%;
    max-width: var(--max-width);
    height: 3rem;
    font-size: 1.25rem;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  .calories-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .calories-container svg:hover {
    color: var(--primary-500);
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
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
