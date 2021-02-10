import React from 'react';
import styles from './home.module.scss'
import { Hero } from './sections/hero';
import { Benefits } from './sections/benefits';
import { Templates } from './sections/templates';
import { FAQ } from './sections/faq';

export default () => {
    return <>
        <Hero></Hero>
        <Benefits />
        <Templates />
        <FAQ />
    </>
}