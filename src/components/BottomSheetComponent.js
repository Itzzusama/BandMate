import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../utils/COLORS";

const BottomSheetComponent = forwardRef(
  (
    {
      children,
      snapPoints,
      initialIndex = -1,
      onChange,
      enablePanDownToClose = false,
      enableScrollView = true,
      contentContainerStyle,
      handleVisible = true,
      handleStyle,
      footer,
      header,
      ...props
    },
    ref
  ) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    return (
      <View style={styles.container} pointerEvents="box-none">
        <BottomSheet
          ref={ref}
          index={initialIndex}
          snapPoints={memoizedSnapPoints}
          onChange={onChange}
          enablePanDownToClose={enablePanDownToClose}
          handleComponent={null}
          backgroundStyle={{ backgroundColor: COLORS.black }}
          style={styles.bottomSheet}
          {...props}
        >
          {header?.()}
          {enableScrollView ? (
            <BottomSheetScrollView
              style={{ backgroundColor: COLORS.black, borderRadius: 12 }}
              contentContainerStyle={[
                styles.contentContainer,
                contentContainerStyle,
              ]}
            >
              {children}
            </BottomSheetScrollView>
          ) : (
            <View style={{ flex: 1, backgroundColor: COLORS.black }}>
              {children}
            </View>
          )}
          {footer?.()}
        </BottomSheet>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    pointerEvents: "box-none",
  },
  bottomSheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  contentContainer: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingBottom: 140,
  },
});

BottomSheetComponent.displayName = "BottomSheetComponent";

export default BottomSheetComponent;
