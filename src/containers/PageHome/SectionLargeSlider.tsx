import CardLarge2 from "components/CardLarge2/CardLarge2";
import { FC, useState } from "react";

export interface SectionLargeSliderProps {
  className?: string;
  projects?: Array<any>;
}

const SectionLargeSlider: FC<SectionLargeSliderProps> = ({
  className = "",
  projects = null,
}) => {
  const [indexActive, setIndexActive] = useState(0);
  const projectLength = projects?.length ? projects?.length : 0;
  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= projectLength - 1) {
        return 0;
      }
      return state + 1;
    });
  };
  // console.log(indexActive);
  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return projectLength - 1;
      }
      return state - 1;
    });
  };

  return (
    <div className={`nc-SectionLargeSlider relative ${className}`}>


      {projects?.map((project, index) =>
        indexActive === index ? (
          <CardLarge2
            key={index}
            projectLength={projectLength}
            onClickNext={handleClickNext}
            onClickPrev={handleClickPrev}
            project={project}
          />
        ) : null
      )}
    </div>

  );
};

export default SectionLargeSlider;
