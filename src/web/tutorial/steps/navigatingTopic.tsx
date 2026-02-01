import { Build, Group, VerticalSplit } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { StepType } from "@reactour/tour";
import Image from "next/image";

import { Link } from "@/web/common/components/Link";
import { celebrateGif } from "@/web/common/urls";
import { StepContent } from "@/web/tutorial/StepContent";
import {
  quickViewDropdownSelector,
  tutorialDefaultAnchorClass,
} from "@/web/tutorial/tutorialUtils";

export const navigatingTopicSteps: StepType[] = [
  {
    selector: quickViewDropdownSelector,
    content: (
      <StepContent
        stepTitle="Быстрые виды"
        text={
          <span>Быстрые виды помогают легко переключаться между аспектами темы.</span>
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
    selector: `.${tutorialDefaultAnchorClass}`,
    content: (
      <StepContent
        stepTitle="Дополнительные детали"
        text={
          <span>
            Индикаторы показывают, где есть дополнительные детали.
            <br />
            <br />
            Детали можно увидеть, выбрав элемент и посмотрев в панель «Детали»{" "}
            <VerticalSplit color="primary" />.
          </span>
        }
        imageSlot={
          <>
            <Image
              key="https://github.com/user-attachments/assets/bc02d4e2-5507-49d6-bd10-a32ea0ebd841"
              src="https://github.com/user-attachments/assets/bc02d4e2-5507-49d6-bd10-a32ea0ebd841"
              alt="индикаторы"
              width={600}
              height={467}
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
        stepTitle="Перспективы"
        text={
          <span>
            Если вы вошли, вы увидите свои оценки; иначе — оценки автора темы.
            <br />
            <br />
            Можно сравнить оценки нескольких людей кнопкой «Сравнить» <Group />, либо выбрать
            конкретные перспективы в панели «Другие действия» <Build />.
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
    selector: `.${tutorialDefaultAnchorClass}`,
    content: (
      <StepContent
        stepTitle='Готово: "Навигация по теме"! 🎉'
        text="Отлично! Вы изучили основы просмотра в Ameliorate. Теперь можно разбираться в темах других людей! 🔥"
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
