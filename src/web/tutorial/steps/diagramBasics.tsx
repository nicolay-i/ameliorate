import { Build } from "@mui/icons-material";
import { Button } from "@mui/material";
import { StepType } from "@reactour/tour";
import Image from "next/image";

import { celebrateGif } from "@/web/common/urls";
import { StepContent } from "@/web/tutorial/StepContent";
import { startTutorial } from "@/web/tutorial/tutorial";
import { tutorialDefaultAnchorClass } from "@/web/tutorial/tutorialUtils";

export const diagramBasicsSteps: StepType[] = [
  {
    selector: `.${tutorialDefaultAnchorClass}`,
    content: (
      <StepContent
        stepTitle="Узлы"
        text={`Узлы — это основа представления информации.

Ниже показан узел проблемы, который означает, что «машины едут слишком быстро в моём районе» — это проблема.`}
        imageSlot={
          <Image
            key="https://github.com/user-attachments/assets/989d5310-6193-421c-9dac-aaaa55ba7ef6"
            src="https://github.com/user-attachments/assets/989d5310-6193-421c-9dac-aaaa55ba7ef6"
            alt="узел проблемы — cars going too fast"
            width={305}
            height={159}
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
        stepTitle="Редактирование текста узла"
        text={`Чтобы изменить текст, выберите узел и кликните по тексту.

Редактирование доступно только автору темы или тем, кому выдали права.`}
        imageSlot={
          <Image
            key="https://github.com/user-attachments/assets/ca5049a6-cb74-479a-a386-0fe22d2034e1"
            src="https://github.com/user-attachments/assets/ca5049a6-cb74-479a-a386-0fe22d2034e1"
            alt="редактирование текста узла"
            width={322}
            height={205}
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
        stepTitle="Добавление узла"
        text={`Когда узел выбран, используйте появившиеся кнопки, чтобы добавить связанные узлы.`}
        imageSlot={
          <Image
            key="https://github.com/user-attachments/assets/380f2603-33c9-46d7-997f-532831196ff4"
            src="https://github.com/user-attachments/assets/380f2603-33c9-46d7-997f-532831196ff4"
            alt="добавление узла"
            width={527}
            height={387}
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
        stepTitle="Другие действия"
        text={
          <span>
            Действия для узла (например, удаление) доступны через правый клик, а общие действия,
            такие как отмена/повтор, находятся на панели инструментов.
            <br />
            <br />
            Расширенные действия и настройки доступны через кнопку «Другие действия» <Build />.
            <Build />.
          </span>
        }
        imageSlot={
          <Image
            key="https://github.com/user-attachments/assets/61b07a44-bd48-49ef-b9ee-780b4c2a676c"
            src="https://github.com/user-attachments/assets/61b07a44-bd48-49ef-b9ee-780b4c2a676c"
            alt="другие действия"
            width={413}
            height={476}
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
        stepTitle="Связи"
        text={`Связи показывают отношения между узлами. Их можно читать снизу вверх: «улица идёт под уклон» → причина → «машины едут слишком быстро», или по-человечески: «уклон улицы приводит к тому, что машины едут слишком быстро».`}
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
        stepTitle='Готово: "Основы диаграмм"! 🎉'
        text="Отлично! Далее — как декомпозировать проблему."
        actionSlot={
          <Button
            variant="contained"
            onClick={() => startTutorial("breakingDownAProblem", "builders")}
          >
            Далее: Декомпозиция
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
