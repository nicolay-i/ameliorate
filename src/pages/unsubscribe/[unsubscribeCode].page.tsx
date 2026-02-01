import { Typography } from "@mui/material";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { unsubscribe } from "@/api/notifications/subscription";
import { Link } from "@/web/common/components/Link";

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ unsubscribeCode: string }>,
) => {
  const unsubscribed = await unsubscribe(context.params?.unsubscribeCode ?? "");

  return { props: { unsubscribed } };
};

export default function Page({
  unsubscribed,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Seems ok if we say it's expired even if the code was never valid
  const unsubscribeText = unsubscribed
    ? "Вы успешно отписались"
    : "Ссылка для отписки устарела";

  return (
    <>
      <Head>
        <title>Отписка | Ameliorate</title>
        <meta name="description" content="Отписка от уведомлений Ameliorate." />
      </Head>

      <Typography variant="h5" textAlign="center" sx={{ margin: 2 }}>
        {unsubscribeText}. Перейдите на страницу{" "}
        <Link href="/notifications">уведомлений</Link>, чтобы управлять ими.
      </Typography>
    </>
  );
}
