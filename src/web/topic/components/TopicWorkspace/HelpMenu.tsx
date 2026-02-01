import {
  AccountBalance,
  Campaign,
  Carpenter,
  Handyman,
  LocalLibrary,
  MenuBook,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Divider, MenuItem, MenuItemProps, Tab } from "@mui/material";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

import { CloseOnClickMenuItem } from "@/web/common/components/ContextMenu/CloseOnClickMenuItem";
import { Menu } from "@/web/common/components/Menu/Menu";
import { useSessionUser } from "@/web/common/hooks";
import { docsPage, feedbackPage } from "@/web/common/urls";
import { useUserCanEditTopicData } from "@/web/topic/topicStore/store";
import { startTutorial } from "@/web/tutorial/tutorial";
import { useTutorialProgress } from "@/web/tutorial/tutorialStore";
import { Tutorial } from "@/web/tutorial/tutorialUtils";

type TutorialTab = "Builders" | "Viewers" | "Experts";

interface Props {
  helpAnchorEl: HTMLElement | null;
  setHelpAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
}

export const HelpMenu = ({ helpAnchorEl, setHelpAnchorEl }: Props) => {
  const { sessionUser } = useSessionUser();
  const userCanEditTopicData = useUserCanEditTopicData(sessionUser?.username);

  const { startedTutorials, completedTutorials } = useTutorialProgress();

  const [selectedTab, setSelectedTab] = useState<TutorialTab>(
    userCanEditTopicData ? "Builders" : "Viewers",
  );

  const helpMenuOpen = Boolean(helpAnchorEl);
  if (!helpMenuOpen) return;

  const TutorialMenuItem = (props: MenuItemProps) => {
    return <CloseOnClickMenuItem {...props} closeMenu={() => setHelpAnchorEl(null)} />;
  };

  const getProgressIcon = (tutorial: Tutorial) => {
    if (completedTutorials.includes(tutorial)) {
      return "✅";
    } else if (startedTutorials.includes(tutorial)) {
      return "🟧";
    }

    return "⬜";
  };

  return (
    <Menu
      className="[&_>_ul_>_*]:gap-x-2"
      anchorEl={helpAnchorEl}
      open={helpMenuOpen}
      onClose={() => setHelpAnchorEl(null)}
      openDirection="top"
    >
      <Divider>Помощь</Divider>

      <MenuItem component={Link} href={docsPage} target="_blank">
        <MenuBook />
        Документация
      </MenuItem>
      <MenuItem component={Link} href="/#examples" target="_blank">
        <AccountBalance />
        Примеры
      </MenuItem>
      <MenuItem component={Link} href={feedbackPage} target="_blank">
        <Campaign />
        Оставить отзыв
      </MenuItem>

      <Divider>Обучение</Divider>

      <TabContext value={selectedTab}>
        <TabList
          onChange={(_, value: TutorialTab) => setSelectedTab(value)}
          centered
          className="px-2"
        >
          <Tab icon={<Carpenter />} label="Создатели" value="Builders" />
          <Tab icon={<LocalLibrary />} label="Просмотр" value="Viewers" />
          <Tab icon={<Handyman />} label="Эксперты" value="Experts" />
        </TabList>

        <TabPanel value="Builders" classes={{ root: "p-2" }}>
          <TutorialMenuItem onClick={() => startTutorial("diagramBasics", "builders")}>
            {getProgressIcon("diagramBasics")} 1. Основы диаграмм
          </TutorialMenuItem>
          <TutorialMenuItem onClick={() => startTutorial("breakingDownAProblem", "builders")}>
            {getProgressIcon("breakingDownAProblem")} 2. Декомпозиция проблемы
          </TutorialMenuItem>
          <TutorialMenuItem onClick={() => startTutorial("addingNuance", "builders")}>
            {getProgressIcon("addingNuance")} 3. Добавление нюансов
          </TutorialMenuItem>
          <TutorialMenuItem onClick={() => startTutorial("evaluatingTradeoffs", "builders")}>
            {getProgressIcon("evaluatingTradeoffs")} 4. Оценка компромиссов
          </TutorialMenuItem>
          <TutorialMenuItem onClick={() => startTutorial("buildingViews", "builders")}>
            {getProgressIcon("buildingViews")} 5. Создание видов
          </TutorialMenuItem>
        </TabPanel>

        <TabPanel value="Viewers" classes={{ root: "p-2" }}>
          <TutorialMenuItem onClick={() => startTutorial("readingADiagram", "diagramViewers")}>
            {getProgressIcon("readingADiagram")} 1a. Чтение диаграммы
          </TutorialMenuItem>
          <TutorialMenuItem onClick={() => startTutorial("evaluatingTradeoffs", "tableViewers")}>
            {getProgressIcon("evaluatingTradeoffs")} 1b. Оценка компромиссов
          </TutorialMenuItem>
          <TutorialMenuItem onClick={() => startTutorial("navigatingATopic", "diagramViewers")}>
            {getProgressIcon("navigatingATopic")} 2. Навигация по теме
          </TutorialMenuItem>
        </TabPanel>

        <TabPanel value="Experts" classes={{ root: "p-2" }}>
          <TutorialMenuItem disabled>Дополнительные действия (позже)</TutorialMenuItem>
          <TutorialMenuItem disabled>Расширенные фильтры (позже)</TutorialMenuItem>
        </TabPanel>
      </TabContext>
    </Menu>
  );
};
