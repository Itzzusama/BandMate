import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { forwardRef, useMemo } from "react";
import { StyleSheet } from "react-native";

const BottomSheetComponent = forwardRef(
  (
    {
      children,
      snapPoints,
      initialIndex = -1,
      onChange,
      enablePanDownToClose = false,
      contentContainerStyle,
      handleVisible = true, // New prop to control handle visibility
      handleStyle,
      ...props
    },
    ref
  ) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    return (
      <GestureHandlerRootView style={styles.container}>
        <BottomSheet
          ref={ref}
          index={initialIndex}
          snapPoints={memoizedSnapPoints}
          onChange={onChange}
          enablePanDownToClose={enablePanDownToClose}
          handleStyle={handleStyle}
          handleIndicatorStyle={
            handleVisible ? styles.handleIndicator : styles.handleHidden
          }
          {...props}
        >
          <BottomSheetScrollView
            contentContainerStyle={[
              styles.contentContainer,
              contentContainerStyle,
            ]}
          >
            {children}
          </BottomSheetScrollView>
        </BottomSheet>
      </GestureHandlerRootView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    pointerEvents: "box-none",
  },
  contentContainer: {
    backgroundColor: "white",
    paddingBottom: 20,
  },
  handleIndicator: {
    backgroundColor: "#999",
  },
  handleHidden: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },
});

BottomSheetComponent.displayName = "BottomSheetComponent";

export default BottomSheetComponent;
