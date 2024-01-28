import { FinanceItem } from "./FinanceItem";
import React from 'react';

function FinanceList({ operations }) {
  let row = [];
  operations.map((item, index) => {
    row.push(<FinanceItem title={item.text} money={item.money} key={index} status={item.status} />);
  });

  return (
    <div>
      {row}
    </div>
  );
}

export default React.memo(FinanceList);