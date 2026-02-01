import { zodResolver } from "@hookform/resolvers/zod";
import {
  AutoAwesomeMotion,
  AutoStoriesOutlined,
  Build,
  Close,
  Download,
  EditOff,
  Engineering,
  FilterAltOutlined,
  FormatColorFill,
  Grid4x4,
  Highlight,
  Info,
  Layers,
  PhotoCamera,
  PieChart,
  PowerInput,
  Route,
  SsidChart,
  UnfoldMore,
  Upload,
  WebStories,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { getViewportForBounds } from "@xyflow/react";
import { toPng } from "html-to-image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { hasComments, resetComments } from "@/web/comment/store/commentStore";
import { getDisplayNodes, getNodesBounds } from "@/web/topic/components/Diagram/externalFlowStore";
import { resetDiagramData } from "@/web/topic/diagramStore/utilActions";
import { downloadTopic, uploadTopic } from "@/web/topic/loadStores";
import { defaultFitViewPadding } from "@/web/topic/utils/flowUtils";
import { hotkeys } from "@/web/topic/utils/hotkeys";
import {
  toggleFlashlightMode,
  toggleReadonlyMode,
  toggleUnrestrictedEditing,
  useFlashlightMode,
  useReadonlyMode,
  useUnrestrictedEditing,
} from "@/web/view/actionConfigStore";
import {
  toggleShowImpliedEdges,
  toggleShowProblemCriterionSolutionEdges,
  useShowImpliedEdges,
  useShowProblemCriterionSolutionEdges,
} from "@/web/view/currentViewStore/filter";
import {
  setLayoutThoroughness,
  toggleAvoidEdgeLabelOverlap,
  toggleForceNodesIntoLayers,
  toggleLayerNodeIslandsTogether,
  toggleMinimizeEdgeCrossings,
  useAvoidEdgeLabelOverlap,
  useForceNodesIntoLayers,
  useLayerNodeIslandsTogether,
  useLayoutThoroughness,
  useMinimizeEdgeCrossings,
} from "@/web/view/currentViewStore/layout";
import { resetView, useFormat } from "@/web/view/currentViewStore/store";
import { resetQuickViews } from "@/web/view/quickViewStore/store";
import {
  toggleExpandAddNodeButtons,
  toggleExpandDetailsTabs,
  toggleFillNodeAttachmentWithColor,
  toggleFillNodesWithColor,
  useExpandAddNodeButtons,
  useExpandDetailsTabs,
  useFillNodeAttachmentWithColor,
  useFillNodesWithColor,
} from "@/web/view/userConfigStore";

const ScreenshotFormSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

type ScreenshotFormData = z.infer<typeof ScreenshotFormSchema>;

const defaultResolution = { width: 2560, height: 1440 };

const onScreenshotSubmit = ({ width, height }: ScreenshotFormData) => {
  // these two functions (jankily?) come from our `externalFlowStore` because otherwise we have to
  // be within the react flow provider's react tree in order to access them (via `useReactFlow`).
  const nodes = getDisplayNodes();
  const bounds = getNodesBounds(nodes);

  // thanks react flow example https://reactflow.dev/examples/misc/download-image
  const viewport = getViewportForBounds(bounds, width, height, 0.125, 2, defaultFitViewPadding);
  const viewportElement = document.querySelector(".react-flow__viewport");
  if (!viewportElement) throw new Error("Couldn't find viewport element to screenshot");

  toPng(viewportElement as HTMLElement, {
    backgroundColor: "#fff",
    width,
    height,
    style: {
      width: width.toString(),
      height: height.toString(),
      transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
    },
  })
    .then((dataUrl) => {
      const a = document.createElement("a");
      a.setAttribute("download", "topic.png");
      a.setAttribute("href", dataUrl);
      a.click();
    })
    .catch((error: unknown) => {
      console.error("Failed to export PNG:", error);
    });
};

interface ScreenshotResolutionDialogProps {
  screenshotDialogOpen: boolean;
  setScreenshotDialogOpen: (isOpen: boolean) => void;
}

const ScreenshotResolutionDialog = ({
  screenshotDialogOpen,
  setScreenshotDialogOpen,
}: ScreenshotResolutionDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScreenshotFormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: defaultResolution,
    resolver: zodResolver(ScreenshotFormSchema),
  });

  return (
    <Dialog
      open={screenshotDialogOpen}
      onClose={() => setScreenshotDialogOpen(false)}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            void handleSubmit((data) => {
              onScreenshotSubmit(data);
              setScreenshotDialogOpen(false);
            })(event);
          },
        },
      }}
    >
      <DialogTitle>Задать разрешение снимка</DialogTitle>
      <DialogContent className="flex flex-col">
        <TextField
          label="Ширина"
          type="number"
          margin="dense"
          slotProps={{
            input: { endAdornment: <InputAdornment position="end">px</InputAdornment> },
          }}
          error={!!errors.width}
          helperText={errors.width?.message}
          {...register("width", { valueAsNumber: true })}
        />
        <TextField
          label="Высота"
          type="number"
          margin="dense"
          slotProps={{
            input: { endAdornment: <InputAdornment position="end">px</InputAdornment> },
          }}
          error={!!errors.height}
          helperText={errors.height?.message}
          {...register("height", { valueAsNumber: true })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setScreenshotDialogOpen(false)} color="inherit">
          Отмена
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Скачать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface Props {
  isMoreActionsDrawerOpen: boolean;
  setIsMoreActionsDrawerOpen: (isOpen: boolean) => void;
  sessionUser?: { username: string } | null;
  userCanEditTopicData: boolean;
}

