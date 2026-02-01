import { ContextMenuItem } from "@/web/common/components/ContextMenu/CloseOnClickMenuItem";
import { Node } from "@/web/topic/utils/graph";
import { showNodeAndNeighbors } from "@/web/view/currentViewStore/filter";

export const OnlyShowNodeAndNeighborsMenuItem = ({ node }: { node: Node }) => {
  return (
    <ContextMenuItem onClick={() => showNodeAndNeighbors(node.id, false)}>
      Показать только узел и его соседей
    </ContextMenuItem>
  );
};
