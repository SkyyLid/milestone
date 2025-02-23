import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: FC<React.SVGProps<SVGSVGElement>>; 
}

const Input: FC<InputProps> = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Icon className="size-6 text-green-500" />
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-3 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200 text-lg" 
        
      />
    </div>
  );
};

export default Input;
