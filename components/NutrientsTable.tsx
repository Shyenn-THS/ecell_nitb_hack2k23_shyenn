import React from 'react';

type Props = {
  data: any;
};
type RowProps = {
  name: string;
  rq: number;
  iq: number;
  health: string;
};

const NutrientsTable = (props: Props) => {
  const { data } = props;

  const TableRow = (rowProps: RowProps) => {
    const { health, iq, name, rq } = rowProps;
    return (
      <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
        <td className="p-3">
          <p>{name}</p>
        </td>
        <td className="p-3">
          <p>{rq}</p>
        </td>
        <td className="p-3">
          <p>{iq}</p>
        </td>
        <td className="p-3">
          <p>{health}</p>
        </td>
      </tr>
    );
  };

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="dark:bg-gray-700">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Required Quantity</th>
              <th className="p-3">Intake Quantity</th>
              <th className="p-3">Health</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map(function (key, index) {
              return (
                <TableRow
                  health="Good"
                  iq={data[key]}
                  name={key}
                  key={index}
                  rq={400}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutrientsTable;
