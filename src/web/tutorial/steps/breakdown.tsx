import { Button, Typography } from "@mui/material";
import { StepType } from "@reactour/tour";
import Image from "next/image";

import { Link } from "@/web/common/components/Link";
import { celebrateGif } from "@/web/common/urls";
import { NodeTypeText } from "@/web/topic/components/NodeTypeText/NodeTypeText";
import { StepContent } from "@/web/tutorial/StepContent";
import { startTutorial } from "@/web/tutorial/tutorial";
import { tutorialDefaultAnchorClass } from "@/web/tutorial/tutorialUtils";

export const breakdownSteps: StepType[] = [
  {
    selector: `.${tutorialDefaultAnchorClass}`,
    content: (
      <StepContent
        stepTitle="Расположение элементов"
        text={
          <span>
            Обычно детали <NodeTypeText type="problem" /> размещаются сверху, а детали{" "}
            <NodeTypeText type="solution" /> — напротив них снизу. Компромиссы решений (
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
        stepTitle="Детали проблемы"
        text={
          <span>
            Проблемы обычно раскладываются на <NodeTypeText type="cause" /> и{" "}
            <NodeTypeText type="effect" />, а у них могут быть свои причины и эффекты.
            <br />
            <br />
            Эффекты могут быть нейтральными (<NodeTypeText type="effect" />), позитивными (
            <NodeTypeText type="benefit" />) или негативными (<NodeTypeText type="detriment" />).
            Обычно у проблем негативные эффекты.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/7d6769ba-a20d-419e-b72f-280a25fc4a79"
              src="https://github.com/user-attachments/assets/7d6769ba-a20d-419e-b72f-280a25fc4a79"
              alt="детали проблемы climate-change"
              width={711}
              height={572}
              unoptimized
              className="rounded-xl border shadow-sm"
            />
            <Typography variant="caption">
              Из:{" "}
              <Link
                href="https://ameliorate.app/examples/climate-change?view=Causes+and+concerns"
                target="_blank"
              >
                climate-change
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
        stepTitle="Детали решения"
        text={
          <span>
            Решения можно разбивать на <NodeTypeText type="solutionComponent" />,{" "}
            <NodeTypeText type="effect" /> и <NodeTypeText type="obstacle" />. Препятствия показывают,
            что ограничивает реализацию решения.
            <br />
            <br />
            У компонентов также могут быть собственные эффекты и препятствия.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/a1121e7a-0845-4a92-937e-2f168e34a871"
              src="https://github.com/user-attachments/assets/a1121e7a-0845-4a92-937e-2f168e34a871"
              alt="детали решения mta-congestion-pricing"
              width={653}
              height={545}
              unoptimized
              className="rounded-xl border shadow-sm"
            />
            <Typography variant="caption">
              Из:{" "}
              <Link href="https://ameliorate.app/keyserj/mta-congestion-pricing" target="_blank">
                mta-congestion-pricing
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
        stepTitle="Как решения устраняют проблемы"
        text={
          <span>
            Можно напрямую связать конкретные детали решения с деталями проблемы, чтобы показать,
            как именно решение устраняет проблему.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/03dc8f21-b7da-46db-bbee-ebacd490d016"
              src="https://github.com/user-attachments/assets/03dc8f21-b7da-46db-bbee-ebacd490d016"
              alt="показано, что выгода устраняет причину"
              width={738}
              height={636}
              unoptimized // without this, nextjs sometimes tries to optimize the gif as an image - not sure why only sometimes though; thanks https://github.com/vercel/next.js/discussions/18628#discussioncomment-4036940
              className="rounded-xl border shadow-sm"
            />
            <Typography variant="caption">
              Из:{" "}
              <Link
                href="https://ameliorate.app/examples/detailed-cars-going-too-fast"
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
        stepTitle="Критерии"
        text={
          <span>
            Решения также могут быть косвенно связаны с проблемами через{" "}
            <NodeTypeText type="criterion" />.
            <br />
            <br />
            Критерии отражают компромиссы между решениями и должны быть сформулированы как
            положительное свойство решения, чтобы их было удобно сравнивать.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/d3467cd8-f805-46cf-a5e5-84a031ad98cc"
              src="https://github.com/user-attachments/assets/d3467cd8-f805-46cf-a5e5-84a031ad98cc"
              alt="выгода удовлетворяет критерию"
              width={627}
              height={547}
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
        stepTitle='Готово: "Декомпозиция проблемы"! 🎉'
        text="Ура! Далее — как добавить нюансы в тему."
        actionSlot={
          <Button variant="contained" onClick={() => startTutorial("addingNuance", "builders")}>
            Далее: Нюансы
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
  },
];
