import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link, Tab, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

type Tab = "views" | "disagree" | "tradeoffs" | "flashlight";

const copy = {
  views: {
    title: "Фокус на разных аспектах",
    description: "Создавайте виды, чтобы выделить нужные части диаграммы.",
    content: (
      <div>
        <Image
          src="https://github.com/user-attachments/assets/87055acd-debb-45f2-981f-ef511e770222"
          alt="переключение между видами в теме cars-going-too-fast"
          width={1096}
          height={847}
          unoptimized // warning without this - gifs aren't optimized by nextjs apparently
          // extra padding & bg because spacing seems to look better
          className="rounded-xl border bg-paperPlain-main p-2 shadow-sm"
        />
        <Typography variant="caption">
          Тема:{" "}
          <Link href="https://ameliorate.app/examples/detailed-cars-going-too-fast" target="_blank">
            cars-going-too-fast
          </Link>
        </Typography>
      </div>
    ),
  },
  disagree: {
    title: "Быстро находите разногласия",
    description: "Сравнивайте оценки, чтобы понять, где ваши мнения расходятся.",
    content: (
      <div>
        <Image
          src="https://github.com/user-attachments/assets/c1c9043a-4a0f-4af6-a309-ab3574301054"
          alt="сравнение оценок в теме cars-going-too-fast"
          width={756}
          height={703}
          unoptimized // warning without this - gifs aren't optimized by nextjs apparently
          className="rounded-xl border shadow-sm"
        />
        <Typography variant="caption">
          Тема:{" "}
          <Link href="https://ameliorate.app/examples/detailed-cars-going-too-fast" target="_blank">
            cars-going-too-fast
          </Link>
        </Typography>
      </div>
    ),
  },
  tradeoffs: {
    title: "Сводите компромиссы между решениями",
    description:
      "Покажите, насколько важен каждый компромисс и насколько хорошо каждое решение ему соответствует.",
    content: (
      <div>
        <Image
          src="https://github.com/user-attachments/assets/60ac157d-03f7-4fa5-907b-b8e3abab0e7a"
          alt="таблицы критериев для cars-going-too-fast"
          width={727}
          height={455}
          unoptimized
          // extra padding & bg because spacing seems to look better
          className="rounded-xl border bg-paperPlain-main p-3 shadow-sm"
        />
        <Typography variant="caption">
          Тема:{" "}
          <Link
            href="https://ameliorate.app/examples/detailed-cars-going-too-fast?view=Tradeoff+table"
            target="_blank"
          >
            cars-going-too-fast
          </Link>
        </Typography>
      </div>
    ),
  },
  flashlight: {
    title: "Осматривайте сложные диаграммы",
    description: "Используйте режим фонарика, чтобы легко исследовать большие диаграммы.",
    content: (
      <div>
        <Image
          src="https://github.com/user-attachments/assets/98d75b2b-6ca4-41cd-9322-314c75126232"
          alt="режим фонарика в теме brutality-sugar"
          width={1022}
          height={728}
          unoptimized // warning without this - gifs aren't optimized by nextjs apparently
          className="rounded-xl border shadow-sm"
        />
        <Typography variant="caption">
          Тема:{" "}
          <Link href="https://ameliorate.app/keyserj/brutality-sugar-article" target="_blank">
            brutality-sugar-article
          </Link>
        </Typography>
      </div>
    ),
  },
};

export const FeaturesSection = () => {
  const [selectedCard, setSelectedCard] = useState<Tab>("views");

  return (
    <div className="flex flex-col text-center">
      <Typography variant="h4">Основные возможности</Typography>

      <TabContext value={selectedCard}>
        <TabList onChange={(_, value: Tab) => setSelectedCard(value)} variant="fullWidth">
          <Tab label={copy.views.title} value="views" wrapped />
          <Tab label={copy.disagree.title} value="disagree" wrapped />
          <Tab label={copy.tradeoffs.title} value="tradeoffs" wrapped />
          <Tab label={copy.flashlight.title} value="flashlight" wrapped />
        </TabList>

        <TabPanel
          key="views"
          value="views"
          keepMounted
          classes={{ root: "p-0 flex flex-col items-center gap-2" }}
        >
          <Typography variant="body1" className="pt-3">
            {copy.views.description}
          </Typography>
          {copy.views.content}
        </TabPanel>

        <TabPanel
          key="disagree"
          value="disagree"
          keepMounted
          classes={{ root: "p-0 flex flex-col items-center gap-2" }}
        >
          <Typography variant="body1" className="pt-3">
            {copy.disagree.description}
          </Typography>
          {copy.disagree.content}
        </TabPanel>

        <TabPanel
          key="tradeoffs"
          value="tradeoffs"
          keepMounted
          classes={{ root: "p-0 flex flex-col items-center gap-2" }}
        >
          <Typography variant="body1" className="pt-3">
            {copy.tradeoffs.description}
          </Typography>
          {copy.tradeoffs.content}
        </TabPanel>

        <TabPanel
          key="flashlight"
          value="flashlight"
          keepMounted
          classes={{ root: "p-0 flex flex-col items-center gap-2" }}
        >
          <Typography variant="body1" className="pt-3">
            {copy.flashlight.description}
          </Typography>
          {copy.flashlight.content}
        </TabPanel>
      </TabContext>
    </div>
  );
};
