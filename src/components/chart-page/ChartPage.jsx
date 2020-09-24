import React from 'react';
import OrgChart from './Chart';

const ds = {
  id: "n1",
  name: "Jamiya Alvarez",
  title: "Chief Executive Officer",
  children: [
    { id: "n2", name: "Lewis Watts", title: "Chief Operations Officer" },
    {
      id: "n3",
      name: "Bridget Fyre",
      title: "Chief Technology Officer",
      children: [
        { id: "n4", name: "Tie Hua", title: "Senior Hardware Engineer" },
        {
          id: "n5",
          name: "Kaeden Cameron",
          title: "Senior Software Engineer",
          children: [
            { id: "n6", name: "Anabella Robbins", title: "Software Engineer I" },
            { id: "n7", name: "Xiang Xiang", title: "Software Engineer I" }
          ]
        },
        { id: "n8", name: "Dereon Patel", title: "Software Engineer II" }
      ]
    },
    { id: "n9", name: "Shirley Knight", title: "Head Council" },
    {
      id: "n10",
      name: "Carissa Rhodes",
      title: "Chief Marketing Officer",
      children: [{ id: "n11", name: "Raiden Mueller", title: "Marketing Director" }]
    }
  ]
};

export const ChartPage = props => (
  <div>
    <OrgChart datasource={ds} />
  </div>
);
