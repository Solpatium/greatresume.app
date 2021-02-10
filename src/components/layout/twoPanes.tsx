import styled from "styled-components";

export const TwoPanes = styled.div`
  display: flex;
  & > * {
    flex: 1;
    width: 50%;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    & > * {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
    }
  }
`;
