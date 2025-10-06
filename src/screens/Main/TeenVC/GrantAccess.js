import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import Divider from "../../../components/Divider";
import SearchInput from "../../../components/SearchInput";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";
import CustomButton from "../../../components/CustomButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import ImageFast from "../../../components/ImageFast";
import { Images } from "../../../assets/images";

const AVATAR_SIZE_LIST = 40;

const GrantAccess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const onSelect = route?.params?.onSelect;

  // Mock data matching screenshot
  const grantedInitial = useMemo(
    () => [
      { id: "1", name: "Viktor", email: "viktor@mail.com" },
      { id: "2", name: "Anna", email: "anna@mail.com" },
    ],
    []
  );

  const friends = useMemo(
    () => [
      { id: "1", name: "Display Name", email: "abc@mail.com" },
      { id: "4", name: "Display Name", email: "abc@mail.com" },
      { id: "5", name: "Display Name", email: "abc@mail.com" },
      { id: "6", name: "Display Name", email: "abc@mail.com" },
    ],
    []
  );

  const [selectedIds, setSelectedIds] = useState(new Set(grantedInitial.map((g) => g.id)));

  const toggleSelect = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const onConfirm = () => {
    const names = [];
    // include initial granted and from friends where selected
    grantedInitial.forEach((g) => {
      if (selectedIds.has(g.id)) names.push(g.name);
    });
    friends.forEach((f) => {
      if (selectedIds.has(f.id)) names.push(f.name);
    });
    const label = names.join(", ");
    if (onSelect) onSelect(label);
    navigation.goBack();
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Grant Access To"} />}
      footerUnScrollable={() => (
        <View style={{ padding: 16 }}>
          <CustomButton title={"Confirm"} onPress={onConfirm} height={48} borderRadius={99} />
          <CustomButton
            title={"Remove All"}
            isBoarder
            secondBorderColor={"#12121229"}
            backgroundColor={"transparent"}
            color={COLORS.black}
            height={48}
            borderRadius={99}
            marginTop={12}
            onPress={() => setSelectedIds(new Set())}
          />
        </View>
      )}
    >
      <Divider thickness={4} />
      <SearchInput isCross placeholder={"Eg. Viktor, Ana..."} />

      <CustomText
        label={`GRANTED TO 149`}
        fontFamily={fonts.medium}
        color={COLORS.gray1}
        lineHeight={14 * 1.4}
        marginTop={12}
      />

      <FlatList
        data={grantedInitial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedIds.has(item.id);
          return (
            <>
              <View style={styles.friendRow}>
                <Image
                  source={{ uri: "https://picsum.photos/seed/g-" + item.id + "/100" }}
                  style={styles.avatarList}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <CustomText label={item.name} fontFamily={fonts.medium} lineHeight={14 * 1.4} />
                    <ImageFast source={Images.verifyStar} style={{ height: 14, width: 14, marginLeft: 4 }} />
                  </View>
                  <CustomText label={item.email} color={COLORS.gray1} fontFamily={fonts.medium} lineHeight={14 * 1.6} />
                </View>
                <TouchableOpacity activeOpacity={0.85} onPress={() => toggleSelect(item.id)} style={[styles.actionCircle, isSelected && styles.actionSelectedBlue]}>
                  {isSelected ? (
                    <Icons name="check" family="Feather" size={18} color={COLORS.white} />
                  ) : (
                    <Icons name="user-plus" family="Feather" size={18} color={COLORS.black} />
                  )}
                </TouchableOpacity>
              </View>
              <Divider marginVertical={8} />
            </>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      <CustomText
        label={`ALL FRIENDS 149`}
        fontFamily={fonts.medium}
        color={COLORS.gray1}
        lineHeight={14 * 1.4}
        marginTop={8}
      />

      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedIds.has(item.id);
          return (
            <>
              <View style={styles.friendRow}>
                <Image
                  source={{ uri: "https://picsum.photos/seed/f-" + item.id + "/100" }}
                  style={styles.avatarList}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <CustomText label={item.name} fontFamily={fonts.medium} lineHeight={14 * 1.4} />
                    <ImageFast source={Images.verifyStar} style={{ height: 14, width: 14, marginLeft: 4 }} />
                  </View>
                  <CustomText label={item.email} color={COLORS.gray1} fontFamily={fonts.medium} lineHeight={14 * 1.6} />
                </View>
                <TouchableOpacity activeOpacity={0.85} onPress={() => toggleSelect(item.id)} style={[styles.actionCircle, isSelected && styles.actionSelectedBlue]}>
                  {isSelected ? (
                    <Icons name="check" family="Feather" size={18} color={COLORS.white} />
                  ) : (
                    <Icons name="plus" family="Feather" size={18} color={COLORS.black} />
                  )}
                </TouchableOpacity>
              </View>
              <Divider marginVertical={8} />
            </>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </ScreenWrapper>
  );
};

export default GrantAccess;

const styles = StyleSheet.create({
  avatarList: {
    width: AVATAR_SIZE_LIST,
    height: AVATAR_SIZE_LIST,
    borderRadius: AVATAR_SIZE_LIST / 2,
    backgroundColor: COLORS.lightGray,
  },
  friendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  actionSelectedBlue: {
    backgroundColor: "#3556FF",
  },
});
