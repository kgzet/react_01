import React from "react";

type Props = {
  title: string;
  subtitle: string;
  buttonAdd: React.ReactNode;
  emeraldBalance: number;
  children?: React.ReactNode | React.ReactNode[];
};

const MainContainer: React.FC<Props> = (props) => {
  const { title, subtitle, emeraldBalance } = props;

  return (
    <>
      <div className="bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-lg font-semibold">
            {subtitle}
            <span className="text-green-700">{emeraldBalance}</span>
          </div>
          {props.buttonAdd}
        </div>
        {props.children}
      </div>
    </>
  );
};

export default MainContainer;
