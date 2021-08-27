import React from 'react';
import { ColumnLayout } from "../../../src/columnLayout/index";
import IColumnLayoutProps from "../../../src/columnLayout/modules";
import { ArgsTable } from '@storybook/addon-docs'
// import { Story, Meta } from '@storybook/react';

import { Story, Meta } from '@storybook/react/types-6-0';
// import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
// import { Meta } from '@storybook/react';
// import { textChangeRangeIsUnchanged } from 'typescript';
// import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';
// import { useArgTypes } from '@storybook/api';

// // inside your panel
// const { argTypes } = useArgTypes();

// Object.keys(ColumnLayout).forEach((item) => {
//     console.log("item  ", item, ColumnLayout[item]);
// })


export default {
    title: 'ColumnLayout',
    component: ColumnLayout,
    // args: {

    // }
    // parameters: {
    //     props: {
    //         propTablesExclude: [
    //             // Other // the actual component
    //         ]
    //     }
    // }
    // argTypes: {
    //     className: {
    //         control: 'text',
    //         defaultValue: "",
    //         description: "className"
    //     },
    // },
} as Meta;

const Template: Story<IColumnLayoutProps> = (args) => <ColumnLayout {...args} />;

export const ColumnLayoutDemo = Template.bind({});
ColumnLayoutDemo.args = {
    animation: true,
    leftChildren: "left",
    rightChildren: "right",
};


export const ColumnLayoutDemo1 = () => {
    const [leftConfig,] = React.useState({});
    const [rightConfig,] = React.useState({});
    return (
        <ColumnLayout
            animation={true}
            leftConfig={leftConfig}
            rightConfig={rightConfig}
            leftChildren="left"
            rightChildren="right"
        />
    )
}

// ColumnLayoutDemo.args = {

// };

{/* <ArgsTable of={ColumnLayout} /> */ }