export const MoreActionsDrawer = ({
  isMoreActionsDrawerOpen,
  setIsMoreActionsDrawerOpen,
  sessionUser,
  userCanEditTopicData,
}: Props) => {
  const format = useFormat();
  const isTableActive = format === "table";

  const unrestrictedEditing = useUnrestrictedEditing();
  const flashlightMode = useFlashlightMode();
  const readonlyMode = useReadonlyMode();

  const showImpliedEdges = useShowImpliedEdges();
  const showProblemCriterionSolutionEdges = useShowProblemCriterionSolutionEdges();

  const forceNodesIntoLayers = useForceNodesIntoLayers();
  const layerNodeIslandsTogether = useLayerNodeIslandsTogether();
  const minimizeEdgeCrossings = useMinimizeEdgeCrossings();
  const avoidEdgeLabelOverlap = useAvoidEdgeLabelOverlap();
  const layoutThoroughness = useLayoutThoroughness();

  const fillNodesWithColor = useFillNodesWithColor();
  const fillNodeAttachmentWithColor = useFillNodeAttachmentWithColor();
  const expandDetailsTabs = useExpandDetailsTabs();
  const expandAddNodeButtons = useExpandAddNodeButtons();

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [screenshotDialogOpen, setScreenshotDialogOpen] = useState(false);

  const resetDialog = (
    <Dialog
      open={resetDialogOpen}
      onClose={() => setResetDialogOpen(false)}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">Сбросить тему</DialogTitle>
      <DialogContent>
        <DialogContentText>
          В этой теме есть комментарии, которые будут удалены, и их нельзя будет восстановить через
          отмену. Продолжить сброс?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={() => setResetDialogOpen(false)}>
          Отмена
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            setResetDialogOpen(false);
            resetComments();
            resetDiagramData();
            resetQuickViews();
          }}
        >
          Сбросить тему
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Drawer
      anchor="left"
      open={isMoreActionsDrawerOpen}
      onClose={() => setIsMoreActionsDrawerOpen(false)}
    >
      <List>
        <ListItem
          disablePadding={false}
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="закрыть"
              onClick={() => setIsMoreActionsDrawerOpen(false)}
            >
              <Close />
            </IconButton>
          }
        >
          <ListItemIcon>
            <Build />
          </ListItemIcon>
          <ListItemText primary="Другие действия" />
        </ListItem>

        <Divider>Действия</Divider>

        <ListItem disablePadding={false}>
          <IconButton
            color="inherit"
            title="Скачать"
            aria-label="Скачать"
            onClick={downloadTopic}
          >
            <Download />
          </IconButton>

          {userCanEditTopicData && (
            <>
              <IconButton color="inherit" component="label" title="Загрузить" aria-label="Загрузить">
                <Upload />
                <input
                  hidden
                  accept=".json"
                  type="file"
                  onChange={(event) => void uploadTopic(event, sessionUser?.username)}
                />
              </IconButton>
              <IconButton
                color="inherit"
                title="Сбросить тему"
                aria-label="Сбросить тему"
                onClick={() => {
                  if (hasComments()) {
                    setResetDialogOpen(true);
                  } else {
                    resetDiagramData();
                    resetQuickViews();
                  }
                  // intentionally not resetting comments/drafts, since undoing a reset would be painful if comments were lost,
                  // and it's annoying to try and put these all on the same undo/redo button.
                  // if orphaned comments are really a problem, we should be able to manually clean them up.
                  // if they're routinely a problem, we can consider trying to combining comments/drafts in the same undo/redo stack for this.
                }}
              >
                <AutoStoriesOutlined />
              </IconButton>
              {resetDialogOpen ? resetDialog : <></>}
            </>
          )}

          <IconButton
            color="inherit"
            title="Сбросить фильтры"
            aria-label="Сбросить фильтры"
            onClick={() => resetView(true)}
          >
            <FilterAltOutlined />
          </IconButton>

          {!isTableActive && (
            <IconButton
              color="inherit"
              title="Скачать снимок диаграммы"
              onClick={() => setScreenshotDialogOpen(true)}
            >
              <PhotoCamera />
            </IconButton>
          )}
        </ListItem>

        {!isTableActive && (
          <>
            <Divider>Настройки действий</Divider>

            <ListItem disablePadding={false}>
              {userCanEditTopicData && (
                <>
                  <ToggleButton
                    value={unrestrictedEditing}
                    title="Снять ограничения редактирования"
                    aria-label="Снять ограничения редактирования"
                    color="primary"
                    size="small"
                    selected={unrestrictedEditing}
                    onClick={() => toggleUnrestrictedEditing(!unrestrictedEditing)}
                    sx={{ borderRadius: "50%", border: "0" }}
                  >
                    <Engineering />
                  </ToggleButton>
                </>
              )}
              <ToggleButton
                value={flashlightMode}
                title="Режим фонарика"
                aria-label="Режим фонарика"
                color="primary"
                size="small"
                selected={flashlightMode}
                onClick={() => toggleFlashlightMode(!flashlightMode)}
                sx={{ borderRadius: "50%", border: "0" }}
              >
                <Highlight />
              </ToggleButton>
              {userCanEditTopicData && (
                <>
                  <ToggleButton
                    value={readonlyMode}
                    title={`Режим только чтения (${hotkeys.readonlyMode})`}
                    aria-label={`Режим только чтения (${hotkeys.readonlyMode})`}
                    color="primary"
                    size="small"
                    selected={readonlyMode}
                    onClick={() => toggleReadonlyMode()}
                    sx={{ borderRadius: "50%", border: "0" }}
                  >
                    <EditOff />
                  </ToggleButton>
                </>
              )}
            </ListItem>
          </>
        )}

        {!isTableActive && (
          <>
            <Divider>Настройки раскладки</Divider>

            <ListItem disablePadding={false}>
              <ToggleButton
                value={forceNodesIntoLayers}
                title="Принудительно раскладывать по слоям"
                aria-label="Принудительно раскладывать по слоям"
                color="primary"
                size="small"
                selected={forceNodesIntoLayers}
                onClick={() => toggleForceNodesIntoLayers(!forceNodesIntoLayers)}
                sx={{ borderRadius: "50%", border: "0" }}
              >
                <Layers />
              </ToggleButton>
              <ToggleButton
                value={layerNodeIslandsTogether}
                title="Собирать островки узлов в слои"
                aria-label="Собирать островки узлов в слои"
                color="primary"
                size="small"
                selected={layerNodeIslandsTogether}
                onClick={() => toggleLayerNodeIslandsTogether(!layerNodeIslandsTogether)}
                sx={{ borderRadius: "50%", border: "0" }}
              >
                <PowerInput />
              </ToggleButton>
              <ToggleButton
                value={minimizeEdgeCrossings}
                title="Минимизировать пересечения связей"
                aria-label="Минимизировать пересечения связей"
                color="primary"
                size="small"
                selected={minimizeEdgeCrossings}
                onClick={() => toggleMinimizeEdgeCrossings(!minimizeEdgeCrossings)}
                sx={{ borderRadius: "50%", border: "0" }}
              >
                <SsidChart />
              </ToggleButton>
              <ToggleButton
                value={avoidEdgeLabelOverlap}
                title="Избегать наложения подписей связей"
                aria-label="Избегать наложения подписей связей"
                color="primary"
                size="small"
                selected={avoidEdgeLabelOverlap}
                onClick={() => toggleAvoidEdgeLabelOverlap(!avoidEdgeLabelOverlap)}
                sx={{ borderRadius: "50%", border: "0" }}
              >
                <AutoAwesomeMotion />
              </ToggleButton>
            </ListItem>

            <ListItem disablePadding={false}>
              <Typography variant="body2">Тщательность</Typography>
              <Tooltip
                title="Определяет, сколько усилий алгоритм раскладки тратит на эффективное использование пространства. Низкая = минимум усилий, Высокая = максимум."
                enterTouchDelay={0} // Trigger immediately on touch
                leaveTouchDelay={Infinity} // touch-away to close on mobile, since message is long
              >
                <IconButton
                  color="info"
                  aria-label="Информация о тщательности"
                  sx={{
                    // Don't make it look like clicking will do something, since it won't.
                    // Using a button here is an attempt to make it accessible, since the tooltip will show
                    // on focus.
                    cursor: "default",
                    alignSelf: "center",
                  }}
                >
                  <Info />
                </IconButton>
              </Tooltip>
              <Select
                value={layoutThoroughness}
                onChange={(event) => setLayoutThoroughness(event.target.value)}
                fullWidth // Use fullWidth for proper alignment
                size="small" // Smaller size for better fit
              >
                <MenuItem value={1}>Низкая</MenuItem>
                <MenuItem value={10}>Средняя</MenuItem>
                <MenuItem value={100}>Высокая</MenuItem>
              </Select>
            </ListItem>

            <Divider>Настройки фильтров</Divider>

            <ListItem disablePadding={false}>
              <ToggleButton
                value={showImpliedEdges}
                title="Показывать подразумеваемые связи"
                aria-label="Показывать подразумеваемые связи"
                color="primary"
                size="small"
                selected={showImpliedEdges}
                onClick={() => toggleShowImpliedEdges(!showImpliedEdges)}
                sx={{ borderRadius: "50%", border: "0" }}
              >
                <Route />
              </ToggleButton>
              <ToggleButton
                value={showProblemCriterionSolutionEdges}
                title="Показывать связи между проблемами, критериями и решениями"
                aria-label="Показывать связи между проблемами, критериями и решениями"
                color="primary"
                size="small"
                selected={showProblemCriterionSolutionEdges}
                onClick={() =>
                  toggleShowProblemCriterionSolutionEdges(!showProblemCriterionSolutionEdges)
                }
                sx={{ borderRadius: "50%", border: "0" }}
              >
                <Grid4x4 />
              </ToggleButton>
            </ListItem>
          </>
        )}

        <Divider>Пользовательские настройки</Divider>

        <ListItem disablePadding={false}>
          <ToggleButton
            value={fillNodesWithColor}
            title="Заполнять узлы цветом"
            aria-label="Заполнять узлы цветом"
            color="primary"
            size="small"
            selected={fillNodesWithColor}
            onClick={() => toggleFillNodesWithColor(!fillNodesWithColor)}
            sx={{ borderRadius: "50%", border: "0" }}
          >
            <FormatColorFill />
          </ToggleButton>
          <ToggleButton
            value={fillNodeAttachmentWithColor}
            title="Заполнять крепления узлов цветом"
            aria-label="Заполнять крепления узлов цветом"
            color="primary"
            size="small"
            selected={fillNodeAttachmentWithColor}
            onClick={() => toggleFillNodeAttachmentWithColor(!fillNodeAttachmentWithColor)}
            sx={{ borderRadius: "50%", border: "0" }}
          >
            <PieChart />
          </ToggleButton>
          <ToggleButton
            value={expandDetailsTabs}
            title="Разворачивать вкладки деталей"
            aria-label="Разворачивать вкладки деталей"
            color="primary"
            size="small"
            selected={expandDetailsTabs}
            onClick={() => toggleExpandDetailsTabs()}
            sx={{ borderRadius: "50%", border: "0" }}
          >
            <UnfoldMore />
          </ToggleButton>
          <ToggleButton
            value={expandAddNodeButtons}
            title="Разворачивать кнопки добавления узлов"
            aria-label="Разворачивать кнопки добавления узлов"
            color="primary"
            size="small"
            selected={expandAddNodeButtons}
            onClick={() => toggleExpandAddNodeButtons()}
            sx={{ borderRadius: "50%", border: "0" }}
          >
            <WebStories />
          </ToggleButton>
        </ListItem>
      </List>

      <ScreenshotResolutionDialog
        screenshotDialogOpen={screenshotDialogOpen}
        setScreenshotDialogOpen={setScreenshotDialogOpen}
      />
    </Drawer>
  );
};
