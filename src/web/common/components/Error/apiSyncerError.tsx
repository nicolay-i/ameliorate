import { Divider } from "@mui/material";

export const buildApiSyncerError = (changeLists: Record<string, object[]>, error: unknown) => {
  return (
    <span>
      <b>Не удалось сохранить изменения.</b>
      <br />
      Обновите страницу и попробуйте внести изменения снова, или скачайте тему с изменениями и
      загрузите её обратно после обновления страницы.
      {error instanceof Error && (
        <>
          <Divider className="my-2" />

          <b>Детали ошибки (возможно, не помогут):</b>
          <br />
          {error.message}
        </>
      )}
      <Divider className="my-2" />
      <b>Изменения, которые не удалось сохранить:</b>
      <pre>
        {JSON.stringify(
          Object.entries(changeLists).filter(([_, changes]) => changes.length > 0),
          null,
          2,
        )}
      </pre>
      <br />
    </span>
  );
};
