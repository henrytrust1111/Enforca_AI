import React from "react";

interface CustomInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  className?: string;
  classNameLabel?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  className = "",
  classNameLabel = "",
}) => {
  return (
    <div className="relative w-full">
     {value && (
        <label className={`absolute block text-gray-700 font-medium text-xs -top-2 left-2 bg-white px-1 ${classNameLabel}`}>
          {placeholder}
        </label>
      )}
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        className={`w-full p-3 border border-gray-300 focus:outline-blue-500 rounded-[8px] ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;

















// import React from "react";
// import { BiEnvelope } from "react-icons/bi";

// interface CustomInputProps {
//   type: string;
//   placeholder: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const CustomInput: React.FC<CustomInputProps> = ({
//   type,
//   placeholder,
//   value,
//   onChange,
// }) => {
//   return (
//     <div className="relative w-full">
//       <label className="absolute block text-gray-700 font-medium text-xs -top-2 left-2 bg-white px-1">
//         Email Address
//       </label>
//       <BiEnvelope
//         className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//         size={20}
//       />
//       <input
//         type={type}
//         className="w-full pl-10 p-3 border border-gray-300 focus:outline-blue-500 rounded-[8px]"
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//       />
//     </div>
//   );
// };

// export default CustomInput;