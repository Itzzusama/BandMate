import ScreenWrapper from '../../../components/ScreenWrapper'
import Header from '../../../components/Header'
import { useState } from 'react'
import { COLORS } from '../../../utils/COLORS'
import CustomInput from './../../../components/CustomInput';
import CollapseableCard from './molecules/CollaspeableCard'
import HighlightedText from './molecules/HighlightedText';
import CustomDropdown from './../../../components/CustomDropdown';

const GeneralPricing = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [MileAge, setMileAge] = useState(false)
  const [refill, setRefill] = useState(false)
  const [extraDrivers, setextraDrivers] = useState(false)
  const [pets, setPets] = useState(false)
  const [model, setModel] = useState("")
  const [fuelTypes, setFuelTypes] = useState("")
  const [toggle, setToggle] = useState(false)


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

  const fuel_types = [
    "Litre",
    "Diesel"
  ]


  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Pricing"} marginBottom={30} />}
    >
      <CollapseableCard
        title="General Pricing"
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
          {
            component: <CustomInput withLabel="Weekend Price" />,
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


      <CollapseableCard
        title="Fuel Refill"
        subtitle="Setup how a limit or make it unlimited."
        collapsed={refill}
        toggleCollapse={() => setRefill(!refill)}
        showInputs={true}
        inputFields={[
          {
            component: <CustomDropdown withLabel="FUEL TYPE" data={fuel_types} setValue={setFuelTypes} value={fuelTypes} />,
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
            component: <CustomInput withLabel="Daily Consumption" />,
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
            component: <CustomInput withLabel="Price Per Additional Litre" />,
            infoText: (
              <>
                <HighlightedText
                  textBefore={"Count once the mileage limit as been exceeded."}
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
                <HighlightedText
                  textBefore={"Calculated at the end of the booking."}
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
        title="Extra Drivers"
        subtitle="Setup how a limit or make it unlimited."
        collapsed={extraDrivers}
        toggleCollapse={() => setextraDrivers(!extraDrivers)}
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
            component: <CustomInput withLabel="POSSIBLE DRIVERS" />,
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
            component: <CustomInput withLabel="Price Per Additional Drivers" />,
            infoText: (
              <>
                <HighlightedText
                  textBefore={"Count once the mileage limit as been exceeded."}
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
        title="Pets"
        subtitle="What are your fees for pets"
        collapsed={pets}
        toggleCollapse={() => setPets(!pets)}
        showInputs={true}
        inputFields={[
          {
            component: <CustomInput withLabel="Pet Fees" />,
            infoText:
              <HighlightedText
                textBefore={"Customer with pets need to pay you extra."}
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

export default GeneralPricing