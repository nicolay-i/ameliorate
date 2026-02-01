import { Button } from "@mui/material";
import { StepType } from "@reactour/tour";

import { Link } from "@/web/common/components/Link";
import { discordInvite } from "@/web/common/urls";
import { StepContent } from "@/web/tutorial/StepContent";
import { startTutorial } from "@/web/tutorial/tutorial";
import { Track } from "@/web/tutorial/tutorialUtils";

export const welcomeSteps = (track: Track): StepType[] => {
  return [
    {
      selector: 'button[title="Помощь"] > svg',
      content: (
        <StepContent
          stepTitle="Добро пожаловать в Ameliorate 🔥"
          text={
            <>
              Если не уверены, как что-то сделать, нажмите на этот знак вопроса.
              <br />
              <br />
              Здесь можно запускать обучение и отслеживать прогресс, а также есть ссылки на
              документацию и примеры.
              <br />
              <br />
              Также можно попросить помощи в{" "}
              <Link href={discordInvite} target="_blank">
                Discord-сервере
              </Link>
              .
            </>
          }
          actionSlot={
            track === "builders" ? (
              <Button
                variant="contained"
                onClick={() => startTutorial("diagramBasics", "builders")}
              >
                Начать: Основы диаграмм
              </Button>
            ) : track === "diagramViewers" ? (
              <Button
                variant="contained"
                onClick={() => startTutorial("readingADiagram", "diagramViewers")}
              >
                Начать: Чтение диаграмм
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => startTutorial("evaluatingTradeoffs", "tableViewers")}
              >
                Начать: Оценка компромиссов
              </Button>
            )
          }
          heightClass="" // override default to let height be based on content size here - we don't care about matching height of other steps because this tutorial only has one step
        />
      ),
      styles: {
        maskWrapper: (props) => ({ ...props, display: "unset" }), // show the mask to spotlight the help button
      },
    },
  ];
};
