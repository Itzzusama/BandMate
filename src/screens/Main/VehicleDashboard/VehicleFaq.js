import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { post, put } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import FaqModal from "./molecules/FaqModal";

const VehicleFaq = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params?.currentVehicle;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [faqsData, setFaqsData] = useState(item?.faqs || null);

  const createFaq = async (faqData) => {
    try {
      setLoading(true);
      const body = {
        faqs: [faqData],
      };

      const res = await post(`vehicles/${item?.id}/faqs`, body);

      if (res.data.success) {
        // Update local state with new data
        setFaqsData(res.data?.data);
        setIsModalVisible(false);
        setEditingFaq(null);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error creating FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  const addFaqToExisting = async (faqData) => {
    try {
      setLoading(true);
      // Get existing FAQs array
      const existingFaqs = faqsData?.faqs || [];

      // Add new FAQ to existing array
      const updatedFaqsArray = [...existingFaqs, faqData];

      const body = {
        faqs: updatedFaqsArray,
      };

      const res = await put(`vehicles/${item?.id}/faqs/${faqsData?._id}`, body);

      if (res.data.success) {
        // Update local state with new data
        setFaqsData(res.data?.data);
        setIsModalVisible(false);
        setEditingFaq(null);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error adding FAQ to existing:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateExistingFaq = async (faqData) => {
    try {
      setLoading(true);
      const existingFaqs = faqsData?.faqs || [];

      const updatedFaqsArray = existingFaqs.map((faq) =>
        faq._id === editingFaq._id
          ? { ...faq, question: faqData.question, answer: faqData.answer }
          : faq
      );

      const body = {
        faqs: updatedFaqsArray,
      };

      const res = await put(`vehicles/${item?.id}/faqs/${faqsData?._id}`, body);

      if (res.data.success) {
        // Update local state with new data
        setFaqsData(res.data?.data);
        setIsModalVisible(false);
        setEditingFaq(null);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error updating existing FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditFaq = (faq) => {
    setEditingFaq(faq);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleDeleteFaq = async (faq) => {
    try {
      setLoading(true);

      const existingFaqs = faqsData?.faqs || [];

      const updatedFaqsArray = existingFaqs.filter(
        (existingFaq) => existingFaq._id !== faq._id
      );

      const body = {};
      if (updatedFaqsArray.length > 0) {
        body.faqs = updatedFaqsArray;
      }

      const res = await put(`vehicles/${item?.id}/faqs/${faqsData?._id}`, body);

      if (res.data?.success) {
        setFaqsData(res.data?.data);
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingFaq(null);
    setIsEditMode(false);
  };

  const handleModalSubmit = (question, answer) => {
    const faqData = {
      question,
      answer,
    };

    if (isEditMode) {
      // Update existing FAQ
      updateExistingFaq(faqData);
    } else {
      // Check if there are existing FAQs
      if (faqsData?.faqs && faqsData.faqs.length > 0) {
        // Add to existing FAQs using PUT request
        addFaqToExisting(faqData);
      } else {
        // Create first FAQ using POST request
        createFaq(faqData);
      }
    }
  };

  return (
    <ScreenWrapper headerUnScrollable={() => <Header title={"FAQ"} />}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.border} />

        {/* Display existing FAQs */}
        {faqsData?.faqs && faqsData.faqs.length > 0 ? (
          <View>
            <CustomText
              label={"Existing FAQs"}
              fontFamily={fonts.semiBold}
              fontSize={18}
              marginBottom={16}
            />
            {faqsData.faqs.map((faq, index) => (
              <View key={index} style={styles.faqCard}>
                <View style={styles.faqContent}>
                  <CustomText
                    label={faq.question}
                    fontFamily={fonts.semiBold}
                    fontSize={16}
                    color={COLORS.black}
                  />
                  <CustomText
                    label={faq.answer}
                    fontFamily={fonts.regular}
                    fontSize={14}
                    color={COLORS.gray}
                    marginTop={8}
                  />
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity onPress={() => handleEditFaq(faq)}>
                    <Image source={PNGIcons.edit} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteFaq(faq)}>
                    <Image source={Images.binRed} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.noFaqsContainer}>
            <CustomText
              label={"No FAQs added yet"}
              fontFamily={fonts.medium}
              fontSize={16}
              color={COLORS.gray}
            />
          </View>
        )}
      </ScrollView>

      <View style={[styles.border, { marginBottom: 8 }]} />

      <CustomButton
        title={"Add A FAQ"}
        icon={Images.plus}
        color={COLORS.primaryColor}
        backgroundColor={COLORS.lightGray}
        borderRadius={12}
        marginBottom={8}
        onPress={() => {
          setIsEditMode(false);
          setIsModalVisible(true);
        }}
      />

      <View style={styles.border} />

      {/* FAQ Modal */}
      <FaqModal
        isVisible={isModalVisible}
        onDisable={handleModalClose}
        title={isEditMode ? "Edit FAQ" : "Add FAQ"}
        subtitle={
          isEditMode
            ? "Update your FAQ information"
            : "Add a new FAQ for your vehicle"
        }
        btnOne={isEditMode ? "Update FAQ" : "Create FAQ"}
        btnTwo="Cancel"
        onBtnOne={handleModalSubmit}
        onBtnTwo={handleModalClose}
        editingFaq={editingFaq}
        isEditMode={isEditMode}
        loading={loading}
      />
    </ScreenWrapper>
  );
};

export default VehicleFaq;

const styles = StyleSheet.create({
  border: {
    height: 4,
    backgroundColor: COLORS.lightGray,
    marginBottom: 16,
  },
  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  faqContent: {
    flex: 1,
    marginRight: 16,
  },
  actionButtons: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  editButton: {
    borderColor: COLORS.primaryColor,
    backgroundColor: COLORS.white,
  },
  deleteButton: {
    borderColor: COLORS.red,
    backgroundColor: COLORS.white,
  },
  noFaqsContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  icon: {
    height: 18,
    width: 18,
  },
});
