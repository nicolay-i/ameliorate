import { Link as MuiLink, Typography } from "@mui/material";

import { Link } from "@/web/common/components/Link";
import { SubscribeForm } from "@/web/common/components/SubscribeForm/SubscribeForm";
import { blogPage, discourseSessionsPage } from "@/web/common/urls";

export const ImprovingSection = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex flex-col items-center">
        <Typography variant="h4">Ameliorate постоянно развивается</Typography>
        <Typography variant="body1">
          и будет рад вашей{" "}
          <Link
            href="https://github.com/amelioro/ameliorate/blob/main/CONTRIBUTING.md#providing-feedback"
            target="_blank"
          >
            обратной связи
          </Link>
          ! Посмотрите, что готовится в{" "}
          <Link href="https://github.com/orgs/amelioro/projects/2/views/1" target="_blank">
            бэклоге
          </Link>
          .
        </Typography>
      </div>

      <div className="flex flex-wrap justify-center gap-1">
        <SubscribeForm
          header="Получать обновления"
          headerAnchor={
            <MuiLink href={blogPage} target="_blank">
              (блог)
            </MuiLink>
          }
          action="https://amelioro.substack.com/api/v1/free"
          buttonText="Подписаться"
        />

        <SubscribeForm
          header="Получить приглашение на будущие"
          headerAnchor={
            <MuiLink href={discourseSessionsPage} target="_blank">
              дискуссионные сессии
            </MuiLink>
          }
          action="https://buttondown.email/api/emails/embed-subscribe/ameliorate-discourse"
          buttonText="Пригласите меня"
        />
      </div>
    </div>
  );
};
