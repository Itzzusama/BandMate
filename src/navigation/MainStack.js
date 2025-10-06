import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookHourly from "../screens/Main/BookHourly";
import InboxScreen from "../screens/Main/Chat/InboxScreen";
import ReportChat from "../screens/Main/Chat/ReportChat";
import AddPassenger from "../screens/Main/ClientTrip/AddPassenger";
import AwaitingDriverConfirmation from "../screens/Main/ClientTrip/AwaitingDriverConfirmation";
import DuringTrip from "../screens/Main/ClientTrip/DuringTrip";
import PickupOptions from "../screens/Main/ClientTrip/PickupOptions";
import QrScanner from "../screens/Main/ClientTrip/QrScanner";
import SplitBill from "../screens/Main/ClientTrip/SplitBill";
import SplitBillUser from "../screens/Main/ClientTrip/SplitBillUser";
import TripAdOns from "../screens/Main/ClientTrip/TripAdOns";
import TripCheckout from "../screens/Main/ClientTrip/TripCheckout";
import TripFoods from "../screens/Main/ClientTrip/TripFoods";
import TripReview from "../screens/Main/ClientTrip/TripReview";
import CusParkingMap from "../screens/Main/CustomerParking/CusParkingMap";
import CustomerCalender from "../screens/Main/CustomerParking/CustomerCalender";
import CustomerProfileDetails from "../screens/Main/CustomerParking/CustomerProfileDetails";
import CustomerTripDetail from "../screens/Main/CustomerParking/CustomerTripDetail";
import CustomerTripReview from "../screens/Main/CustomerParking/CustomerTripReview";
import FinalizingBooking from "../screens/Main/CustomerParking/FinalizingBooking";
import BookingOption from "../screens/Main/Dashboard/BookingOption";
import CancellationPolicy from "../screens/Main/Dashboard/CancellationPolicy";
import CarRental from "../screens/Main/Dashboard/CarRental";
import EditVehicle from "../screens/Main/Dashboard/EditVehicle";
import ManageAccess from "../screens/Main/Dashboard/ManageAccess";
import MyAvailibility from "../screens/Main/Dashboard/MyAvailibility";
import MyFleet from "../screens/Main/Dashboard/MyFleet";
import OptionProvided from "../screens/Main/Dashboard/OptionProvided";
import SelectAColor from "../screens/Main/Dashboard/SelectAColor";
import ServiceProvided from "../screens/Main/Dashboard/ServiceProvided";
import UploadVehicle from "../screens/Main/Dashboard/UploadVehicle";
import VehicleCustody from "../screens/Main/Dashboard/VehicleCustody";
import VehicleImageOnboarding from "../screens/Main/Dashboard/VehicleImageOnboarding";
import VehicleMake from "../screens/Main/Dashboard/VehicleMake";
import VehicleModal from "../screens/Main/Dashboard/VehicleModal";
import VehicleType from "../screens/Main/Dashboard/VehicleType";
import FoodOrderSummary from "../screens/Main/Deliveries/FoodOrderSummary";
import MyOrders from "../screens/Main/Deliveries/MyOrders";
import OrderCart from "../screens/Main/Deliveries/OrderCart";
import OrderDropOff from "../screens/Main/Deliveries/OrderDropOff";
import Equipments from "../screens/Main/Home/Equipments";
import MapSteps from "../screens/Main/MapSteps";
import MarketplaceMap from "../screens/Main/MarketplaceMap";
import MoveOut from "../screens/Main/MoveOut";
import AddInventoryItem from "../screens/Main/MoveOut/AddInventoryItem";
import RoomInventory from "../screens/Main/MoveOut/RoomInventory";
import Notification from "../screens/Main/Notification";
import OrderConfirmPin from "../screens/Main/OrderConfirmPin";
import Parking from "../screens/Main/Parking";
import ParkingMap from "../screens/Main/Parking/ParkingMap";
import ParkingMedia from "../screens/Main/Parking/ParkingMedia";
import RentalVehical from "../screens/Main/Parking/RentalVehical";
import ParkingSettings from "../screens/Main/ParkingSettings";
import AccessibilityFeature from "../screens/Main/ParkingSettings/AccessibilityFeature";
import LocationEquipment from "../screens/Main/ParkingSettings/LocationEquipment";
import MoreFeature from "../screens/Main/ParkingSettings/MoreFeature";
import ParkingBooking from "../screens/Main/ParkingSettings/ParkingBooking";
import SecurityFeature from "../screens/Main/ParkingSettings/SecurityFeature";
import PicLocation from "../screens/Main/PicLocation";
import Profile from "../screens/Main/Profile";
import { default as AiAssistant } from "../screens/Main/Profile/AiAssistantNew";
import ChangePassword from "../screens/Main/Profile/ChangePassword";
import ChangePinCode from "../screens/Main/Profile/ChangePinCode";
import Community from "../screens/Main/Profile/Community";
import ConfirmPassword from "../screens/Main/Profile/ConfirmPassword";
import CreatePassword from "../screens/Main/Profile/CreatePassword";
import Donations from "../screens/Main/Profile/Donations";
import EditProfile from "../screens/Main/Profile/EditProfile";
import InviteFriends from "../screens/Main/Profile/InviteFriends";
import Languages from "../screens/Main/Profile/Languages";
import MyFriends from "../screens/Main/Profile/MyFriends";
import MyProfile from "../screens/Main/Profile/MyProfile";
import PlanScreen from "../screens/Main/Profile/PlanScreen";
import PreferAddressing from "../screens/Main/Profile/PreferAddressing";
import Preferences from "../screens/Main/Profile/Preferences";
import PreferredCurrency from "../screens/Main/Profile/PreferredCurrency";
import PreferredDateFormat from "../screens/Main/Profile/PreferredDateFormat";
import PreferredFirstDayOfWeek from "../screens/Main/Profile/PreferredFirstDayOfWeek";
import PreferredLanguage from "../screens/Main/Profile/PreferredLanguage";
import PreferredMap from "../screens/Main/Profile/PreferredMap";
import PreferredServiceProviders from "../screens/Main/Profile/PreferredServiceProviders";
import PreferredTemperature from "../screens/Main/Profile/PreferredTemperature";
import PreferredUnits from "../screens/Main/Profile/PreferredUnits";
import PromoCode from "../screens/Main/Profile/PromoCode";
import QrScreen from "../screens/Main/Profile/QrScreen";
import QuickSelection from "../screens/Main/Profile/QuickSelection";
import ReferApp from "../screens/Main/Profile/ReferApp";
import Security from "../screens/Main/Profile/Security";
import UserAddress from "../screens/Main/Profile/UserAddress";
import Rentals from "../screens/Main/Rentals";
import RentalDetailPage from "../screens/Main/Rentals/RentalDetailPage";
import RrentalMap from "../screens/Main/Rentals/RrentalMap";
import RequestDetail from "../screens/Main/RequestDetail";
import MarketplaceEvent from "../screens/Main/SharedTrips/MarketplaceEvent";
import PickASeat from "../screens/Main/SharedTrips/PickASeat";
import TripSelection from "../screens/Main/SharedTrips/TripSelection";
import Shipping from "../screens/Main/Shipping";
import EstimatedWeight from "../screens/Main/Shipping/EstimatedWeight";
import ShippingSize from "../screens/Main/ShippingSize/ShippingSize";
import TeenVC from "../screens/Main/TeenVC";
import CardAccess from "../screens/Main/TeenVC/CardAccess";
import GrantAccess from "../screens/Main/TeenVC/GrantAccess";
import VCSuccess from "../screens/Main/TeenVC/VCSuccess";
import TermsConditions from "../screens/Main/TermsConditions";
import MarketplaceTour from "../screens/Main/Tours/Index";
import TripHistory from "../screens/Main/TripHistory";
import AirplaneFinal from "../screens/Main/TripScreens/Airplane/AirplaneFinal";
import AirplaneInitial from "../screens/Main/TripScreens/Airplane/AirplaneInitial";
import Conplaint from "../screens/Main/TripScreens/Complaint";
import LaterScreen from "../screens/Main/TripScreens/LaterScreen";
import RatingStepOne from "../screens/Main/TripScreens/TripRating/RatingStepOne";
import VehicleDashboard from "../screens/Main/VehicleDashboard";
import AccessibilityFeatures from "../screens/Main/VehicleDashboard/AccessibilityFeatures";
import DiscountPricing from "../screens/Main/VehicleDashboard/DiscountPricing";
import ExteriorFeature from "../screens/Main/VehicleDashboard/ExteriorFeature";
import Features from "../screens/Main/VehicleDashboard/Features";
import FoodBeverage from "../screens/Main/VehicleDashboard/FoodBeverage";
import GeneralPricing from "../screens/Main/VehicleDashboard/GeneralPricing";
import InteriorFeature from "../screens/Main/VehicleDashboard/InteriorFeature";
import PolicyAndRules from "../screens/Main/VehicleDashboard/PolicyAndRules";
import PortableFridge from "../screens/Main/VehicleDashboard/PortableFridge";
import Pricing from "../screens/Main/VehicleDashboard/Pricing";
import RentalPeriod from "../screens/Main/VehicleDashboard/RentalPeriod";
import TripGeneralPricing from "../screens/Main/VehicleDashboard/TripGeneralPricing";
import VehicleFaq from "../screens/Main/VehicleDashboard/VehicleFaq";
import VehiclesRules from "../screens/Main/VehicleDashboard/VehiclesRules";
import VehicleMarketplace from "../screens/Main/VehicleMarketplace";
import SliderFilter from "../screens/Main/VehicleMarketplace/SliderFilter";
import VehicleFilters from "../screens/Main/VehicleMarketplace/VehicleFilters";
import VTCChauffeur from "../screens/Main/VTCChauffeur";
import TakeIDBack from "../screens/Main/VTCChauffeur/TakeIDBack";
import TakeIDFront from "../screens/Main/VTCChauffeur/TakeIDFront";
import TakePhoto from "../screens/Main/VTCChauffeur/TakePhoto";
import VerifyIdentity from "../screens/Main/VTCChauffeur/VerifyIdentity";
import Wallet from "../screens/Main/Wallet";
import AddCreditCard from "../screens/Main/Wallet/AddCreditCard";
import AddCredits from "../screens/Main/Wallet/AddCredits";
import AutoRefill from "../screens/Main/Wallet/AutoRefill";
import BankDetail from "../screens/Main/Wallet/BankDetail";
import BlockACard from "../screens/Main/Wallet/BlockACard";
import BlockPin from "../screens/Main/Wallet/BlockPin";
import BudgetByCategory from "../screens/Main/Wallet/BudgetByCategory";
import ConfirmationScreen from "../screens/Main/Wallet/ConfirmationScreen";
import CreateVC from "../screens/Main/Wallet/CreateVC";
import DefineAmount from "../screens/Main/Wallet/DefineAmount";
import DetailPage from "../screens/Main/Wallet/DetailPage";
import FriendsScreen from "../screens/Main/Wallet/FriendsScreen";
import MyWallet from "../screens/Main/Wallet/MyWallet";
import PaymentMethod from "../screens/Main/Wallet/PaymentMethod";
import PaymentSecurity from "../screens/Main/Wallet/PaymentSecurity";
import RequestCredit from "../screens/Main/Wallet/RequestCredit";
import SendCredits from "../screens/Main/Wallet/SendCredits";
import SetupBudget from "../screens/Main/Wallet/SetupBudget";
import StripeConnect from "../screens/Main/Wallet/StripeConnect";
import WithdrawCredits from "../screens/Main/Wallet/WithdrawCredits";
import WareHouses from "../screens/Main/WareHouses";
import WarehouseRental from "../screens/Main/WareHouses/WarehouseRental";
import WarehouseStorage from "../screens/Main/WareHouses/WarehouseStorage";
import YourTripsScreen from "../screens/Main/YourTripsScreen";
import SellingAVehicle from "../screens/ServiceProviderAuth/AsPro/SellingAVehicle";
import TabStack from "./TabStack";
import BookingConfirmation from "../screens/Main/BookingConfirmation";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BookingConfirmation"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="SplitBillUser" component={SplitBillUser} />
      <Stack.Screen name="QrScanner" component={QrScanner} />
      <Stack.Screen name="OrderConfirmPin" component={OrderConfirmPin} />
      <Stack.Screen name="MapSteps" component={MapSteps} />
      <Stack.Screen name="TripHistory" component={TripHistory} />
      <Stack.Screen name="BookHourly" component={BookHourly} />
      <Stack.Screen name="MoveOut" component={MoveOut} />
      <Stack.Screen name="PicLocation" component={PicLocation} />
      <Stack.Screen name="RoomInventory" component={RoomInventory} />
      <Stack.Screen name="AddInventoryItem" component={AddInventoryItem} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="InviteFriends" component={InviteFriends} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="QuickSelection" component={QuickSelection} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Donations" component={Donations} />
      <Stack.Screen name="Languages" component={Languages} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="SendCredits" component={SendCredits} />
      <Stack.Screen name="AddCredits" component={AddCredits} />
      <Stack.Screen name="RequestCredit" component={RequestCredit} />
      <Stack.Screen name="WithdrawCredits" component={WithdrawCredits} />
      <Stack.Screen name="RequestDetail" component={RequestDetail} />
      <Stack.Screen name="ShippingSize" component={ShippingSize} />
      <Stack.Screen name="OptionProvided" component={OptionProvided} />
      <Stack.Screen name="MyAvailibility" component={MyAvailibility} />
      <Stack.Screen name="BookingOption" component={BookingOption} />
      <Stack.Screen name="CancellationPolicy" component={CancellationPolicy} />
      <Stack.Screen name="ServiceProvided" component={ServiceProvided} />
      <Stack.Screen name="SelectAColor" component={SelectAColor} />
      <Stack.Screen name="VehicleDashboard" component={VehicleDashboard} />
      <Stack.Screen name="VehicleFaq" component={VehicleFaq} />
      <Stack.Screen name="PolicyAndRules" component={PolicyAndRules} />
      <Stack.Screen name="Pricing" component={Pricing} />
      <Stack.Screen name="TripGeneralPricing" component={TripGeneralPricing} />
      <Stack.Screen name="GeneralPricing" component={GeneralPricing} />
      <Stack.Screen name="DiscountPricing" component={DiscountPricing} />
      <Stack.Screen name="VehiclesRules" component={VehiclesRules} />
      <Stack.Screen name="ManageAccess" component={ManageAccess} />
      <Stack.Screen name="RentalPeriod" component={RentalPeriod} />
      <Stack.Screen name="EditVehicle" component={EditVehicle} />
      <Stack.Screen name="CarRental" component={CarRental} />
      <Stack.Screen name="Parking" component={Parking} />
      <Stack.Screen name="ParkingMedia" component={ParkingMedia} />
      <Stack.Screen name="ParkingSettings" component={ParkingSettings} />
      <Stack.Screen name="SecurityFeature" component={SecurityFeature} />
      <Stack.Screen name="LocationEquipment" component={LocationEquipment} />
      <Stack.Screen name="MoreFeature" component={MoreFeature} />
      <Stack.Screen name="ParkingBooking" component={ParkingBooking} />
      <Stack.Screen name="InteriorFeature" component={InteriorFeature} />
      <Stack.Screen name="ExteriorFeature" component={ExteriorFeature} />
      <Stack.Screen name="ParkingMap" component={ParkingMap} />

      <Stack.Screen
        name="AccessibilityFeatures"
        component={AccessibilityFeatures}
      />
      <Stack.Screen name="VehicleMarketplace" component={VehicleMarketplace} />
      <Stack.Screen name="VehicleFilters" component={VehicleFilters} />
      <Stack.Screen name="SliderFilter" component={SliderFilter} />
      <Stack.Screen name="VehicleCustody" component={VehicleCustody} />
      <Stack.Screen name="LaterScreen" component={LaterScreen} />
      <Stack.Screen name="AirplaneInitial" component={AirplaneInitial} />
      <Stack.Screen name="AirplaneFinal" component={AirplaneFinal} />
      <Stack.Screen name="RatingStepOne" component={RatingStepOne} />
      <Stack.Screen name="Conplaint" component={Conplaint} />
      <Stack.Screen name="MarketplaceMap" component={MarketplaceMap} />
      <Stack.Screen name="TripSelection" component={TripSelection} />
      <Stack.Screen name="PickASeat" component={PickASeat} />
      <Stack.Screen name="MarketplaceEvent" component={MarketplaceEvent} />
      <Stack.Screen name="SellingAVehicle" component={SellingAVehicle} />
      <Stack.Screen name="UploadVehicle" component={UploadVehicle} />
      <Stack.Screen name="MyFleet" component={MyFleet} />
      <Stack.Screen name="Features" component={Features} />
      <Stack.Screen name="FoodBeverage" component={FoodBeverage} />
      <Stack.Screen name="PortableFridge" component={PortableFridge} />
      <Stack.Screen name="MyWallet" component={MyWallet} />
      <Stack.Screen
        name="AccessibilityFeature"
        component={AccessibilityFeature}
      />
      <Stack.Screen
        name="YourTripsScreen"
        component={YourTripsScreen}
        options={{
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen name="UserAddress" component={UserAddress} />
      <Stack.Screen name="BlockACard" component={BlockACard} />
      <Stack.Screen name="Equipments" component={Equipments} />
      <Stack.Screen name="TripCheckout" component={TripCheckout} />
      <Stack.Screen name="TripAdOns" component={TripAdOns} />
      <Stack.Screen name="TripFoods" component={TripFoods} />
      <Stack.Screen name="CreateVC" component={CreateVC} />
      <Stack.Screen name="BlockPin" component={BlockPin} />
      <Stack.Screen name="AutoRefill" component={AutoRefill} />
      <Stack.Screen name="SetupBudget" component={SetupBudget} />
      <Stack.Screen name="BudgetByCategory" component={BudgetByCategory} />
      <Stack.Screen
        name="AwaitingDriverConfirmation"
        component={AwaitingDriverConfirmation}
      />
      <Stack.Screen name="AddPassenger" component={AddPassenger} />
      <Stack.Screen name="DuringTrip" component={DuringTrip} />
      <Stack.Screen name="BankDetail" component={BankDetail} />
      <Stack.Screen name="AddCreditCard" component={AddCreditCard} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="VTCChauffeur" component={VTCChauffeur} />
      <Stack.Screen name="VerifyIdentity" component={VerifyIdentity} />
      <Stack.Screen name="TakeIDFront" component={TakeIDFront} />
      <Stack.Screen name="TakeIDBack" component={TakeIDBack} />
      <Stack.Screen name="TakePhoto" component={TakePhoto} />
      <Stack.Screen name="SplitBill" component={SplitBill} />
      <Stack.Screen name="PickupOptions" component={PickupOptions} />
      <Stack.Screen name="VehicleType" component={VehicleType} />
      <Stack.Screen name="VehicleMake" component={VehicleMake} />
      <Stack.Screen name="VehicleModal" component={VehicleModal} />
      <Stack.Screen
        name="VehicleImageOnboarding"
        component={VehicleImageOnboarding}
      />
      <Stack.Screen name="DefineAmount" component={DefineAmount} />
      <Stack.Screen name="PaymentSecurity" component={PaymentSecurity} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
      <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
      <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
      <Stack.Screen name="TeenVC" component={TeenVC} />
      <Stack.Screen name="CardAccess" component={CardAccess} />
      <Stack.Screen name="GrantAccess" component={GrantAccess} />
      <Stack.Screen name="VCSuccess" component={VCSuccess} />
      <Stack.Screen name="MyFriends" component={MyFriends} />
      <Stack.Screen name="StripeConnect" component={StripeConnect} />

      {/* setting screens  */}
      <Stack.Screen name="PromoCode" component={PromoCode} />
      <Stack.Screen name="ReferApp" component={ReferApp} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
      <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
      <Stack.Screen name="ChangePinCode" component={ChangePinCode} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="PreferAddressing" component={PreferAddressing} />
      <Stack.Screen name="AiAssistant" component={AiAssistant} />
      <Stack.Screen name="PreferredCurrency" component={PreferredCurrency} />
      <Stack.Screen name="PreferredLanguage" component={PreferredLanguage} />
      <Stack.Screen name="PreferredMap" component={PreferredMap} />
      <Stack.Screen name="PreferredUnits" component={PreferredUnits} />
      <Stack.Screen
        name="PreferredTemperature"
        component={PreferredTemperature}
      />
      <Stack.Screen
        name="PreferredFirstDayOfWeek"
        component={PreferredFirstDayOfWeek}
      />
      <Stack.Screen
        name="PreferredDateFormat"
        component={PreferredDateFormat}
      />
      <Stack.Screen
        name="PreferredServiceProviders"
        component={PreferredServiceProviders}
      />
      <Stack.Screen name="PlanScreen" component={PlanScreen} />
      <Stack.Screen name="ReportChat" component={ReportChat} />
      <Stack.Screen name="WareHouses" component={WareHouses} />
      <Stack.Screen name="WarehouseRental" component={WarehouseRental} />
      <Stack.Screen name="WarehouseStorage" component={WarehouseStorage} />
      <Stack.Screen name="Rentals" component={Rentals} />
      <Stack.Screen name="RentalDetailPage" component={RentalDetailPage} />
      <Stack.Screen name="MarketplaceTour" component={MarketplaceTour} />
      <Stack.Screen name="RentalVehical" component={RentalVehical} />
      <Stack.Screen name="RrentalMap" component={RrentalMap} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      {/* shipping screens  */}
      <Stack.Screen name="Shipping" component={Shipping} />
      <Stack.Screen name="EstimatedWeight" component={EstimatedWeight} />
      <Stack.Screen name="OrderCart" component={OrderCart} />
      <Stack.Screen name="OrderDropOff" component={OrderDropOff} />
      <Stack.Screen name="FoodOrderSummary" component={FoodOrderSummary} />
      <Stack.Screen name="TripReview" component={TripReview} />
      <Stack.Screen name="QrScreen" component={QrScreen} />


      {/* customer Parking screens  */}
      <Stack.Screen name="CusParkingMap" component={CusParkingMap} />
      <Stack.Screen name="CustomerTripReview" component={CustomerTripReview} />
      <Stack.Screen name="CustomerTripDetail" component={CustomerTripDetail} />
      <Stack.Screen name="CustomerProfileDetails" component={CustomerProfileDetails} />
      <Stack.Screen name="CustomerCalender" component={CustomerCalender} />
      <Stack.Screen name="FinalizingBooking" component={FinalizingBooking} />
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmation} />
    </Stack.Navigator>
  );
};

export default MainStack;
