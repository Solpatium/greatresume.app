import styled from 'styled-components';
import Link from 'next/link';
import { WideRow } from '../layout';
import { mediaQueries } from '../../utils/theme';
import { blur } from '../mixins';

const Wrapper = styled.div`
    min-height: 60vh;
    margin-bottom: -1px;
    display: flex;
    align-items: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1438' height='420' viewBox='0 0 1438 420' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M-2 420L58 385C118 350 238 280 358 273C478 266 598 322 718 301C838 280 958 182 1078 119C1198 56 1318 28 1378 14L1438 0V420H1378C1318 420 1198 420 1078 420C958 420 838 420 718 420C598 420 478 420 358 420C238 420 118 420 58 420H-2Z' fill='%23F4F6FF'/%3E%3C/svg%3E");
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: 100%;
`;

const BigTitle = styled.h1`
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 64px;
    color: ${props => props.theme.colors.dark};
`;

const Row = styled(WideRow)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TitleWrapper = styled.div`
    max-width: 60%;

    ${mediaQueries.laptop} {
        max-width: 100%;
    }
`;

const P = styled.p`
    font-size: 24px;
    margin-top: 26px;
    margin-bottom: 46px;
`;

const Button = styled.a`
    box-shadow: ${blur("rgba(233, 74, 71, 0.11)")}
    display: inline-block;
    font-size: 24px;
    font-weight: 600;
    color: ${p => p.theme.colors.white};
    background: ${p => p.theme.colors.action};
    border-radius: 10px;
    padding: 25px 70px;
    cursor: pointer;
    && {
        text-decoration: none;
    }

    &:hover {
        background: ${p => p.theme.colors.actionHover};
    }
`;


export const Hero = () => {
    return <Wrapper>
        <Row>
            <TitleWrapper>
                <BigTitle>Create Resume</BigTitle>
                <P>
                We believe that people looking for a job shouldn’t have to pay a penny to create a good CV. Sed sed erat quis mauris ornare hendrerit. Quisque 
                </P>
                <Button href="/creator">Creator</Button>
            </TitleWrapper>
            <img src="/images/hero-image.png" />
        </Row>
    </Wrapper>;
}