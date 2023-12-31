import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  '100': [
    {
      type: 'autogenerated',
      dirName: '100.软件工程'
    }
  ],
  '200': [
    {
      type: 'autogenerated',
      dirName: '200.视觉设计'
    }
  ],
  '300': [
    {
      type: 'autogenerated',
      dirName: '300.系列笔记'
    }
  ]
  // '300': [
  //   {
  //     type: 'category',
  //     label: '系列笔记',
  //     link: {
  //       type: 'generated-index'
  //     },
  //     items: [
  //       {
  //         type: 'autogenerated',
  //         dirName: '300.系列笔记'
  //       }
  //     ]
  //   }
  // ]

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
}

export default sidebars
