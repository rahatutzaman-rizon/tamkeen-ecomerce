import React from "react";

const PricingTable: React.FC<{ levelColor: string }> = ({ levelColor }) => {

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-collapse border border-gray-300">
        <thead>
          <tr className={`hover border-b border-gray-300 ${levelColor}`}>
            <th className="text-start p-2 border-r border-gray-300" colSpan={27}>
              Bronze
            </th>
            <th className="p-2 border-r border-gray-300">&nbsp;</th>
            <th className="text-start p-2">$100</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`hover border-b border-gray-300`}>
            <td colSpan={27} className="p-2 border-r border-gray-300"></td>
            <td className="text-start p-2 border-r border-gray-300">%</td>
            <td className="text-start p-2">$</td>
          </tr>
          <tr className={`hover border-b border-gray-300 ${levelColor}`}>
            <td colSpan={9} className="p-2 border-r border-gray-300">1</td>
            <td colSpan={9} className="p-2 border-r border-gray-300">2</td>
            <td colSpan={9} className="p-2 border-r border-gray-300">3</td>
            <td className="text-start p-2 border-r border-gray-300">1.00%</td>
            <td className="text-start p-2">3</td>
          </tr>
          <tr className={`hover border-b border-gray-300`}>
            <td colSpan={3} className="p-2 border-r border-gray-300">1</td>
            <td colSpan={3} className="p-2 border-r border-gray-300">2</td>
            <td colSpan={3} className="p-2 border-r border-gray-300">3</td>
            <td colSpan={3} className="p-2 border-r border-gray-300">1</td>
            <td colSpan={3} className="p-2 border-r border-gray-300">2</td>
            <td colSpan={3} className="p-2 border-r border-gray-300">3</td>
            <td colSpan={3} className="p-2 border-r border-gray-300">1</td>
            <td colSpan={3} className="p-2 border-r border-gray-300">2</td>
            <td colSpan={3} className="p-2 border-r border-gray-300">3</td>
            <td className="text-start p-2 border-r border-gray-300">1.50%</td>
            <td className="text-start p-2">13</td>
          </tr>
          <tr className={`hover border-b border-gray-300 ${levelColor}`}>
            {Array.from({ length: 27 }, (_, i) => (
              <td key={i} className="text-start p-2 border-r border-gray-300">
                {(i % 3) + 1}
              </td>
            ))}
            <td className="text-start p-2 border-r border-gray-300">2.00%</td>
            <td className="text-start p-2">54</td>
          </tr>
          <tr className={`hover border-b border-gray-300 `}>
            <td colSpan={27} className="p-2 border-r border-gray-300">
              &nbsp;
            </td>
            <td className="text-start p-2">211.5$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;
