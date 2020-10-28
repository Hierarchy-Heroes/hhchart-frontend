import * as React from 'react';

import OrgChart from './Chart';

export default {
  title: "OrgChart",
  component: OrgChart,
};

const ds = {
  employeeId: "n1",
  firstName: "Jamiya Alvarez",
  positionTitle: "Chief Executive Officer",
  children: [
    { employeeId: "n2", firstName: "Lewis Watts", positionTitle: "Chief Operations Officer" },
    {
      employeeId: "n3",
      firstName: "Bridget Fyre",
      positionTitle: "Chief Technology Officer",
      children: [
        { employeeId: "n4", firstName: "Tie Hua", positionTitle: "Senior Hardware Engineer" },
        {
          employeeId: "n5",
          firstName: "Kaeden Cameron",
          positionTitle: "Senior Software Engineer",
          children: [
            { employeeId: "n6", firstName: "Anabella Robbins", positionTitle: "Software Engineer I" },
            { employeeId: "n7", firstName: "Xiang Xiang", positionTitle: "Software Engineer I" }
          ]
        },
        { employeeId: "n8", firstName: "Dereon Patel", positionTitle: "Software Engineer II" }
      ]
    },
    { employeeId: "n9", firstName: "Shirley Knight", positionTitle: "Head Council" },
    {
      employeeId: "n10",
      firstName: "Carissa Rhodes",
      positionTitle: "Chief Marketing Officer",
      children: [{ employeeId: "n11", firstName: "Raiden Mueller", positionTitle: "Marketing Director" }]
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


