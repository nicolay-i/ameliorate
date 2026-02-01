import { Build } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { StepType } from "@reactour/tour";
import Image from "next/image";

import { Link } from "@/web/common/components/Link";
import { celebrateGif } from "@/web/common/urls";
import { NodeTypeText } from "@/web/topic/components/NodeTypeText/NodeTypeText";
import { StepContent } from "@/web/tutorial/StepContent";
import {
  quickViewDropdownSelector,
  tutorialDefaultAnchorClass,
  viewsPaneSelector,
} from "@/web/tutorial/tutorialUtils";

export const buildingViewsSteps: StepType[] = [
  {
    selector: quickViewDropdownSelector,
    content: (
      <StepContent
        stepTitle="Быстрые виды"
        text={
          <span>
            Быстрые виды помогают легко переключаться между полезными для вас представлениями.
            <br />
            <br />
            Они также могут быть хорошей отправной точкой для других, чтобы увидеть, что важно в
            вашей теме.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/87055acd-debb-45f2-981f-ef511e770222"
              src="https://github.com/user-attachments/assets/87055acd-debb-45f2-981f-ef511e770222"
              alt="переключение между видами в теме cars-going-too-fast"
              width={1096}
              height={847}
              unoptimized // warning without this - gifs aren't optimized by nextjs apparently
              // extra padding & bg because spacing seems to look better
              className="rounded-xl border bg-paperPlain-main p-2 shadow-sm"
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
    selector: viewsPaneSelector,
    content: (
      <StepContent
        stepTitle="Фильтры"
        text={
          <span>
            Вид состоит из набора фильтров и нескольких настроек.
            <br />
            <br />
            Есть фильтры информации, общие фильтры, фильтры таблицы (если вы смотрите таблицу), а
            также настройки диаграммы в панели «Другие действия» <Build />.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/ebdaefb6-26fb-4eef-b710-34fa303f7ad4"
              src="https://github.com/user-attachments/assets/ebdaefb6-26fb-4eef-b710-34fa303f7ad4"
              alt="показаны виды фильтров"
              width={450}
              height={434}
              unoptimized // without this, nextjs sometimes tries to optimize the gif as an image - not sure why only sometimes though; thanks https://github.com/vercel/next.js/discussions/18628#discussioncomment-4036940
              className="rounded-xl border shadow-sm"
            />
          </>
        }
      />
    ),
  },
  {
    selector: viewsPaneSelector,
    content: (
      <StepContent
        stepTitle="Фильтры информации"
        text={
          <span>
            Фильтры информации управляют категориями: Декомпозиция (<NodeTypeText type="problem" />
            , <NodeTypeText type="solution" />, и т. д.), Исследование (<NodeTypeText type="question" />,{" "}
            <NodeTypeText type="fact" />, <NodeTypeText type="source" />, и т. д.) и Обоснование (
            <NodeTypeText type="support" />, <NodeTypeText type="critique" />
            ).
            <br />
            <br />
            Здесь мы включаем категорию «Исследование», добавляя вопросы, факты и источники на
            диаграмму.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/edbc5e18-447e-4ae7-a0ae-00aa9f72e8c8"
              src="https://github.com/user-attachments/assets/edbc5e18-447e-4ae7-a0ae-00aa9f72e8c8"
              alt="включение и выключение информационных фильтров"
              width={659}
              height={412}
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
    selector: viewsPaneSelector,
    content: (
      <StepContent
        stepTitle="Общие фильтры"
        text={
          <span>
            Общие фильтры управляют прочими параметрами: какие типы узлов показывать, фильтрация по
            оценкам, какие конкретные узлы показывать/скрывать независимо от других фильтров.
            <br />
            <br />
            Здесь мы скрываем узлы типа <NodeTypeText type="cause" /> и вручную показываем причину
            «улица идёт под уклон».
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/533529a7-0de0-4c22-94cf-d9b00943399f"
              src="https://github.com/user-attachments/assets/533529a7-0de0-4c22-94cf-d9b00943399f"
              alt="изменение общих фильтров"
              width={659}
              height={369}
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
    selector: viewsPaneSelector,
    content: (
      <StepContent
        stepTitle="Скрытые соседи"
        text={
          <span>
            Если маркер узла синий, значит у него есть сосед, который сейчас скрыт фильтром.
            <br />
            <br />
            Скрытого соседа можно показать, кликнув на значок глаза, или снова скрыть через
            контекстное меню.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/2ceccd62-e5ff-46ad-81cb-e0c564ed4269"
              src="https://github.com/user-attachments/assets/2ceccd62-e5ff-46ad-81cb-e0c564ed4269"
              alt="показ индикатора соседей"
              width={600}
              height={445}
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
    selector: viewsPaneSelector,
    content: (
      <StepContent
        stepTitle="Показ и скрытие соседей"
        text={
          <span>
            Часто хочется посмотреть только узел и его соседей, либо добавить всех соседей в вид.
            <br />
            <br />
            Эти действия доступны в контекстном меню узла.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/0a2563db-5795-44ac-b0bd-e97292b4d18f"
              src="https://github.com/user-attachments/assets/0a2563db-5795-44ac-b0bd-e97292b4d18f"
              alt="показ и скрытие соседей"
              width={596}
              height={475}
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
    selector: viewsPaneSelector,
    content: (
      <StepContent
        stepTitle="Принудительные слои"
        text={
          <span>
            Пример настройки вида, не являющейся фильтром, — «Принудительно раскладывать по слоям».
            <br />
            <br />
            Она размещает проблемы сверху, критерии — посередине, решения — снизу. Иногда полезно
            отключить эту опцию, чтобы узлы располагались ближе друг к другу.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/0ca650fe-9497-4837-825c-1b980b4cae97"
              src="https://github.com/user-attachments/assets/0ca650fe-9497-4837-825c-1b980b4cae97"
              alt="фиксация узлов в слоях"
              width={591}
              height={516}
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
    selector: viewsPaneSelector,
    content: (
      <StepContent
        stepTitle="Сохранение быстрых видов"
        text={
          <span>
            Когда вид настроен так, как нужно, можно создать быстрый вид.
            <br />
            <br />
            Если после этого вы поменяли фильтры и хотите обновить вид, нажмите иконку сохранения,
            чтобы перезаписать настройки.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/74c43ce1-ede5-4623-9563-17c3963a0e12"
              src="https://github.com/user-attachments/assets/74c43ce1-ede5-4623-9563-17c3963a0e12"
              alt="сохранение быстрого вида"
              width={788}
              height={475}
              unoptimized // without this, nextjs sometimes tries to optimize the gif as an image - not sure why only sometimes though; thanks https://github.com/vercel/next.js/discussions/18628#discussioncomment-4036940
              className="rounded-xl border shadow-sm"
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
        stepTitle='Готово: "Создание видов"! 🎉'
        text="Отлично! Вы освоили основы Ameliorate. Теперь можно пожинать плоды и строить диаграммы! 🔥"
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
