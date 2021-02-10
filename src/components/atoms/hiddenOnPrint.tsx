import styled, { css } from "styled-components"

export const hiddenOnPrint = css`
    @media print { 
        display: none;
    }
`;

export const HiddenOnPrint = styled.div`${hiddenOnPrint}`;