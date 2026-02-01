import { Chip, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { ReactNode, useRef, useState } from "react";

import { throwError } from "@/common/errorHandling";
import Carousel from "@/web/common/components/Carousel";
import { Link } from "@/web/common/components/Link";

interface Example {
  title: string;
  href: string;
  category: string;
  purpose: string;
  notes: ReactNode;
  complexity: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  image: ReactNode;
}

const examples = [
  {
    title: "mattresses",
    href: "https://ameliorate.app/keyserj/mattresses",
    category: "Личное решение",
    purpose: "определить, какой матрас купить",
    notes: "Ameliorate отлично визуализирует множество вариантов и их компромиссы.",
    complexity: 2,
    image: (
      <Image
        key="https://github.com/user-attachments/assets/e2f7f706-a9d4-4cee-bd21-3e2c1b5f7ea7"
        src="https://github.com/user-attachments/assets/e2f7f706-a9d4-4cee-bd21-3e2c1b5f7ea7"
        alt="диаграмма матрасов"
        width={900}
        height={522}
        unoptimized
        className="rounded-xl border p-2 shadow-sm"
        // Only using eager loading to avoid layout shift - don't know how to do this with nextjs Image
        // component otherwise, since the parent container should shrink if the Image fits, otherwise
        // the Image should shrink into the max height of the parent.
        loading="eager"
      />
    ),
  },
  {
    title: "ORM",
    href: "https://ameliorate.app/examples/ORM",
    category: "Командное решение",
    purpose: "выбрать инструмент",
    notes: "Ameliorate отлично визуализирует множество вариантов и их компромиссы.",
    complexity: 3,
    image: (
      <Image
        key="https://github.com/user-attachments/assets/cd390214-da00-4ad3-bb88-4234124ec17b"
        src="https://github.com/user-attachments/assets/cd390214-da00-4ad3-bb88-4234124ec17b"
        alt="диаграмма ORM"
        width={735}
        height={688}
        unoptimized
        className="rounded-xl border p-2 shadow-sm"
        // Only using eager loading to avoid layout shift - don't know how to do this with nextjs Image
        // component otherwise, since the parent container should shrink if the Image fits, otherwise
        // the Image should shrink into the max height of the parent.
        loading="eager"
      />
    ),
  },
  {
    title: "cars-going-too-fast",
    href: "https://ameliorate.app/examples/detailed-cars-going-too-fast",
    category: "Местная политика",
    purpose: "улучшить безопасность района",
    notes:
      "Ameliorate помогает отслеживать причины и следствия, а оценки позволяют подчеркнуть важное.",
    complexity: 3,
    image: (
      <Image
        key="https://github.com/user-attachments/assets/87b1b0b8-3536-4c77-aa4a-d892f4ed4e6e"
        src="https://github.com/user-attachments/assets/87b1b0b8-3536-4c77-aa4a-d892f4ed4e6e"
        alt="диаграмма cars-going-too-fast"
        width={648}
        height={783}
        unoptimized
        className="rounded-xl border shadow-sm"
        // Only using eager loading to avoid layout shift - don't know how to do this with nextjs Image
        // component otherwise, since the parent container should shrink if the Image fits, otherwise
        // the Image should shrink into the max height of the parent.
        loading="eager"
      />
    ),
  },
  {
    title: "10-percent-time",
    href: "https://ameliorate.app/keyserj/10-percent-time",
    category: "Организационное решение",
    purpose: "обсудить предложение инициативы",
    notes:
      "Ameliorate хорошо подходит для визуализации инициатив с несколькими элементами, причинами и последствиями.",
    complexity: 3,
    image: (
      <Image
        key="https://github.com/user-attachments/assets/753b5c92-4bdd-43dc-840d-37dd70b8f904"
        src="https://github.com/user-attachments/assets/753b5c92-4bdd-43dc-840d-37dd70b8f904"
        alt="диаграмма 10-percent-time"
        width={811}
        height={756}
        unoptimized
        className="rounded-xl border shadow-sm"
        // Only using eager loading to avoid layout shift - don't know how to do this with nextjs Image
        // component otherwise, since the parent container should shrink if the Image fits, otherwise
        // the Image should shrink into the max height of the parent.
        loading="eager"
      />
    ),
  },
  {
    title: "free-school-meals",
    href: "https://ameliorate.app/keyserj/fl-2025-sb74-free-school-breakfast-lunch",
    category: "Государственная политика",
    purpose: "улучшить доступ учащихся к питанию",
    notes:
      "Ameliorate хорошо подходит для визуализации инициатив с несколькими элементами, причинами и последствиями.",
    complexity: 4,
    image: (
      <Image
        key="https://github.com/user-attachments/assets/23e0d83b-a716-4454-8ef6-2c37c106df82"
        src="https://github.com/user-attachments/assets/23e0d83b-a716-4454-8ef6-2c37c106df82"
        alt="диаграмма бесплатных школьных обедов"
        width={787}
        height={739}
        unoptimized
        className="rounded-xl border shadow-sm"
        // Only using eager loading to avoid layout shift - don't know how to do this with nextjs Image
        // component otherwise, since the parent container should shrink if the Image fits, otherwise
        // the Image should shrink into the max height of the parent.
        loading="eager"
      />
    ),
  },
  {
    title: "mta-congestion-tax",
    href: "https://ameliorate.app/keyserj/mta-congestion-pricing",
    category: "Политика большого города",
    purpose: "улучшить транспортное законодательство",
    notes:
      "Ameliorate хорошо подходит для визуализации инициатив с несколькими элементами, причинами и последствиями.",
    complexity: 5,
    image: (
      <Image
        key="https://github.com/user-attachments/assets/fe036a09-6c16-409d-bdf1-6ddf8b828559"
        src="https://github.com/user-attachments/assets/fe036a09-6c16-409d-bdf1-6ddf8b828559"
        alt="диаграмма mta-congestion-tax"
        width={638}
        height={794}
        unoptimized
        className="rounded-xl border shadow-sm"
        // Only using eager loading to avoid layout shift - don't know how to do this with nextjs Image
        // component otherwise, since the parent container should shrink if the Image fits, otherwise
        // the Image should shrink into the max height of the parent.
        loading="eager"
      />
    ),
  },
  {
    title: "california-wildfires",
    href: "https://ameliorate.app/keyserj/california-wildfire-season-worsening",
    category: "Адвокация (1)",
    purpose: "предотвратить и подготовиться к пожарам",
    notes: (
      <span>
        Ameliorate полезен для разбора сложных проблем на высоком уровне, но при добавлении большого
        количества деталей может показаться, что не хватает{" "}
        <Link
          href="https://github.com/amelioro/ameliorate/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22for%20large%20topics%22%2Cwicked%20"
          target="_blank"
        >
          функций
        </Link>
        .
      </span>
    ),
    complexity: 7,
    image: (
      <Image
        key="https://github.com/user-attachments/assets/e8d52795-5a9e-46c8-a8c8-781026eb7426"
        src="https://github.com/user-attachments/assets/e8d52795-5a9e-46c8-a8c8-781026eb7426"
        alt="диаграмма калифорнийских лесных пожаров"
        width={569}
        height={805}
        unoptimized
        className="rounded-xl border shadow-sm"
        // Only using eager loading to avoid layout shift - don't know how to do this with nextjs Image
        // component otherwise, since the parent container should shrink if the Image fits, otherwise
        // the Image should shrink into the max height of the parent.
        loading="eager"
      />
    ),
  },
  {
    title: "sugar-brutality",
    href: "https://ameliorate.app/keyserj/brutality-sugar-article",
    category: "Адвокация (2)",
    purpose: "повысить осведомленность и мотивировать к изменениям",
    notes: (
      <span>
        Ameliorate полезен для разбора сложных проблем на высоком уровне, но при добавлении большого
        количества деталей может показаться, что не хватает{" "}
        <Link
          href="https://github.com/amelioro/ameliorate/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22for%20large%20topics%22%2Cwicked%20"
          target="_blank"
        >
          функций
        </Link>
        .
      </span>
    ),
    complexity: 8,
    image: (
      <Image
        key="https://github.com/user-attachments/assets/62732e0e-494d-4767-a2ae-09b7056b6c7a"
        src="https://github.com/user-attachments/assets/62732e0e-494d-4767-a2ae-09b7056b6c7a"
        alt="диаграмма sugar-brutality"
        width={714}
        height={672}
        unoptimized
        className="rounded-xl border shadow-sm"
        // Only using eager loading to avoid layout shift - don't know how to do this with nextjs Image
        // component otherwise, since the parent container should shrink if the Image fits, otherwise
        // the Image should shrink into the max height of the parent.
        loading="eager"
      />
    ),
  },
  {
    title: "climate-change",
    href: "https://ameliorate.app/examples/climate-change",
    category: "Глобальная проблема",
    purpose: "проанализировать сложную проблему",
    notes: (
      <span>
        Как и в других задачах высокой сложности, Ameliorate помогает смотреть на ситуацию сверху, но
        для глобальных вопросов особенно нужны дополнительные{" "}
        <Link
          href="https://github.com/amelioro/ameliorate/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22for%20large%20topics%22%2Cwicked%20"
          target="_blank"
        >
          функции
        </Link>
        .
      </span>
    ),
    complexity: 10,
    image: (
      <Image
        key="https://github.com/user-attachments/assets/63698108-8e9a-4b02-be79-c509015b96df"
        src="https://github.com/user-attachments/assets/63698108-8e9a-4b02-be79-c509015b96df"
        alt="диаграмма изменения климата"
        width={718}
        height={651}
        unoptimized
        className="rounded-xl border shadow-sm"
        // Only using eager loading to avoid layout shift - don't know how to do this with nextjs Image
        // component otherwise, since the parent container should shrink if the Image fits, otherwise
        // the Image should shrink into the max height of the parent.
        loading="eager"
      />
    ),
  },
] as const satisfies Example[];

const initialSlideIndex = examples.findIndex((example) => example.title === "free-school-meals");
if (initialSlideIndex === -1) throwError("No example found for initial selected card", examples);

export const ExamplesSection = () => {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(initialSlideIndex);
  const carouselRef = useRef<Carousel>(null);

  const currentExample = examples[currentExampleIndex];

  if (!currentExample)
    return throwError(`No example found for index ${currentExampleIndex}`, examples);

  // There's some complexity with sizing here because of a few desired requirements related to the image:
  // 1. Want the parent section to shrink to fit the current image if the image is smaller
  // 2. Want the current image to shrink (while maintaining aspect ratio) to the parent section's max height if the image is too big
  // 3. Want to avoid layout shift from loading the image (nextjs Image does this normally but not when image height & width are overridden, which is being done to address requirements 1 & 2)
  // 4. Want to lazy load images so that big bundle isn't loaded all at once (~600kb for all 8 images)
  // 5. Want to ensure images aren't reloaded when switching tabs
  // TODO: currently we're sacrificing req 4 here in order to satisfy the others; ideally we'd find a solution that meets all these reqs without sacrifice.
  return (
    <div className="flex h-full flex-col text-center">
      <Typography variant="h4">Увидьте потенциал</Typography>

      <Carousel
        ref={carouselRef}
        arrows={false}
        centerMode={true}
        initialSlide={initialSlideIndex}
        focusOnSelect={true} // allow clicking on a card to select it
        variableWidth={true} // allow cards to be different widths based on contents
        swipeToSlide={true} // allow moving more than one card at a time if swiping far
        /**
         * Disable dragging on desktop because:
         * 1. if mouse moves outside of carousel it stops the drag which is annoying
         * 2. when drag stops, it triggers onclick, which can select a different card based on where your mouse is on mouseup, which is really stupid
         *
         * Note: this doesn't disable dragging on mobile, which is good because I guess these issues don't seem to exist on mobile...?
         */
        draggable={false}
        infinite={false}
        beforeChange={(_current, next) => setCurrentExampleIndex(next)}
        className={
          "w-screen -translate-x-1/2 relative left-1/2 m-0!" +
          " [&_.slick-slide]:py-1 [&_.slick-slide]:px-1 sm:[&_.slick-slide]:px-2 [&_.slick-slide]:max-w-[100vw] [&_.slick-slide]:h-auto!" +
          " [&_.slick-slide_>_*]:h-full [&_.slick-slide_>_*]:flex [&_.slick-slide_>_*]:justify-stretch" +
          // for some reason the track will go into two rows (even with rows={1}) without `flex`
          " [&_.slick-track]:flex [&_.slick-track]:justify-stretch"
        }
      >
        {examples.map((example, index) => (
          <div
            key={example.title}
            role="button"
            className={
              "flex flex-col rounded-xl h-full border p-3 sm:p-4 max-w-full whitespace-nowrap text-center" +
              (index === currentExampleIndex
                ? " border-primary-main bg-primary-light/5 hover:cursor-auto"
                : " hover:bg-primary-light/5 hover:cursor-pointer *:pointer-events-none [&_a]:no-underline [&_a]:font-normal") // pointer-events-none to prevent accidental link-clicking when trying to select a card
            }
          >
            <Typography component="h5" className="text-xl sm:text-2xl">
              {example.category}
            </Typography>

            <Divider className="my-1 sm:my-2" />

            <Typography variant="body2" className="mt-0 sm:mt-1">
              <Link href={example.href} target="_blank">
                {example.title}
              </Link>
            </Typography>

            <Typography variant="body2">{example.purpose}</Typography>

            <Chip
              label={
                example.complexity < 3
                  ? "Низкая сложность"
                  : example.complexity < 4
                    ? "Почти низкая сложность"
                    : example.complexity < 7
                      ? "Средняя сложность"
                      : "Высокая сложность"
              }
              className="mt-0 sm:mt-2"
              variant="outlined"
              size="small"
            />
          </div>
        ))}
      </Carousel>

      {examples.map((example) => (
        <div
          key={example.title}
          // rely on `hidden` so that images can stay mounted/don't require reloading when clicking between cards
          className={
            "flex-col min-h-0" + (currentExample.title === example.title ? " flex" : " hidden")
          }
        >
          <Typography variant="body1" className="mt-3">
            {example.notes}
          </Typography>

          {/* Want the parent section to shrink to fit this image if the image is smaller, otherwise */}
          {/* respect the parent's max height and maintain the image aspect ratio. */}
          <div className="mt-1 flex min-h-0 flex-col items-center gap-2 [&_>_img]:size-auto [&_>_img]:max-h-full">
            {example.image}
          </div>

          <Typography variant="body2" className="mt-2">
            Демонстрируется в приложении:{" "}
            <Link href={example.href} target="_blank">
              {example.title}
            </Link>
          </Typography>
        </div>
      ))}
    </div>
  );
};
