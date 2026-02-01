import { ContextMenuItem } from "@/web/common/components/ContextMenu/CloseOnClickMenuItem";
import { Node } from "@/web/topic/utils/graph";
import { viewCriteriaTable } from "@/web/view/currentViewStore/filter";

export const ViewTableMenuItem = ({ node }: { node: Node }) => {
  return (
    <ContextMenuItem onClick={() => viewCriteriaTable(node.id)}>
      Показать таблицу критериев
    </ContextMenuItem>
  );
};
