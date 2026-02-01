import { capitalize } from "es-toolkit";
import { startCase } from "es-toolkit/compat";

/**
 * Separate file for this const because Workspace and steps both need to reference it, and want to
 * avoid circular dependencies.
 */
export const tutorialDefaultAnchorClass = "tutorial-anchor";

export const detailsPaneSelector = `div[id^="pane-"]:has(button[id$="-Details"])`;
export const viewsPaneSelector = `div[id^="pane-"]:has(button[id$="-Views"])`;
export const quickViewDropdownSelector = `#quick-view-select`;

export type Tutorial =
  | "welcome"

  // builders
  | "diagramBasics"
  | "breakingDownAProblem"
  | "addingNuance"
  | "evaluatingTradeoffs"
  | "buildingViews"

  // viewers
  | "readingADiagram"
  | "navigatingATopic"

  // experts
  | "moreActions"
  | "advancedFiltering";

export type Track = "builders" | "diagramViewers" | "tableViewers" | "experts";

// TODO?: could refactor so that things like `startTutorial` calculate the step based on the track,
// but doesn't seem like worth the effort to implement that right now.
export const tracks: Record<Track, Tutorial[]> = {
  builders: [
    "diagramBasics",
    "breakingDownAProblem",
    "addingNuance",
    "evaluatingTradeoffs",
    "buildingViews",
  ],
  diagramViewers: ["readingADiagram", "navigatingATopic"],
  tableViewers: ["evaluatingTradeoffs", "navigatingATopic"],
  experts: ["moreActions", "advancedFiltering"],
};

export const getStepHeader = (tutorial: Tutorial | null, track: Track | null) => {
  if (tutorial === "welcome") return ""; // there's only one step in the welcome tutorial and its title would be duplicate of the tutorial header

  const tutorialLabels: Record<Tutorial, string> = {
    welcome: "Добро пожаловать",
    diagramBasics: "Основы диаграмм",
    breakingDownAProblem: "Декомпозиция проблемы",
    addingNuance: "Добавление нюансов",
    evaluatingTradeoffs: "Оценка компромиссов",
    buildingViews: "Создание видов",
    readingADiagram: "Чтение диаграммы",
    navigatingATopic: "Навигация по теме",
    moreActions: "Другие действия",
    advancedFiltering: "Расширенные фильтры",
  };

  const sentenceCaseTutorial = tutorial ? tutorialLabels[tutorial] : capitalize(startCase(undefined));

  if (tutorial && track) {
    const prettyTrack =
      track === "builders"
        ? "СОЗДАТЕЛИ"
        : track === "diagramViewers"
          ? "ПРОСМОТР ДИАГРАММ"
          : track === "tableViewers"
            ? "ПРОСМОТР ТАБЛИЦ"
            : "ЭКСПЕРТЫ";
    const stepNumber = tracks[track].indexOf(tutorial) + 1;
    const totalSteps = tracks[track].length;

    return `${prettyTrack} > ${sentenceCaseTutorial} (${stepNumber}/${totalSteps})`;
  } else {
    return sentenceCaseTutorial;
  }
};
