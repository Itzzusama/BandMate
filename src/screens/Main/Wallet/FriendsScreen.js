import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import SearchInput from "../../../components/SearchInput";
import CustomText from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../components/Icons";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import ImageFast from "../../../components/ImageFast";
import { Images } from "../../../assets/images";
import Divider from "../../../components/Divider";
import { useNavigation, useRoute } from "@react-navigation/native";
import { get } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import NoDataFound from "../../../components/NoDataFound";

const AVATAR_SIZE_RECENT = 72;
const AVATAR_SIZE_LIST = 48;

const FriendsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const onSelectFriend = route?.params?.onSelectFriend;
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [friendsApi, setFriendsApi] = useState([]);

  const recent = useMemo(() => friendsApi.slice(0, 10), [friendsApi]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      setLoading(true);

      const res = await get("friends?status=ACTIVE");
      const list =
        res?.data?.friends || res?.data?.data?.friends || res?.data || [];
      setFriendsApi(Array.isArray(list) ? list : []);
    } catch (e) {
      ToastMessage("Failed to load friends", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const normalizeFriend = (item) => {
    const f = item?.user || item;
    const id = f?._id || f?.id || item?._id || item?.id;
    const displayName =
      f?.display_name ||
      (f?.first_name || f?.firstName || "") +
        (f?.sur_name || f?.lastName
          ? " " + (f?.sur_name || f?.lastName)
          : "") ||
      f?.name ||
      f?.email;
    const email = f?.email;
    const avatarUri = f?.avatarUrl || f?.image || f?.avatar || null;
    return { id, displayName, email, avatarUri, raw: f };
  };

  const handleSelect = (item) => {
    if (typeof onSelectFriend === "function") {
      onSelectFriend(item?.user || item);
      navigation.goBack();
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Send To"} />}
      footerUnScrollable={() => (
        <View style={{ height: Platform.OS == "ios" ? 20 : 0 }} />
      )}
      refreshControl={() => (
        <RefreshControl refreshing={loading} onRefresh={fetchFriends} />
      )}
    >
      <SearchInput isCross placeholder={"Eg. Viktor, Ana..."} />

      <CustomText
        label={`RECENT ${recent.length}`}
        fontFamily={fonts.medium}
        color={COLORS.gray1}
        lineHeight={14 * 1.4}
        marginTop={16}
      />

      <FlatList
        data={recent}
        keyExtractor={(item) =>
          (normalizeFriend(item).id || Math.random()).toString()
        }
        renderItem={({ item }) => {
          const f = normalizeFriend(item);
          return (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => handleSelect(item)}
              style={{ alignItems: "center", marginRight: 20 }}
            >
              <View style={styles.avatarRecent}>
                <Image
                  source={{
                    uri:
                      f.avatarUri ||
                      "https://picsum.photos/seed/" + f.id + "/100",
                  }}
                  style={styles.avatarRecent}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <CustomText
                  label={f.displayName || "Friend"}
                  fontFamily={fonts.medium}
                  fontSize={10}
                  lineHeight={10 * 1.4}
                />
                <ImageFast
                  source={Images.verifyStar}
                  style={{ height: 10, width: 10, marginLeft: 2 }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8 }}
      />

      <CustomText
        // label={`ALL FRIENDS ${friends?.length}`}
        fontFamily={fonts.medium}
        color={COLORS.gray1}
        lineHeight={14 * 1.4}
        marginTop={20}
      />

      <FlatList
        data={friendsApi}
        ListEmptyComponent={() => (
          <NoDataFound
            title={"No friends found"}
            desc={"No friends to show."}
            height={220}
          />
        )}
        keyExtractor={(item) => normalizeFriend(item).id}
        renderItem={({ item }) => {
          const f = normalizeFriend(item);
          return (
            <>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => handleSelect(item)}
              >
                <View style={styles.friendRow}>
                  <Image
                    source={{
                      uri:
                        f.avatarUri ||
                        "https://picsum.photos/seed/f-" + f.id + "/100",
                    }}
                    style={styles.avatarList}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <CustomText
                        label={f.displayName || "Friend"}
                        fontFamily={fonts.medium}
                        lineHeight={14 * 1.4}
                      />
                      <ImageFast
                        source={Images.verifyStar}
                        style={{ height: 14, width: 14, marginLeft: 4 }}
                      />
                    </View>
                    <CustomText
                      label={f.email || ""}
                      color={COLORS.gray1}
                      lineHeight={14 * 1.6}
                    />
                  </View>
                  <Icons
                    name="chevron-right"
                    family="Feather"
                    size={18}
                    color={COLORS.gray1}
                  />
                </View>
              </TouchableOpacity>
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

export default FriendsScreen;

const styles = StyleSheet.create({
  avatarRecent: {
    width: AVATAR_SIZE_RECENT,
    height: AVATAR_SIZE_RECENT,
    borderRadius: AVATAR_SIZE_RECENT / 2,
    backgroundColor: COLORS.lightGray,
  },
  avatarList: {
    width: AVATAR_SIZE_LIST,
    height: AVATAR_SIZE_LIST,
    borderRadius: AVATAR_SIZE_LIST / 2,
    backgroundColor: COLORS.lightGray,
  },
  verifiedDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#3556FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
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
  actionSelected: {
    backgroundColor: "#3556FF",
  },
});
