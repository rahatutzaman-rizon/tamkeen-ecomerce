import { useState } from 'react';
import { FaCheck } from "react-icons/fa";
import PricingTable from './PricingTable';

interface Props {
  id: number;
  level_name: string;
  monthly_fee: number;
  description: string;
  condition_1: null;
  condition_2: null;
  icon: null;
  users_count: number;
  active?: boolean;
}

const levelColors: Record<string, { border: string; text: string; button: string }> = {
  bronze: { border: "border-[#CA9666]", text: "text-[#CA9666]", button: "bg-[#CA9666] hover:bg-[#b5712e] text-white" },
  silver: { border: "border-[#A3A3A3]", text: "text-[#A3A3A3]", button: "bg-[#A3A3A3] hover:bg-[#a8a8a8] text-white" },
  gold: { border: "border-[#FDC936]", text: "text-[#FDC936]", button: "bg-[#FDC936] hover:bg-[#e6c200] text-black" },
  platinum: { border: "border-[#434343]", text: "text-[#434343]", button: "bg-[#434343] hover:bg-[#636363] text-white" },
  diamond: { border: "border-primary", text: "text-primary", button: "btn btn-primary text-white" },
};

const PricingCard = ({
  level_name,
  monthly_fee,
  description,
}: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  
  const levelClass = levelColors[level_name.toLowerCase()] || {
    border: "border-stroke",
    text: "text-primary",
    button: "btn-primary",
  };

  return (
    <>
      <div className="px-2 w-[300px]">
        <div className={`relative mb-10 overflow-hidden rounded-[10px] border-2 ${levelClass.border} bg-white px-8 py-10 shadow-pricing`}>
          <h2 className="mb-5 text-[42px] font-bold ">
            {monthly_fee}
            <span className="text-base font-medium text-body-color ">
              / month
            </span>
          </h2>
          <span className={`mb-3 block text-lg font-semibold ${levelClass.text}`}>
            {level_name}
          </span>
          
          <div className="divider" />
          <div className="flex items-start flex-row gap-2 my-10">
            <FaCheck size={20} color="#10B981" />
            <p className="text-base">{description}</p>
          </div>
          <button
            className={`w-full btn ${levelClass.button}`}
            onClick={() => setModalOpen(true)}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-[90%] sm:w-[90vw] max-w-lg sm:max-w-7xl p-6 rounded-lg shadow-lg relative">
            <h2 className={`text-2xl font-bold mb-4 ${levelClass.text}`}>
              {level_name} Subscription
            </h2>
            <PricingTable levelColor={levelClass.text} />

            <button
              className={`mt-4 w-full btn ${levelClass.button}`}
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PricingCard;
