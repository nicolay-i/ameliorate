import { TabUnselected, VerticalSplit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { StepType } from "@reactour/tour";
import Image from "next/image";

import { celebrateGif } from "@/web/common/urls";
import { NodeTypeText } from "@/web/topic/components/NodeTypeText/NodeTypeText";
import { StepContent } from "@/web/tutorial/StepContent";
import { startTutorial } from "@/web/tutorial/tutorial";
import { detailsPaneSelector, tutorialDefaultAnchorClass } from "@/web/tutorial/tutorialUtils";

export const addingNuanceSteps: StepType[] = [
  {
    selector: `.${tutorialDefaultAnchorClass}`,
    content: (
      <StepContent
        stepTitle="Оценки"
        text={
          <span>
            С помощью оценок можно выразить положительное или отрицательное мнение об узлах и
            связях. Нажмите кнопку индикаторов <TabUnselected /> на панели, чтобы показать оценки и
            другие индикаторы.
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
  {
    selector: `.${tutorialDefaultAnchorClass}`,
    content: (
      <StepContent
        stepTitle="Перспективы"
        text={
          <span>
            По умолчанию вы видите свои оценки, но если тему оценивали другие, можно сравнить
            результаты.
            <br />
            <br />
            Также в панели «Другие действия» можно выбрать, чьи перспективы показывать.
          </span>
        }
        imageSlot={
          <Image
            key="https://github.com/user-attachments/assets/bdf7fd16-d44a-4a74-8e5e-24cd577dc647"
            src="https://github.com/user-attachments/assets/bdf7fd16-d44a-4a74-8e5e-24cd577dc647"
            alt="просмотр других перспектив"
            width={492}
            height={411}
            unoptimized // without this, nextjs sometimes tries to optimize the gif as an image - not sure why only sometimes though; thanks https://github.com/vercel/next.js/discussions/18628#discussioncomment-4036940
            className="rounded-xl border shadow-sm"
          />
        }
      />
    ),
  },
  {
    selector: detailsPaneSelector,
    content: (
      <StepContent
        stepTitle="Обоснование"
        text={
          <span>
            Можно добавлять узлы <NodeTypeText type="support" /> или <NodeTypeText type="critique" />
            для обоснования положительных или отрицательных мнений. Такие детали находятся в панели
            «Детали» <VerticalSplit color="primary" /> после выбора узла или связи.
            <br />
            <br />
            Здесь мы поддерживаем тезис, что «пешеходов могут сбить», потому что это снижает чувство
            безопасности в районе.
          </span>
        }
        imageSlot={
          <Image
            key="https://github.com/user-attachments/assets/4b3f2bcb-9890-4e02-aa33-fea8e8721ea9"
            src="https://github.com/user-attachments/assets/4b3f2bcb-9890-4e02-aa33-fea8e8721ea9"
            alt="обоснование оценок"
            width={600}
            height={353}
            unoptimized // without this, nextjs sometimes tries to optimize the gif as an image - not sure why only sometimes though; thanks https://github.com/vercel/next.js/discussions/18628#discussioncomment-4036940
            className="rounded-xl border shadow-sm"
          />
        }
      />
    ),
  },
  {
    selector: detailsPaneSelector,
    content: (
      <StepContent
        stepTitle="Исследование"
        text={
          <span>
            Можно добавить <NodeTypeText type="question" /> чтобы отметить то, что стоит выяснить,
            либо <NodeTypeText type="fact" /> или <NodeTypeText type="source" /> для другой важной
            информации.
            <br />
            <br />
            Их тоже можно оценивать, как и любые другие узлы, чтобы выразить своё мнение.
          </span>
        }
        imageSlot={
          <Image
            key="https://github.com/user-attachments/assets/9e12369a-c41f-47c9-ba40-ab95f60985d3"
            src="https://github.com/user-attachments/assets/9e12369a-c41f-47c9-ba40-ab95f60985d3"
            alt="добавление исследований"
            width={579}
            height={379}
            unoptimized // without this, nextjs sometimes tries to optimize the gif as an image - not sure why only sometimes though; thanks https://github.com/vercel/next.js/discussions/18628#discussioncomment-4036940
            className="rounded-xl border shadow-sm"
          />
        }
      />
    ),
  },
  {
    selector: detailsPaneSelector,
    content: (
      <StepContent
        stepTitle="Заметки и комментарии"
        text={
          <span>
            Используйте «Заметки» для дополнительной информации, а «Комментарии» — чтобы начать
            обсуждение элемента.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/a1e9b490-2dad-4662-81f2-121524708140"
              src="https://github.com/user-attachments/assets/a1e9b490-2dad-4662-81f2-121524708140"
              alt="заметка"
              width={377}
              height={140}
              unoptimized
              className="rounded-xl border shadow-lg"
            />
            <Image
              key="https://github.com/user-attachments/assets/e7a9c06c-71f4-4f41-9fc5-d89bf81d60ad"
              src="https://github.com/user-attachments/assets/e7a9c06c-71f4-4f41-9fc5-d89bf81d60ad"
              alt="комментарий"
              width={382}
              height={224}
              unoptimized
              className="mt-3 rounded-xl border shadow-lg"
            />
          </>
        }
      />
    ),
  },
  {
    selector: `.${tutorialDefaultAnchorClass}`,
    content: (
      <StepContent
        stepTitle="Индикаторы"
        text={
          <span>
            У каждого типа информации есть индикаторы <TabUnselected />, чтобы сразу видеть, где
            есть дополнительные детали.
          </span>
        }
        imageSlot={
          <Image
            key="https://github.com/user-attachments/assets/5f363814-a2d5-469e-b033-63d7fc0b6cf5"
            src="https://github.com/user-attachments/assets/5f363814-a2d5-469e-b033-63d7fc0b6cf5"
            alt="индикаторы"
            width={507}
            height={360}
            unoptimized // without this, nextjs sometimes tries to optimize the gif as an image - not sure why only sometimes though; thanks https://github.com/vercel/next.js/discussions/18628#discussioncomment-4036940
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
        stepTitle='Готово: "Добавление нюансов"! 🎉'
        text="Отлично! Далее — как использовать таблицу критериев для сравнения компромиссов."
        actionSlot={
          <Button
            variant="contained"
            onClick={() => startTutorial("evaluatingTradeoffs", "builders")}
          >
            Далее: Оценка компромиссов
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
