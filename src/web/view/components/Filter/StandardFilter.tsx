import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { InfoCategory } from "@/common/infoCategory";
import { deepIsEqual } from "@/common/utils";
import { FormContext } from "@/web/common/components/Form/FormContext";
import { NodeSelect } from "@/web/common/components/Form/NodeSelect";
import { NumberInput } from "@/web/common/components/Form/NumberInput";
import { Select } from "@/web/common/components/Form/Select";
import { useCriteria, useNodesOfType, useSolutions } from "@/web/topic/diagramStore/nodeHooks";
import {
  getStandardFilterWithFallbacks,
  setStandardFilter,
} from "@/web/view/currentViewStore/filter";
import {
  StandardFilter as StandardFilterData,
  infoStandardFilterTypes,
  problemDetails,
  standardFilterSchema,
  standardFilterSchemasByType,
} from "@/web/view/utils/infoFilter";

const problemDetailLabels: Record<(typeof problemDetails)[number], string> = {
  causes: "Причины",
  effects: "Эффекты",
  subproblems: "Подпроблемы",
  criteria: "Критерии",
  solutions: "Решения",
};

const problemDetailsOptions = problemDetails.map((detail) => ({
  id: detail,
  label: problemDetailLabels[detail],
}));

const filterTypeLabels: Record<(typeof infoStandardFilterTypes)[InfoCategory][number], string> = {
  none: "Нет",
  highLevel: "Высокоуровневый",
  problem: "Проблема",
  tradeoffs: "Компромиссы",
  solution: "Решение",
  question: "Вопрос",
  source: "Источник",
  rootClaim: "Корневое утверждение",
};

const detailTypeLabels: Record<"all" | "connectedToCriteria" | "none", string> = {
  all: "Все",
  connectedToCriteria: "Связанные с критериями",
  none: "Не показывать",
};

interface Props {
  infoCategory: InfoCategory;
  filter: StandardFilterData;
}

/**
 * Features:
 * - Reuses field values across filters (e.g. central problem retains value when switching filter type)
 * - Defaults field values based on nodes that exist in the diagram
 * - Shows field components and validates based on filter type
 */
export const StandardFilter = ({ infoCategory, filter }: Props) => {
  const filterWithFallbacks = getStandardFilterWithFallbacks(filter);

  const methods = useForm<StandardFilterData>({
    resolver: zodResolver(standardFilterSchema),
    defaultValues: filterWithFallbacks,
  });
  const { getValues, handleSubmit, reset, watch } = methods;

  const filterTypes = infoStandardFilterTypes[infoCategory];
  const filterTypeOptions = filterTypes.map((type) => ({
    id: type,
    label: filterTypeLabels[type],
  }));

  const type = watch("type");
  const typeSchemaShape = standardFilterSchemasByType[type].shape;

  const useProblems = () => useNodesOfType("problem");
  const useQuestions = () => useNodesOfType("question");
  const useSources = () => useNodesOfType("source");
  const useRootClaims = () => useNodesOfType("rootClaim");

  const centralProblemId = watch("centralProblemId");
  const useProblemSolutions = () => useSolutions(centralProblemId);
  const useProblemCriteria = () => useCriteria(centralProblemId);

  const submit = useCallback(() => {
    void handleSubmit((data) => setStandardFilter(infoCategory, data))();
  }, [handleSubmit, infoCategory]);

  // update form when filter changes externally e.g. via undo/redo
  useEffect(() => {
    if (deepIsEqual(filterWithFallbacks, getValues())) return;
    reset(filterWithFallbacks);
  }, [filterWithFallbacks, getValues, reset]);

  return (
    // FormProvider is used to enable useController in extracted form components without passing `control`
    <FormProvider {...methods}>
      <FormContext.Provider value={{ submit }}>
        <form style={{ padding: "8px" }}>
          <Stack spacing={1.5}>
            <Select name="type" label="Стандартный фильтр" options={filterTypeOptions} />

            {"layersDeep" in typeSchemaShape && <NumberInput name="layersDeep" min={0} max={10} />}

            {"centralProblemId" in typeSchemaShape && (
              <NodeSelect
                name="centralProblemId"
                label="Центральная проблема"
                useNodeOptions={useProblems}
              />
            )}

            {"problemDetails" in typeSchemaShape && (
              <Select name="problemDetails" options={problemDetailsOptions} multiple />
            )}

            {"centralSolutionId" in typeSchemaShape && (
              <NodeSelect
                name="centralSolutionId"
                label="Центральное решение"
                useNodeOptions={useSolutions}
              />
            )}
            {"solutionDetail" in typeSchemaShape && (
              <Select
                name="solutionDetail"
                options={typeSchemaShape.solutionDetail.options.map((option) => ({
                  id: option,
                  label: detailTypeLabels[option],
                }))}
              />
            )}
            {"solutions" in typeSchemaShape && (
              <NodeSelect
                name="solutions"
                label="Решения"
                useNodeOptions={useProblemSolutions}
                multiple
              />
            )}
            {"criteria" in typeSchemaShape && (
              <NodeSelect
                name="criteria"
                label="Критерии"
                useNodeOptions={useProblemCriteria}
                multiple
              />
            )}
            {"centralQuestionId" in typeSchemaShape && (
              <NodeSelect
                name="centralQuestionId"
                label="Центральный вопрос"
                useNodeOptions={useQuestions}
              />
            )}
            {"centralSourceId" in typeSchemaShape && (
              <NodeSelect
                name="centralSourceId"
                label="Центральный источник"
                useNodeOptions={useSources}
              />
            )}
            {"centralRootClaimId" in typeSchemaShape && (
              <NodeSelect
                name="centralRootClaimId"
                label="Центральное корневое утверждение"
                useNodeOptions={useRootClaims}
              />
            )}
          </Stack>
        </form>
      </FormContext.Provider>
    </FormProvider>
  );
};
