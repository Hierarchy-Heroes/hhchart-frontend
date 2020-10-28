import * as React from 'react';

import OrgChart from './Chart';

export default {
  title: "OrgChart",
  component: OrgChart,
};

const ds = {
  id: "n1",
  firstName: "Jamiya Alvarez",
  positionTitle: "Chief Executive Officer",
  children: [
    { id: "n2", firstName: "Lewis Watts", positionTitle: "Chief Operations Officer" },
    {
      id: "n3",
      firstName: "Bridget Fyre",
      positionTitle: "Chief Technology Officer",
      children: [
        { id: "n4", firstName: "Tie Hua", positionTitle: "Senior Hardware Engineer" },
        {
          id: "n5",
          firstName: "Kaeden Cameron",
          positionTitle: "Senior Software Engineer",
          children: [
            { id: "n6", firstName: "Anabella Robbins", positionTitle: "Software Engineer I" },
            { id: "n7", firstName: "Xiang Xiang", positionTitle: "Software Engineer I" }
          ]
        },
        { id: "n8", firstName: "Dereon Patel", positionTitle: "Software Engineer II" }
      ]
    },
    { id: "n9", firstName: "Shirley Knight", positionTitle: "Head Council" },
    {
      id: "n10",
      firstName: "Carissa Rhodes",
      positionTitle: "Chief Marketing Officer",
      children: [{ id: "n11", firstName: "Raiden Mueller", positionTitle: "Marketing Director" }]
    }
  ]
};

const ChartStoryTemplate = (args) => (
  <OrgChart {...args} />
);

export const ChartStory = ChartStoryTemplate.bind({});
ChartStory.args = {
  datasource: ds,
  onClickNode: data => alert(JSON.stringify(data)),
  centerOnClick: false
};


