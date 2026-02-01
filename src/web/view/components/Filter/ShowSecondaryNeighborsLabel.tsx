import { Stack, Tooltip } from "@mui/material";
import { InfoCategory } from "@/common/infoCategory";

interface Props {
  secondaryInfoCategory: InfoCategory;
}

export const ShowSecondaryNeighborsLabel = ({ secondaryInfoCategory }: Props) => {
  const categoryLabel: Record<InfoCategory, string> = {
    breakdown: "декомпозиции",
    research: "исследования",
    justification: "обоснования",
  };

  return (
    <Stack direction="row" alignItems="center">
      Показывать
      <Tooltip
        title={
          <span>
            Вторичные узлы относятся к категории информации, которая сейчас не отображается, но они
            соседствуют с узлами отображаемой категории.
            <br />
            <br />
            Например, вопросы и факты являются вторичными, если узлы "Исследования" не показаны, но
            они связаны с узлом проблемы (и при этом отображается "Декомпозиция").
          </span>
        }
        enterTouchDelay={0} // allow touch to immediately trigger
        leaveTouchDelay={Infinity} // touch-away to close on mobile, since message is long
      >
        <span style={{ textDecoration: "underline", marginLeft: "4px", marginRight: "4px" }}>
          вторичные
        </span>
      </Tooltip>
      {categoryLabel[secondaryInfoCategory]}
    </Stack>
  );
};
