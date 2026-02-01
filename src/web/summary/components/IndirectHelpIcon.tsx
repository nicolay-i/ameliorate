import { HelpIcon } from "@/web/common/components/HelpIcon";
import { IconWithTooltip } from "@/web/common/components/Tooltip/IconWithTooltip";

export const IndirectHelpIcon = () => (
  <IconWithTooltip
    tooltipHeading="Косвенные узлы"
    tooltipBody="Косвенные узлы связаны с суммарным узлом через другие узлы. Например, при просмотре решения здесь появится выгода, созданная одним из компонентов решения."
    icon={<HelpIcon />}
  />
);
