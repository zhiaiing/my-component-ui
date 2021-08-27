import React, { FC } from 'react';
import Button from "../../../src/button/src/button";
import IButton from "../../../src/button/src/module";
import { ArgsTable } from '@storybook/addon-docs'
import { Story } from '@storybook/react';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
// import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';

export default {
    title: 'Button',
    component: Button,
    parameters: {
        props: {
            propTablesExclude: [
                // Other // the actual component
            ]
        }
    }
    // parameters: {
    //     controls: {
    //         presetColors: [
    //             { color: '#ff4785', title: 'Coral' },
    //             'rgba(0, 159, 183, 1)',
    //             '#fe4a49',
    //         ]
    //     },
    // },
    // argTypes: {
    //     className: {
    //         control: 'text',
    //         defaultValue: "",
    //         description: "className"
    //     },
    //     // aaa: {
    //     //     control: 'string',
    //     //     // description: "111",
    //     //     default: '111'
    //     // }
    // },
};



const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            maxWidth: 600,
            padding: 10,
            margin: '0 auto',
            marginTop: '10%',
        }}
    >
        {children}
    </div>
);

export const BasicSetup = () => (

    <Button> 1</Button>
);

{/* <ArgsTable of={Button} /> */ }

// const templateForComponent = <P,>(Component: (props: P) => StoryFnReactReturnType) => (
//     props: P
// ): Story<P> => {
//     const template: Story<P> = (args) => {
//         return <Button {...args} />;
//     };
//     const story = template.bind({});
//     story.args = props;
//     return story;
// };


// const First1 = templateForComponent(Button);


// export const First11 = First1({
//     className: "1",
//     children: '123'
// })



export const AllFeatures = () => (
    <Wrapper>
        <Button>2</Button>
    </Wrapper>
);

export const DropIndicator = () => (
    <Wrapper>
        <Button>3</Button>
    </Wrapper>
);

export const Collapsible = () => (
    <Wrapper>
        <Button>4</Button>
    </Wrapper>
);

export const RemovableItems = () => (
    <Wrapper>
        <Button>5</Button>
    </Wrapper>
);
