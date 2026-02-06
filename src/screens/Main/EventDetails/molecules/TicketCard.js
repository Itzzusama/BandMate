import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import { Images } from "../../../../assets/images";
import Icons from "../../../../components/Icons";

const TicketCard = ({
  title,
  pricePerPerson,
  subtitle,
  note,
  quantity = 0,
  onIncrement,
  onDecrement,
  isSoldOut = false,
  totalQuantity,
}) => {
  return (
    <View style={[styles.card, isSoldOut && styles.soldOutCard]}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <CustomText
            label={title}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
          <CustomText
            label={`$${pricePerPerson} Per Person`}
            fontFamily={fonts.medium}
            fontSize={14}
          />
        </View>

        {isSoldOut ? (
          <View style={styles.soldOutBadge}>
            <CustomText
              label="Sold Out"
              color="#EE1045"
              fontSize={12}
              fontFamily={fonts.medium}
            />
          </View>
        ) : (
          <View style={styles.counterRow}>
            <TouchableOpacity style={styles.iconBtn} onPress={onDecrement}>
              <Icons
                family={"FontAwesome6"}
                name={"minus"}
                size={17}
                color={COLORS.white}
              />
            </TouchableOpacity>

            <CustomText
              label={quantity.toString()}
              marginHorizontal={12}
              fontFamily={fonts.medium}
            />

            <TouchableOpacity style={styles.iconBtn} onPress={onIncrement}>
              <Image
                source={Images.plus}
                style={{
                  height: 24,
                  width: 24,
                  tintColor: COLORS.white,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {subtitle && (
        <CustomText
          label={subtitle}
          color={COLORS.white3}
          fontSize={12}
          marginTop={1}
        />
      )}

      {note && (
        <View style={styles.infoCard}>
          <CustomText
            label={note}
            color={COLORS.btnColor}
            fontSize={12}
            fontFamily={fonts.medium}
            lineHeight={12 * 1.4}
          />
        </View>
      )}
    </View>
  );
};

export default TicketCard;

const styles = StyleSheet.create({
  card: {
    borderColor: COLORS.cardColor,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  soldOutCard: {},

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  iconBtn: {
    height: 32,
    width: 32,
    borderRadius: 99,
    backgroundColor: COLORS.cardColor,
    alignItems: "center",
    justifyContent: "center",
  },

  soldOutBadge: {
    backgroundColor: "#EE10450A",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 99,
  },
  infoCard: {
    backgroundColor: COLORS.btnSoftColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    paddingVertical: 4,
    marginTop: 8,
  },
});
