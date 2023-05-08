import styled from 'styled-components';

const Wrapper = styled.section`
  /* .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  } */ /* remove this */
  .dashboard-page {
    display: flex;
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  .main-container {
    display: flex;
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
  }
`;
export default Wrapper;
