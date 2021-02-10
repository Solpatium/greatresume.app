import styled from 'styled-components';
import Link from 'next/link';
import { WideRow } from '../layout';
import { mediaQueries } from '../../utils/theme';
import { blur } from '../mixins';
import { Card } from '../atoms/card';
import { SectionTitle } from '../atoms/text';

const Wrapper = styled.div`
    background: ${p => p.theme.colors.white};
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

const BenefitWrapper = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    margin: 0 50px 0;

    &:nth-child(2n+1) {
        flex-direction: row-reverse;
    }

    ${Card} {
        max-width: 45%;
        margin: 0 70px;
    }
`;

const TemplatesCollection = styled.div`
    margin-top: 80px;
    display: flex;    
    justify-content: space-between;
    flex-wrap: wrap;

    ${Card} {
        width: 22%;
        height: 380px;
        padding: 0;
        background: #FFF;
        margin-bottom: 50px;
    }
`;

export const Templates = () => {
    return <Wrapper>
        <WideRow>
            <SectionTitle>Choose from professional 40 templates</SectionTitle>
            <TemplatesCollection>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </TemplatesCollection>
        </WideRow>
    </Wrapper>;
}