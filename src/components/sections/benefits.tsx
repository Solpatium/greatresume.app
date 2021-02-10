import styled from 'styled-components';
import Link from 'next/link';
import { WideRow } from '../layout';
import { mediaQueries } from '../../utils/theme';
import { blur } from '../mixins';
import { Card } from '../atoms/card';
import { SectionTitle } from '../atoms/text';

const Wrapper = styled.div`
    background: ${p => p.theme.colors.background};
    padding-top: 120px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1438' height='344' viewBox='0 0 1438 344' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M-2 0L58 16.381C118 32.7619 238 65.5238 358 122.857C478 180.19 598 262.095 718 262.095C838 262.095 958 180.19 1078 163.81C1198 147.429 1318 196.571 1378 221.143L1438 245.714V344H1378C1318 344 1198 344 1078 344C958 344 838 344 718 344C598 344 478 344 358 344C238 344 118 344 58 344H-2V0Z' fill='white'/%3E%3C/svg%3E");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;
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


const Benefit: React.FC<{imageSrc: string}> = ({imageSrc, children}) => (
    <BenefitWrapper>
        <img src={imageSrc} />
        <Card>{children}</Card>
    </BenefitWrapper>
)

const text = `
We believe that people looking for a job shouldn’t have to pay a penny 
to create a good CV. Sed sed erat quis mauris ornare hendrerit.
We believe that people looking for a job shouldn’t have to pay a penny to create a good CV.
`;


export const Benefits = () => {
    return <Wrapper>
        <WideRow>
            <SectionTitle>100% free, No Strings Attached</SectionTitle>
            <Benefit imageSrc="/images/meditation.png">
                {text}
            </Benefit>
            <Benefit imageSrc="/images/safety.png">
                {text}
            </Benefit>
        </WideRow>
    </Wrapper>;
}