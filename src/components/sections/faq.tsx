import styled from 'styled-components';
import Link from 'next/link';
import { WideRow } from '../layout';
import { mediaQueries } from '../../utils/theme';
import { blur } from '../mixins';
import { Card } from '../atoms/card';
import { SectionTitle } from '../atoms/text';
import { useSpring, animated } from "react-spring";
import { useState, useEffect } from 'react';
import { useMeasure, useToggle } from "react-use";


const Wrapper = styled.div`
    background: ${p => p.theme.colors.background};
    padding: 120px 0 40px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' inkscape:version='1.0 (6e3e5246a0, 2020-05-07)' sodipodi:docname='background 3.svg' id='svg62' version='1.1' fill='none' viewBox='0 0 1445.3887 759.87695' height='759.87695' width='1445.3887'%3E%3Cg transform='translate(0.13085938,3.046875)' inkscape:label='bottom' id='layer2' inkscape:groupmode='layer'%3E%3Cpath sodipodi:nodetypes='ccccscccc' d='M -0.13085938,-3.046875 V 756.83008 L 50.810547,720.24414 C 109.5338,678.06858 226.97977,593.71424 338.94922,478.11328 450.91867,362.51137 557.41083,215.66183 682.16016,172.97461 806.9095,130.2874 949.91499,191.7645 1080.1367,180.32617 1210.3623,168.88784 1327.8142,84.535506 1386.5312,42.359375 l 58.7266,-45.3391022 z' style='fill:%23ffffff;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' id='path91'/%3E%3C/g%3E%3C/svg%3E");    background-size: 100%;
    background-repeat: no-repeat;
    background-position: top;
`;

const FaqItemCard = styled(Card)`
    position: relative;
    margin: 20px auto;
    max-width: 40%;
`;

const FaqButton = animated(styled.button`
    border: solid 1px ${p => p.theme.colors.action};
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: -16px;
    margin-right: 8px;
    border-radius: 100%;
    height: 32px;
    width: 32px;
    background-color: ${p => p.theme.colors.white};
    background-image: url("data:image/svg+xml,%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='13.101609' height='14.131607' viewBox='0 0 13.101609 14.131607' fill='none' version='1.1' id='svg58' sodipodi:docname='expand-arrow.svg' inkscape:version='1.0 (6e3e5246a0, 2020-05-07)'%3E%3Cpath style='stroke-width:1.11601' d='M 13.101609,14.131607 H 0 L 6.5508092,0 Z' fill='%23e94a47' id='path56'/%3E%3C/svg%3E");    background-repeat: no-repeat;
    background-position: 50% 9px;
    background-size: 30%;
    font-size: 0;
    outline: 0;
    cursor: pointer;
`);

const ExpandingArea = animated(styled.div`
    overflow: hidden;
`);

const ItemTitle = styled.span`
    color: ${p => p.theme.colors.accent};
    font-weight: 600;
`;

const FaqItem: React.FC<{question?: string}> = ({question, children}) => {
    const defaultHeight = "0px";

    // Manages the open or cloased state of the accordion
    const [open, toggle] = useToggle(false)

    // The height of the content inside of the accordion
    const [contentHeight, setContentHeight] = useState(defaultHeight);

    // Gets the height of the element (ref)
    const [ref, { height }] = useMeasure();

    useEffect(() => {
        //Sets initial height
        // @ts-ignore
        setContentHeight(height);
    
        //Adds resize event listener
        // window.addEventListener("resize", setContentHeight(height));
    
        // Clean-up
        // return window.removeEventListener("resize", setContentHeight(height));
      }, [height]);

      // Animations
    const expand = useSpring({
        config: { friction: 25 },
        height: open ? `${contentHeight+20}px` : defaultHeight
    });
    console.log(expand)
    const spin = useSpring({
        config: { friction: 10 },
        transform: open ? "rotate(0deg)" : "rotate(180deg)"
    });
    
    return (<FaqItemCard>
        <ItemTitle>{question}</ItemTitle>
        <ExpandingArea style={expand}>
            <div ref={ref}>
                <p>
                    {children}
                </p>
            </div>
        </ExpandingArea>
        <FaqButton style={spin} onClick={toggle}>
            Open
        </FaqButton>
    </FaqItemCard>)
}

const text = `
We believe that people looking for a job shouldn’t have to pay a penny 
to create a good CV. Sed sed erat quis mauris ornare hendrerit.
We believe that people looking for a job shouldn’t have to pay a penny to create a good CV.
`;

const faqItems = [
    {question: "Do you track users?", answer: text},
    {question: "Can I download my resume to Word or PDF?", answer: text},
    {question: "How can I use it for free?", answer: text},
];


export const FAQ = () => {
    return <Wrapper>
        <SectionTitle>FAQ</SectionTitle>
        {faqItems.map(
            ({question, answer}, i) => <FaqItem key={i} question={question}>{answer}</FaqItem>
        )}
    </Wrapper>;
}