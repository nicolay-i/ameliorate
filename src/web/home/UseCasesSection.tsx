import { Typography } from "@mui/material";

import { Card } from "@/web/home/Card";

export const UseCasesSection = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <Typography variant="h4">Как использовать диаграмму</Typography>
      <Typography variant="body1">
        Когда диаграмма готова, есть несколько способов её применения.
      </Typography>

      <div className="mt-4 flex flex-wrap justify-center gap-2 text-start *:w-full md:*:w-56">
        <Card
          title="Разобраться в собственных мыслях"
          description="Разложите идеи со всеми нюансами, чтобы лучше продумать проблему и принять более точные решения."
        />
        <Card
          title="Собрать обратную связь"
          description="Поделитесь диаграммой и получите вопросы, предложения, опасения и мнения других."
        />
        <Card
          title="Направлять обсуждение"
          description="Используйте диаграмму на встрече, чтобы держать разговор в фокусе и видеть, где возникают разногласия или неопределённость."
        />
        <Card
          title="Быстро ввести в курс"
          description="Покажите диаграмму или дайте людям исследовать её в своём темпе, чтобы быстро понять текущее состояние проблемы или решения."
        />
        <Card
          title="Пересмотреть аргументацию"
          description="Когда появляется новая информация, обновите диаграмму и пересмотрите выводы."
        />
        <Card
          title="Прозрачность решений"
          description="Оставьте оценённую диаграмму после принятого решения как объяснение, почему был выбран именно этот путь."
        />
      </div>
    </div>
  );
};
