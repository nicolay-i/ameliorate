import { prettyNodeTypes } from "@/common/node";
import { relationLabels } from "@/web/topic/utils/edge";
import { useEdgeNodes } from "@/web/topic/diagramStore/edgeHooks";
import { GraphPart, isNode as checkIsNode } from "@/web/topic/utils/graph";

/**
 * Note: this claim text also exists in `getImplicitLabel`, but we want to apply italics/bold html
 * formatting here, so it doesn't seem easy to reuse the text.
 */
export const ImpliedClaimText = ({ graphPart }: { graphPart: GraphPart }) => {
  const [edgeSourceNode, edgeTargetNode] = useEdgeNodes(graphPart.id);

  const isNode = checkIsNode(graphPart);

  if (isNode) {
    return (
      <i>
        "{graphPart.data.label}" — <b>важный {prettyNodeTypes[graphPart.type]}</b> в этой теме
      </i>
    );
  } else {
    if (!edgeSourceNode || !edgeTargetNode) throw new Error("Edge nodes not found");

    return (
      <i>
        <b>{prettyNodeTypes[edgeSourceNode.type]}</b> "{edgeSourceNode.data.label}"{" "}
        <b>
          {graphPart.data.customLabel ?? relationLabels[graphPart.label]}{" "}
          {prettyNodeTypes[edgeTargetNode.type]}
        </b>{" "}
        "{edgeTargetNode.data.label}"
      </i>
    );
  }
};
