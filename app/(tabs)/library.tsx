import FinishedBooks from "components/library/FinishedBooks";
import WantToReadBooks from "components/library/WantToReadBooks";
import { useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useTheme, useWindowDimensions } from "tamagui";

const Library = () => {
  const layout = useWindowDimensions();
  const theme = useTheme();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "finished", title: "Finished" },
    { key: "wantToRead", title: "Want to read" }
  ]);

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        android_ripple={{ radius: 0 }}
        indicatorStyle={{ backgroundColor: theme.accentColor.val }}
        labelStyle={{ textTransform: "none" }}
        indicatorContainerStyle={{
          marginLeft: 40,
          paddingHorizontal: 70
        }}
        style={{
          backgroundColor: theme.background,
          height: 50
        }}
      />
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        finished: FinishedBooks,
        wantToRead: WantToReadBooks
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default Library;
