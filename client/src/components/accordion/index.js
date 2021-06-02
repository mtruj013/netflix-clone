import React, { createContext, useContext, useState } from 'react';
import { Container, Frame, Title, Item, Inner, Header, Body } from './styles/accordion'


const ToggleContext = createContext();

function Accordion({ children, ...restProps }) {
    return (
        <Container {...restProps}>
            <Inner>{children}</Inner>
        </Container>
    )
}

export default Accordion;

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>
}

Accordion.Frame = function AccordionFrame({ children, ...restProps }) {
    return <Frame {...restProps}>{children}</Frame>
}

//primary container b/c state will be passed giving toggle ability
Accordion.Item = function AccordionItem({ children, ...restProps }) {
    const [toggle, setToggle] = useState(false);

    return <ToggleContext.Provider value={{ toggle, setToggle }}>
        <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
}

// when you click header, icon switch
Accordion.Header = function AccordionHeader({ children, ...restProps }) {

    const { toggle, setToggle } = useContext(ToggleContext);

    return <Header onClick={() => setToggle((toggle) => !toggle)} {...restProps}>
        {children} {toggle ? (<img src="/images/icons/close-slim.png" alt="Close" />) : (<img src="/images/icons/add.png" alt="Open"/>)}
    </Header> //to get set toggle from item, context api
}

Accordion.Body = function AccordionBody({ children, ...restProps }) {

    const { toggle } = useContext(ToggleContext);

    return toggle ? <Body {...restProps}>{children}</Body> : null;
}