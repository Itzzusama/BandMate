import { Image, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import TopTab from "../../../../components/TopTab";
import DetailCard from "./DetailCard";
import ErrorComponent from "../../../../components/ErrorComponent";

const VehicleDetailCard = ({
  title = "Main Vehicle Information",
  details = [],
  isInfo,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <CustomText
          label={title}
          fontFamily={fonts.semiBold}
          fontSize={16}
          lineHeight={16 * 1.4}
        />

        <Icons name={"chevron-down"} size={20} />
      </View>

      <View style={styles.locationCard}>
        {details.map((item, index) => (
          <DetailCard
            key={item.name}
            name={item.name}
            value={item.value}
            ischange={item.ischange}
            leftImage={item.leftImage}
            isFirst={index === 0}
            isLast={index === details.length - 1}
            isInfo={isInfo}
          />
        ))}
      </View>
      {isInfo && (
        <View style={styles.warningBox}>
          <ErrorComponent
            TextWidth={"37%"}
            errorTitle={
              "Some vehicle might carry a device that collects driving & location data. Data may be shared with third parties for vehicle recovery or protection purposes."
            }
            color={"#A57A3A"}
          />
        </View>
      )}
    </View>
  );
};

export default VehicleDetailCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  arrow: {
    height: 24,
    width: 24,
  },
  locationCard: {
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
  },
  icon: {
    height: 32,
    width: 32,
  },
  warningBox: {
    width: "100%",
    marginTop: 12,
    backgroundColor: "#A57A3A0A",
    padding: 8,
    borderRadius: 12,
  },
});
