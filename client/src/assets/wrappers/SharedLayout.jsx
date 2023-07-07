import styled from 'styled-components';

const Wrapper = styled.section`
  /* .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  } */ /* remove this */
  .dashboard-page {
    display: flex;
    flex-direction: column;
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
    align-self: start;
  }
  .main-container {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
      transition: var(--transition);
    }
    .open-sidebar {
      width: calc(90% - 250px);
    }
    .main-container {
      flex-direction: row;
    }
  }
`;
export default Wrapper;
