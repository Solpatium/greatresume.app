import React from "react";
import { Skill } from "../../../models/v1";
import classes from "classnames";

const getSkillLevel = (level: Skill["level"]): number | string | undefined => {
  if (!level) {
    return undefined;
  }
  if (["1", "2", "3", "4", "5"].includes(level)) {
    return parseInt(level, 10);
  }
  return level;
};

export const SkillEntry: React.FC<{ data: Skill }> = ({ data }) => {
  const level = getSkillLevel(data.level);
  return (
    <li className={`skill level-${typeof level}`}>
      <div className="skill-name">{data.name}</div>
      {typeof level === "number" && (
        <div className={`skill-level level-${data.level}`}>
          {[...Array(5)].map((_v, i) => (
            <div key={i} className={classes("level-step", { filled: i < level })} />
          ))}
        </div>
      )}
      {typeof level === "string" && <div className="skill-level">{data.level}</div>}
    </li>
  );
};

export const SkillList: React.FC<{ data: Skill[] }> = ({ data }) => {
  return (
    <ul className="skills-list">
      {data.map((s, i) => (
        <SkillEntry key={i} data={s} />
      ))}
    </ul>
  );
};
