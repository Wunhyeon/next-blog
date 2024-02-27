import React from "react";

const loading = () => {
  return (
    <div className="animate-pulse space-y-5">
      <h1 className="text-5xl">Loading</h1>
      <div className="flex items-center justify-between">
        <div className="h-10 w-56 bg-graident-dark rounded-md"></div>
        <div className="h-10 w-48 bg-graident-dark rounded-md"></div>
      </div>

      <div className="border h-96 rounded-md bg-gradient-dark"></div>
    </div>
  );
};

export default loading;
