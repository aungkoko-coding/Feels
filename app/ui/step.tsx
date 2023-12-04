const Step = ({
  step,
  description,
}: {
  step: number;
  description: React.ReactNode;
}) => {
  return (
    <li className="relative px-5 py-7 bg-white shadow">
      <span className="absolute shadow-md left-5 top-0 -translate-y-1/2 bg-black text-white w-10 h-10 flex justify-center items-center rounded-full">
        {step}
      </span>
      <p className="orange_gradient text-lg sm:text-xl font-bold">
        {description}
      </p>
    </li>
  );
};

export default Step;
