import { Typography } from "@mui/material";

import { NavLink } from "@/web/common/components/NavLink";
import {
  blogPage,
  contributingPage,
  discordInvite,
  discourseSessionsPage,
  docsPage,
  facebookPage,
  feedbackPage,
  gettingStartedPage,
  githubRepo,
  youtubeChannel,
} from "@/web/common/urls";

export const Footer = () => {
  return (
    <div className="flex flex-wrap justify-evenly gap-4 [&_a]:text-sm">
      <div className="flex flex-col">
        <Typography variant="h6">Ameliorate</Typography>
        <NavLink href={docsPage} target="_blank">
          Документация
        </NavLink>
        <NavLink href={gettingStartedPage} target="_blank">
          Быстрый старт
        </NavLink>
        <NavLink href="/examples" target="_blank">
          Примеры
        </NavLink>
        <NavLink href="https://ameliorate.app/docs/mission-vision" target="_blank">
          Миссия и видение
        </NavLink>
        <NavLink href="https://ameliorate.app/docs/release-status" target="_blank">
          Статус релиза
        </NavLink>
      </div>

      <div className="flex flex-col">
        <Typography variant="h6">Сообщество</Typography>
        <NavLink href={blogPage} target="_blank">
          Блог
        </NavLink>
        <NavLink href={githubRepo} target="_blank">
          GitHub
        </NavLink>
        <NavLink href={discordInvite} target="_blank">
          Discord
        </NavLink>
        <NavLink href={youtubeChannel} target="_blank">
          YouTube
        </NavLink>
        <NavLink href={facebookPage} target="_blank">
          Facebook
        </NavLink>
      </div>

      <div className="flex flex-col">
        <Typography variant="h6">Участие</Typography>
        <NavLink href={feedbackPage} target="_blank">
          Обратная связь
        </NavLink>
        <NavLink href={discourseSessionsPage} target="_blank">
          Дискуссионные сессии
        </NavLink>
        <NavLink href={contributingPage} target="_blank">
          Вклад в проект
        </NavLink>
      </div>
    </div>
  );
};
