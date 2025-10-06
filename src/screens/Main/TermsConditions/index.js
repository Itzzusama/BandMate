import {useWindowDimensions, ActivityIndicator, View} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {useEffect, useState} from 'react';

import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomText from '../../../components/CustomText';
import Header from '../../../components/Header';

import {get} from '../../../services/ApiRequest';
import {COLORS} from '../../../utils/COLORS';
import fonts from '../../../assets/fonts';

const TermsConditions = () => {
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [termsData, setTermsData] = useState(null);

  const getTermCondition = async () => {
    try {
      setLoading(true);
      const res = await get('terms');
      if (res?.data?.success && res?.data?.data) {
        setTermsData(res.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTermCondition();
  }, []);

  const htmlConfig = {
    defaultTextProps: {
      style: {
        fontFamily: fonts.regular,
        fontSize: 16,
        color: COLORS.white,
        lineHeight: 24,
      },
    },
    tagsStyles: {
      h1: {
        fontFamily: fonts.bold,
        fontSize: 24,
        color: COLORS.white,
        marginBottom: 16,
        marginTop: 16,
      },
      h2: {
        fontFamily: fonts.semiBold,
        fontSize: 20,
        color: COLORS.white,
        marginBottom: 12,
        marginTop: 12,
      },
      h3: {
        fontFamily: fonts.medium,
        fontSize: 18,
        color: COLORS.white,
        marginBottom: 8,
        marginTop: 8,
      },
      p: {
        fontFamily: fonts.regular,
        fontSize: 16,
        color: COLORS.white,
        marginBottom: 12,
        lineHeight: 24,
      },
      ul: {
        marginBottom: 12,
      },
      li: {
        fontFamily: fonts.regular,
        fontSize: 16,
        color: COLORS.white,
        marginBottom: 6,
      },
      strong: {
        fontFamily: fonts.bold,
        fontWeight: 'bold',
        color: COLORS.white,
      },
      b: {
        fontFamily: fonts.bold,
        fontWeight: 'bold',
        color: COLORS.white,
      },
      em: {
        fontStyle: 'italic',
        color: COLORS.white,
      },
      i: {
        fontStyle: 'italic',
        color: COLORS.white,
      },
    },
    systemFonts: [fonts.regular, fonts.medium, fonts.semiBold, fonts.bold],
  };

  const renderLoadingState = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
      }}>
      <ActivityIndicator size="large" color={COLORS.white} />
    </View>
  );

  const renderErrorState = () => (
    <View style={{paddingVertical: 20}}>
      <CustomText
        label="Unable to load terms & conditions. Please try again later."
        fontFamily={fonts.medium}
        fontSize={16}
        color={COLORS.white}
        textAlign="center"
      />
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return renderLoadingState();
    }

    if (!termsData || !termsData.content) {
      return renderErrorState();
    }

    return (
      <View style={{paddingBottom: 20}}>
        <RenderHtml
          contentWidth={width - 40}
          source={{html: termsData.content}}
          tagsStyles={htmlConfig.tagsStyles}
          defaultTextProps={htmlConfig.defaultTextProps}
          systemFonts={htmlConfig.systemFonts}
        />
      </View>
    );
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title="Terms & Conditions" />}>
      {renderContent()}
    </ScreenWrapper>
  );
};

export default TermsConditions;
