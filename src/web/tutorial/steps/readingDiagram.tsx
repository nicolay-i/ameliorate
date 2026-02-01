import { TabUnselected } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { StepType } from "@reactour/tour";
import Image from "next/image";

import { Link } from "@/web/common/components/Link";
import { celebrateGif } from "@/web/common/urls";
import { NodeTypeText } from "@/web/topic/components/NodeTypeText/NodeTypeText";
import { StepContent } from "@/web/tutorial/StepContent";
import { startTutorial } from "@/web/tutorial/tutorial";
import { Track, tutorialDefaultAnchorClass } from "@/web/tutorial/tutorialUtils";

export const getReadingDiagramSteps = (track?: Track | null): StepType[] => [
  {
    selector: `.${tutorialDefaultAnchorClass}`,
    content: (
      <StepContent
        stepTitle="Узлы и связи"
        text={
          <span>
            Узлы представляют понятия, а связи — отношения между ними.
            <br />
            <br />
            Здесь есть узел <NodeTypeText type="problem" />, означающий «машины едут слишком быстро»,
            и связь от <NodeTypeText type="cause" />, показывающая, что «улица идёт под уклон» в
            некоторой степени приводит к слишком высокой скорости.
          </span>
        }
        imageSlot={
          <Image
            key="https://github.com/user-attachments/assets/14892d89-d970-407d-bb41-64dd6ae4ac6b"
            src="https://github.com/user-attachments/assets/14892d89-d970-407d-bb41-64dd6ae4ac6b"
            alt="рёбра"
            width={273}
            height={324}
            unoptimized
            className="rounded-xl border shadow-sm"
          />
        }
      />
    ),
  },
  {
    selector: `.${tutorialDefaultAnchorClass}`,
    content: (
      <StepContent
        stepTitle="Расположение диаграммы"
        text={
          <span>
            Обычно детали <NodeTypeText type="problem" /> располагаются сверху, а детали{" "}
            <NodeTypeText type="solution" /> — напротив, снизу. Компромиссы решений (
            <NodeTypeText type="criterion" />
            ) — между ними.
            <br />
            <br />
            Посмотрите{" "}
            <Link href="https://ameliorate.app/examples/ontology" target="_blank">
              онтологию
            </Link>{" "}
            если хотите увидеть все типы узлов с примерами.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/dc5029a6-51c5-4b03-92c8-ed67ab9eb500"
              src="https://github.com/user-attachments/assets/dc5029a6-51c5-4b03-92c8-ed67ab9eb500"
              alt="раскладка деталей на примере cars-going-too-fast"
              width={1237}
              height={911}
              unoptimized
              className="rounded-xl border shadow-sm"
            />
            <Typography variant="caption">
              Из:{" "}
              <Link
                href="https://ameliorate.app/examples/detailed-cars-going-too-fast?view=All+structure"
                target="_blank"
              >
                cars-going-too-fast
              </Link>
            </Typography>
          </>
        }
      />
    ),
  },
  {
    selector: `.${tutorialDefaultAnchorClass}`,
    content: (
      <StepContent
        stepTitle="Оценки"
        text={
          <span>
            Оценки выражают положительное или отрицательное мнение об узле или связи. Если вы вошли,
            можно оценивать темы других. Нажмите кнопку индикаторов <TabUnselected /> на панели, чтобы
            показать оценки и другие индикаторы.
            <br />
            <br />
            Здесь мы отмечаем, что столкновения с пешеходами — серьёзная проблема, а скорость
            передвижения — выгода, которая нам не важна.
          </span>
        }
        imageSlot={
          <Image
            key="https://github.com/user-attachments/assets/47b18abe-cf40-47cf-9b18-f376dfbe7723"
            src="https://github.com/user-attachments/assets/47b18abe-cf40-47cf-9b18-f376dfbe7723"
            alt="оценка узла"
            width={434}
            height={328}
            unoptimized // without this, nextjs sometimes tries to optimize the gif as an image - not sure why only sometimes though; thanks https://github.com/vercel/next.js/discussions/18628#discussioncomment-4036940
            className="rounded-xl border shadow-sm"
          />
        }
      />
    ),
  },
  track === "diagramViewers"
    ? {
        selector: `.${tutorialDefaultAnchorClass}`,
        content: (
          <StepContent
            stepTitle='Готово: "Чтение диаграммы"! 🎉'
            text="Отлично! Далее — как ориентироваться во всей информации темы."
            actionSlot={
              <Button variant="contained" onClick={() => startTutorial("navigatingATopic", track)}>
                Далее: Навигация
              </Button>
            }
            imageSlot={
              <Image
                key={celebrateGif}
                src={celebrateGif}
                alt="Празднуем завершение обучения!"
                width={256}
                height={143}
                unoptimized // without this, nextjs sometimes tries to optimize the gif as an image - not sure why only sometimes though; thanks https://github.com/vercel/next.js/discussions/18628#discussioncomment-4036940
              />
            }
          />
        ),
      }
    : {
        selector: `.${tutorialDefaultAnchorClass}`,
        content: (
          <StepContent
            stepTitle='Готово: "Чтение диаграммы"! 🎉'
            text="Отлично! Теперь вы готовы понимать диаграммы других в Ameliorate 🔥."
            imageSlot={
              <Image
                key={celebrateGif}
                src={celebrateGif}
                alt="Празднуем завершение обучения!"
                width={256}
                height={143}
                unoptimized // without this, nextjs sometimes tries to optimize the gif as an image - not sure why only sometimes though; thanks https://github.com/vercel/next.js/discussions/18628#discussioncomment-4036940
              />
            }
          />
        ),
      },
];
