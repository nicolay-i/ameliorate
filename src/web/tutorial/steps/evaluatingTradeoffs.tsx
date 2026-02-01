import { VerticalSplit } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { StepType } from "@reactour/tour";
import Image from "next/image";

import { Link } from "@/web/common/components/Link";
import { celebrateGif } from "@/web/common/urls";
import { StepContent } from "@/web/tutorial/StepContent";
import { startTutorial } from "@/web/tutorial/tutorial";
import { Track, tutorialDefaultAnchorClass } from "@/web/tutorial/tutorialUtils";

export const getEvaluatingTradeoffsSteps = (track: Track | null): StepType[] => [
  {
    selector: `.${tutorialDefaultAnchorClass}`,
    content: (
      <StepContent
        stepTitle="Просмотр таблицы"
        text={
          <span>
            Таблица критериев помогает сравнивать компромиссы разных решений. Её можно открыть,
            кликнув правой кнопкой по узлу проблемы.
            <br />
            <br />
            Чтобы вернуться к диаграмме, смените формат на «Диаграмма» в разделе «Виды» {">"} «Формат»
            на панели темы <VerticalSplit color="primary" />.
          </span>
        }
        imageSlot={
          <Image
            key="https://github.com/user-attachments/assets/5ccc00a7-a3e9-439f-8e19-4d32106bfdef"
            src="https://github.com/user-attachments/assets/5ccc00a7-a3e9-439f-8e19-4d32106bfdef"
            alt="просмотр таблицы критериев"
            width={677}
            height={472}
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
        stepTitle="Оценки"
        text={
          <span>
            Оценки в заголовках показывают важность решений и критериев, а оценки на пересечении
            показывают, насколько решение удовлетворяет критериям.
            <br />
            <br />
            Здесь оценки показывают, что светофор — не лучшее решение: он остановит людей, но дорог,
            а во время установки движение будет нарушено.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/1dd98e5e-198a-41ff-967a-099c7cbe430b"
              src="https://github.com/user-attachments/assets/1dd98e5e-198a-41ff-967a-099c7cbe430b"
              alt="оценки в таблице критериев"
              width={540}
              height={325}
              className="rounded-xl border shadow-sm"
            />
            <Typography variant="caption">
              Из:{" "}
              <Link
                href="https://ameliorate.app/examples/detailed-cars-going-too-fast?view=Tradeoff+table"
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
        stepTitle="Итоги решений"
        text={
          <span>
            Для решений рассчитывается итог, который показывает, насколько они хороши по всем
            критериям.
            <br />
            <br />
            Положительное значение — хорошее решение, отрицательное — плохое. Подробности расчёта
            доступны по иконке информации в таблице.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/f71c1dd1-0f60-4151-9b1d-ea207911ce60"
              src="https://github.com/user-attachments/assets/f71c1dd1-0f60-4151-9b1d-ea207911ce60"
              alt="итоги по решениям"
              width={543}
              height={108}
              className="rounded-xl border shadow-sm"
            />
            <Typography variant="caption">
              Из:{" "}
              <Link
                href="https://ameliorate.app/examples/detailed-cars-going-too-fast?view=Tradeoff+table"
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
  track === "builders"
    ? {
        selector: `.${tutorialDefaultAnchorClass}`,
        content: (
          <StepContent
            stepTitle='Готово: "Оценка компромиссов"! 🎉'
            text="Отлично! Напоследок — как создавать виды, чтобы быстро смотреть разные аспекты темы."
            actionSlot={
              <Button variant="contained" onClick={() => startTutorial("buildingViews", track)}>
                Далее: Создание видов
              </Button>
            }
            imageSlot={
              <Image
                key={celebrateGif}
                src={celebrateGif}
                alt="Празднуем завершение обучения!"
                width={256}
                height={143}
              />
            }
          />
        ),
      }
    : track === "tableViewers"
      ? {
          selector: `.${tutorialDefaultAnchorClass}`,
          content: (
            <StepContent
              stepTitle='Готово: "Оценка компромиссов"! 🎉'
              text="Отлично! Напоследок — как ориентироваться во всей информации темы."
              actionSlot={
                <Button
                  variant="contained"
                  onClick={() => startTutorial("navigatingATopic", track)}
                >
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
              stepTitle='Готово: "Оценка компромиссов"! 🎉'
              text="Отлично! Теперь вы готовы сравнивать решения в Ameliorate 🔥."
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
