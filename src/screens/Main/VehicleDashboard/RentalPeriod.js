import ScreenWrapper from '../../../components/ScreenWrapper'
import Header from '../../../components/Header'
import { useState } from 'react'
import { COLORS } from '../../../utils/COLORS'
import CustomInput from './../../../components/CustomInput';
import CollapseableCard from './molecules/CollaspeableCard'
import HighlightedText from './molecules/HighlightedText';
import CustomDropdown from './../../../components/CustomDropdown';

const RentalPeriod = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [MileAge, setMileAge] = useState(false)
  const [rental, setRental] = useState(false)
  const [timePeriod, setTimePeriod] = useState("")
  const [model, setModel] = useState("")
  const [toggle, setToggle] = useState(false)


  const periods = [
    "1 Day",
    "3 Days",
    "7 Days",
    "14 Days",
    "1 Month",
    "3 Months",
    "6 Months",
    "9 Months",
    "1 Year"
  ];
  const models = [
    "Premier",
    "Platinum",
    "Titanium",
    "Essence",
    "Preferred",
    "Denali",
    "High Country",
    "TRD Off-Road",
    "TRD Pro",
    "Trailhawk",
    "Rubicon",
    "Limited",
    "Black Edition",
    "Nightshade",
    "Wilderness",
  ];



  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Pricing"} marginBottom={30} />}
    >
      <CollapseableCard
        title="Pricing"
        subtitle="Setup how a limit or make it unlimited."
        collapsed={collapsed}
        toggleCollapse={() => setCollapsed(!collapsed)}
        showSwitch={true}
        switchValue={toggle}
        setSwitchValue={setToggle}
        switchLabel="Auto-adapt to Market Price"
        switchSubLabel="Stress-free, easily gain customers."
        highlight={
          <HighlightedText
            textBefore={"Current average market price is at"}
            highlightedText='$12.50/Day'
            highlightColor={COLORS.blue}
            fontSize={12}
            align="left"
          />
        }
        showInputs={true}
        inputFields={[
          {
            component: <CustomInput withLabel="CURRENCY" />,
          },
          {
            component: <CustomInput withLabel="Price Per Day" />,
          },
        ]}
        error={null}
      />

      <CollapseableCard
        title="Rental Period"
        subtitle="Setup how long this vehicle could be rented"
        collapsed={rental}
        toggleCollapse={() => setRental(!rental)}
        showInputs={true}
        inputFields={[
          {
            component: <CustomDropdown withLabel="Minimal Rental Period" data={periods} setValue={setTimePeriod} value={timePeriod} />,
            infoText:
              <HighlightedText
                textBefore={"Minimal Rental Period"}
                marginBottom={10}
                marginTop={-10}
              />
          },
          {
            component: <CustomDropdown withLabel="Maximum Rental Period" data={periods} setValue={setTimePeriod} value={timePeriod} />,
            infoText:
              <HighlightedText
                textBefore={"Maximum Rental Period"}
                marginBottom={10}
                marginTop={-10}
              />
          },
          {
            component: <CustomInput withLabel="Weekly Discount" />,
            infoText: (
              <>
                <HighlightedText
                  textBefore={"Granted if rental equals or exceeds a 7 days period."}
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
                <HighlightedText
                  textBefore={"Equals to"}
                  highlightedText='$1,235.25'
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
              </>
            )
          },
          {
            component: <CustomInput withLabel="Monthly Discount" />,
            infoText: (
              <>
                <HighlightedText
                  textBefore={"Granted if rental equals or exceeds a 7 days period."}
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
                <HighlightedText
                  textBefore={"Equals to"}
                  highlightedText='$1,235.25'
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
              </>
            )
          },
          {
            component: <CustomInput withLabel="Yearly Discount" />,
            infoText: (
              <>
                <HighlightedText
                  textBefore={"Granted if rental equals or exceeds a 7 days period."}
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
                <HighlightedText
                  textBefore={"Equals to"}
                  highlightedText='$1,235.25'
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
              </>
            )
          },
        ]}
        error={null}
      />



      <CollapseableCard
        title="Mileage"
        subtitle="Setup how a limit or make it unlimited."
        collapsed={MileAge}
        toggleCollapse={() => setMileAge(!MileAge)}
        showInputs={true}
        inputFields={[
          {
            component: <CustomDropdown withLabel="Model" data={models} setValue={setModel} value={model} />,
            infoText:
              <HighlightedText
                textBefore={"This will limit the total mileage count per day."}
                fontSize={12}
                align="left"
                marginBottom={10}
                marginTop={-10}
              />
          },
          {
            component: <CustomInput withLabel="Mileage Per Day" />,
            infoText:
              <HighlightedText
                textBefore={"Exceeding this limit will result in extra fees for the customer."}
                fontSize={12}
                align="left"
                marginBottom={10}
                marginTop={-10}
              />
          },
          {
            component: <CustomInput withLabel="Price Per Additional Miles" />,
            infoText:
              <HighlightedText
                textBefore={"Count once the mileage limit as been exceeded."}
                fontSize={12}
                align="left"
                marginBottom={10}
                marginTop={-10}
              />
          },
        ]}
        error={null}
      />



    </ScreenWrapper>
  )
}

export default RentalPeriod