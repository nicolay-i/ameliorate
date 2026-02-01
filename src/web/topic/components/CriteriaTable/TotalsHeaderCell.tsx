import { Box, Link, Stack, Typography } from "@mui/material";
import { useState } from "react";

import { HelpIcon } from "@/web/common/components/HelpIcon";
import { IconWithTooltip } from "@/web/common/components/Tooltip/IconWithTooltip";

export const TotalsHeaderCell = () => {
  const [showExactDetails, setShowExactDetails] = useState(false);

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" height="100%">
      <Typography variant="body1">Итоги решений</Typography>
      <IconWithTooltip
        tooltipHeading="Итоги решений"
        iconButtonClassName="p-2"
        icon={<HelpIcon />}
        tooltipBody={
          <Box
            sx={{
              table: { borderCollapse: "collapse" },
              td: { border: "1px solid black", textAlign: "center" },
            }}
          >
            <span>
              Итог решения — это оценка того, насколько хорошее решение. Итог положителен, если
              оценки показывают, что критерии выполняются, и отрицателен, если нет. Оценки
              важности каждого критерия усиливают, насколько положителен или отрицателен итог.
            </span>

            <Link
              component="button"
              className="block p-1"
              onClick={(e) => {
                setShowExactDetails(!showExactDetails);
                e.preventDefault();
              }}
            >
              {!showExactDetails ? "Показать подробности" : "Скрыть подробности"}
            </Link>

            {showExactDetails && (
              <>
                <span>
                  Чтобы отразить, что выполнение может быть хорошим или плохим, оценки выполнения
                  сдвигаются с диапазона 1–9 в диапазон -4–4.
                  <br />
                  Чтобы важность усиливала эти оценки выполнения, важность умножается на оценку
                  выполнения.
                  <br />
                  Чтобы показать, что минимальная важность делает выполнение несущественным, оценки
                  важности сдвигаются с диапазона 1–9 в диапазон 0–8.
                  <br />
                  <br />
                  Итог решения рассчитывается как сумма произведений скорректированной оценки
                  выполнения каждого критерия на скорректированную оценку его важности.
                  <br />
                  <br />
                  Например, в следующей таблице:
                </span>
                <table>
                  <tbody>
                    <tr>
                      <td>проблема: машины едут слишком быстро в районе</td>
                      <td>решение: знак «STOP»</td>
                      <td>решение: знак «Дети на дороге»</td>
                    </tr>
                    <tr>
                      <td>критерий: объясняет, почему нужно снизить скорость (6)</td>
                      <td>1</td>
                      <td>9</td>
                    </tr>
                    <tr>
                      <td>критерий: реально заставляет снижать скорость (8)</td>
                      <td>8</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Итог решения</td>
                      <td>1</td>
                      <td>-8</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <span>
                  итог для «знак STOP» вычисляется так:
                  <br />
                  (1-5) * (6-1) + (8-5) * (8-1) = 1,
                  <br />
                  а для «знак Дети на дороге» так:
                  <br />
                  (9-5) * (6-1) + (1-5) * (8-1) = -8.
                </span>
              </>
            )}
          </Box>
        }
      />
    </Stack>
  );
};
