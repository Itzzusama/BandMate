import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import FriendCard from "./molecules/FriendCard";
import { useEffect, useMemo, useState } from "react";
import DellFriendModal from "./molecules/DellFriendModal";
import { get, post } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import NoDataFound from "../../../components/NoDataFound";

const MyFriends = () => {
  const [dellFriendModal, setDellFriendModal] = useState(false);
  const [friends, setFriends] = useState([]);
  const [identifier, setIdentifier] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const fetchFriends = async () => {
    setLoading1(true);
    try {
      const res = await get(
        "friends?status=accepted&sortBy=name&sortOrder=asc"
      );
      const list = res?.data?.friends || [];
      console.log("list====", res?.data);

      setFriends(list);
      setLoading1(false);
    } catch (e) {
      setLoading1(false);

      ToastMessage("Failed to load friends", "error");
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"My Friends"} />}
      refreshControl={
        <RefreshControl refreshing={loading1} onRefresh={fetchFriends} />
      }
    >
      <CustomText
        label={"Add a Friend"}
        fontSize={24}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
        marginTop={12}
      />

      <CustomText
        label={"You don’t have any messages yet."}
        lineHeight={14 * 1.4}
        marginBottom={20}
      />

      <View style={styles.row}>
        <CustomInput
          value={identifier}
          withLabel={"PHONE/EMAIL ADDRESS"}
          placeholder={"Enter Email or Phone Number"}
          width={"82%"}
          onChangeText={setIdentifier}
          height={56}
          marginBottom={0.1}
        />
        <TouchableOpacity
          style={styles.plusButton}
          onPress={async () => {
            const trimmed = identifier.trim();
            if (!trimmed) {
              ToastMessage("Enter email or phone", "error");
              return;
            }
            try {
              setLoading(true);
              const body = { identifier: trimmed };
              const res = await post("friends/add", body);
              console.log("re----", res.data);

              if (res?.data?.message == "Friend added successfully") {
                ToastMessage("Friend added", "success");
                setIdentifier("");
                await fetchFriends();
              } else {
                ToastMessage("User not Found", "error");

                // ToastMessage(res?.data?.message || "Failed to add", "error");
              }
            } catch (e) {
              ToastMessage("User not Found", "error");

              // ToastMessage(
              //   e?.response?.data?.message || "Failed to add",
              //   "error"
              // );
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size={"small"} />
          ) : (
            <Image source={Images.plus} style={styles.plusIcon} />
          )}
        </TouchableOpacity>
      </View>

      <Divider marginVertical={20} />
      <CustomText
        label={"All my friends"}
        fontSize={20}
        lineHeight={20 * 1.4}
        fontFamily={fonts.semiBold}
        marginBottom={20}
      />

      <FlatList
        data={friends}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <FriendCard
            key={index}
            onDellPress={() => {
              setSelectedItem(item);
              setDellFriendModal(true);
            }}
            name={
              `${item?.first_name} ${item?.sur_name}` || item?.email || "Friend"
            }
            email={item?.email}
            phone={item?.phone}
            imageUri={item?.avatarUrl || item?.image}
          />
        )}
        ListEmptyComponent={() => (
          <NoDataFound
            title={"No friend(s) found"}
            desc={"Enter Friend's name and Click + to add "}
          />
        )}
      />

      <DellFriendModal
        isVisible={dellFriendModal}
        onClose={() => setDellFriendModal(false)}
        item={selectedItem}
        onDeleted={async () => {
          await fetchFriends();
        }}
      />
    </ScreenWrapper>
  );
};

export default MyFriends;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  plusButton: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#4347FF0A",
  },
  plusIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.darkPurple,
  },
});
