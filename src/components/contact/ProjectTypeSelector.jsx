import { useState } from "react";

export const ProjectTypeSelector = ({ onTypeChange }) => {
  const projectTypes = [
    {
      id: "new-project",
      title: "Project",
    },
    {
      id: "collab",
      title: "Collab",
    },
  ];
  const [selected, setSelected] = useState("new-project");
  return (
    <div className="flex justify-start items-center gap-4 py-10">
      {projectTypes.map((type) => (
        <div
          key={type.id}
          onClick={() => {
            onTypeChange(type.id);
            setSelected(type.id);
          }}
          className={`cursor-pointer transition-all group `}
        >
          <h4
            className={`font-mainHead ${selected === type.id ? "text-main" : "text-primary-900"}`}
          >
            [ {type.title} ]
          </h4>
        </div>
      ))}
    </div>
  );
};
