import * as React from "react";

export type ScreenEntry = {
  id: string;
  sectionId: string;
  fileName: string;
  Component: React.ComponentType<any>;
};

import Screen0 from "./screens/register-and-sales/CardPaymentConfirmation.tsx";
import Screen1 from "./screens/register-and-sales/CardTapToPayConfirmation.tsx";
import Screen2 from "./screens/register-and-sales/CashPaymentConfirmation.tsx";
import Screen3 from "./screens/register-and-sales/OrderEditTab.tsx";
import Screen4 from "./screens/register-and-sales/OrderFolderDetail.tsx";
import Screen5 from "./screens/register-and-sales/OrdersMain.tsx";
import Screen6 from "./screens/register-and-sales/PaymentFailedTapToPay.tsx";
import Screen7 from "./screens/register-and-sales/PaymentSuccessAllMethods.tsx";
import Screen8 from "./screens/daily-expenses/CreateExpense.tsx";
import Screen9 from "./screens/daily-expenses/EditExpenseAdminManagerView.tsx";
import Screen10 from "./screens/daily-expenses/FolderDetail.tsx";
import Screen11 from "./screens/daily-expenses/TodaysExpenses.tsx";
import Screen12 from "./screens/activity-and-reports/ActivityAndReportsManagerAdminView.tsx";
import Screen13 from "./screens/activity-and-reports/ActivityCashierView.tsx";
import Screen14 from "./screens/activity-and-reports/CreateExpenseManagerAdminView.tsx";
import Screen15 from "./screens/activity-and-reports/EditExpenseAdminManagerView.tsx";
import Screen16 from "./screens/activity-and-reports/RefundModal.tsx";
import Screen17 from "./screens/settings-and-configuration/DeviceMode.tsx";
import Screen18 from "./screens/settings-and-configuration/DeviceModeConflict.tsx";
import Screen19 from "./screens/settings-and-configuration/DeviceModeSwitchBackOffice.tsx";
import Screen20 from "./screens/settings-and-configuration/DeviceModeSwitchRegister.tsx";
import Screen21 from "./screens/settings-and-configuration/ExpenseManagement.tsx";
import Screen22 from "./screens/settings-and-configuration/ExpenseManagementFolderDetail.tsx";
import Screen23 from "./screens/settings-and-configuration/ExpenseManagementNewFolder.tsx";
import Screen24 from "./screens/settings-and-configuration/ExpenseManagementNewItem.tsx";
import Screen25 from "./screens/settings-and-configuration/GeneralSettings.tsx";
import Screen26 from "./screens/settings-and-configuration/InventoryManagementFolderDetail.tsx";
import Screen27 from "./screens/settings-and-configuration/ItemManagement.tsx";
import Screen28 from "./screens/settings-and-configuration/ItemManagementNewItem.tsx";
import Screen29 from "./screens/settings-and-configuration/ManagerUsersSecurityRestriction.tsx";
import Screen30 from "./screens/settings-and-configuration/PaymentModificationPinRequest.tsx";
import Screen31 from "./screens/settings-and-configuration/PaymentSettings.tsx";
import Screen32 from "./screens/settings-and-configuration/PrinterSettings.tsx";
import Screen33 from "./screens/settings-and-configuration/ReceiptConfiguration.tsx";
import Screen34 from "./screens/settings-and-configuration/ReportBug.tsx";
import Screen35 from "./screens/settings-and-configuration/SettingsRoot.tsx";
import Screen36 from "./screens/settings-and-configuration/SettingsSecurityAccesWithPinToEnterSection.tsx";
import Screen37 from "./screens/settings-and-configuration/SuggestFeature.tsx";
import Screen38 from "./screens/settings-and-configuration/UserProfile.tsx";
import Screen39 from "./screens/settings-and-configuration/UsersAddUser.tsx";
import Screen40 from "./screens/settings-and-configuration/UsersCreateRoleBreakdown.tsx";
import Screen41 from "./screens/settings-and-configuration/UsersEditUser.tsx";
import Screen42 from "./screens/settings-and-configuration/UsersList.tsx";
import Screen43 from "./screens/onboarding-and-security/AuthRegisterLogin.tsx";
import Screen44 from "./screens/onboarding-and-security/CheckEmailPasswordResetInstructions.tsx";
import Screen45 from "./screens/onboarding-and-security/CreateNewPin.tsx";
import Screen46 from "./screens/onboarding-and-security/FirstLaunchOnboardingOrders.tsx";
import Screen47 from "./screens/onboarding-and-security/PinChange.tsx";
import Screen48 from "./screens/onboarding-and-security/PinResetRoleSelection.tsx";
import Screen49 from "./screens/onboarding-and-security/ResetForgottenPinCashierFinal.tsx";
import Screen50 from "./screens/onboarding-and-security/ResetPassword.tsx";
import Screen51 from "./screens/onboarding-and-security/ResetPinEnterEmailManagerAdmin.tsx";
import Screen52 from "./screens/onboarding-and-security/SetNewPassword.tsx";
import Screen53 from "./screens/system-emails/EmailUpdated.tsx";
import Screen54 from "./screens/system-emails/PromotedToManager.tsx";
import Screen55 from "./screens/system-emails/ResetPassword.tsx";
import Screen56 from "./screens/system-emails/ResetPin.tsx";
import Screen57 from "./screens/system-emails/Welcome.tsx";

export const screens: ScreenEntry[] = [
  { id: "register-and-sales/CardPaymentConfirmation", sectionId: "register-and-sales", fileName: "CardPaymentConfirmation.tsx", Component: Screen0 },
  { id: "register-and-sales/CardTapToPayConfirmation", sectionId: "register-and-sales", fileName: "CardTapToPayConfirmation.tsx", Component: Screen1 },
  { id: "register-and-sales/CashPaymentConfirmation", sectionId: "register-and-sales", fileName: "CashPaymentConfirmation.tsx", Component: Screen2 },
  { id: "register-and-sales/OrderEditTab", sectionId: "register-and-sales", fileName: "OrderEditTab.tsx", Component: Screen3 },
  { id: "register-and-sales/OrderFolderDetail", sectionId: "register-and-sales", fileName: "OrderFolderDetail.tsx", Component: Screen4 },
  { id: "register-and-sales/OrdersMain", sectionId: "register-and-sales", fileName: "OrdersMain.tsx", Component: Screen5 },
  { id: "register-and-sales/PaymentFailedTapToPay", sectionId: "register-and-sales", fileName: "PaymentFailedTapToPay.tsx", Component: Screen6 },
  { id: "register-and-sales/PaymentSuccessAllMethods", sectionId: "register-and-sales", fileName: "PaymentSuccessAllMethods.tsx", Component: Screen7 },
  { id: "daily-expenses/CreateExpense", sectionId: "daily-expenses", fileName: "CreateExpense.tsx", Component: Screen8 },
  { id: "daily-expenses/EditExpenseAdminManagerView", sectionId: "daily-expenses", fileName: "EditExpenseAdminManagerView.tsx", Component: Screen9 },
  { id: "daily-expenses/FolderDetail", sectionId: "daily-expenses", fileName: "FolderDetail.tsx", Component: Screen10 },
  { id: "daily-expenses/TodaysExpenses", sectionId: "daily-expenses", fileName: "TodaysExpenses.tsx", Component: Screen11 },
  { id: "activity-and-reports/ActivityAndReportsManagerAdminView", sectionId: "activity-and-reports", fileName: "ActivityAndReportsManagerAdminView.tsx", Component: Screen12 },
  { id: "activity-and-reports/ActivityCashierView", sectionId: "activity-and-reports", fileName: "ActivityCashierView.tsx", Component: Screen13 },
  { id: "activity-and-reports/CreateExpenseManagerAdminView", sectionId: "activity-and-reports", fileName: "CreateExpenseManagerAdminView.tsx", Component: Screen14 },
  { id: "activity-and-reports/EditExpenseAdminManagerView", sectionId: "activity-and-reports", fileName: "EditExpenseAdminManagerView.tsx", Component: Screen15 },
  { id: "activity-and-reports/RefundModal", sectionId: "activity-and-reports", fileName: "RefundModal.tsx", Component: Screen16 },
  { id: "settings-and-configuration/DeviceMode", sectionId: "settings-and-configuration", fileName: "DeviceMode.tsx", Component: Screen17 },
  { id: "settings-and-configuration/DeviceModeConflict", sectionId: "settings-and-configuration", fileName: "DeviceModeConflict.tsx", Component: Screen18 },
  { id: "settings-and-configuration/DeviceModeSwitchBackOffice", sectionId: "settings-and-configuration", fileName: "DeviceModeSwitchBackOffice.tsx", Component: Screen19 },
  { id: "settings-and-configuration/DeviceModeSwitchRegister", sectionId: "settings-and-configuration", fileName: "DeviceModeSwitchRegister.tsx", Component: Screen20 },
  { id: "settings-and-configuration/ExpenseManagement", sectionId: "settings-and-configuration", fileName: "ExpenseManagement.tsx", Component: Screen21 },
  { id: "settings-and-configuration/ExpenseManagementFolderDetail", sectionId: "settings-and-configuration", fileName: "ExpenseManagementFolderDetail.tsx", Component: Screen22 },
  { id: "settings-and-configuration/ExpenseManagementNewFolder", sectionId: "settings-and-configuration", fileName: "ExpenseManagementNewFolder.tsx", Component: Screen23 },
  { id: "settings-and-configuration/ExpenseManagementNewItem", sectionId: "settings-and-configuration", fileName: "ExpenseManagementNewItem.tsx", Component: Screen24 },
  { id: "settings-and-configuration/GeneralSettings", sectionId: "settings-and-configuration", fileName: "GeneralSettings.tsx", Component: Screen25 },
  { id: "settings-and-configuration/InventoryManagementFolderDetail", sectionId: "settings-and-configuration", fileName: "InventoryManagementFolderDetail.tsx", Component: Screen26 },
  { id: "settings-and-configuration/ItemManagement", sectionId: "settings-and-configuration", fileName: "ItemManagement.tsx", Component: Screen27 },
  { id: "settings-and-configuration/ItemManagementNewItem", sectionId: "settings-and-configuration", fileName: "ItemManagementNewItem.tsx", Component: Screen28 },
  { id: "settings-and-configuration/ManagerUsersSecurityRestriction", sectionId: "settings-and-configuration", fileName: "ManagerUsersSecurityRestriction.tsx", Component: Screen29 },
  { id: "settings-and-configuration/PaymentModificationPinRequest", sectionId: "settings-and-configuration", fileName: "PaymentModificationPinRequest.tsx", Component: Screen30 },
  { id: "settings-and-configuration/PaymentSettings", sectionId: "settings-and-configuration", fileName: "PaymentSettings.tsx", Component: Screen31 },
  { id: "settings-and-configuration/PrinterSettings", sectionId: "settings-and-configuration", fileName: "PrinterSettings.tsx", Component: Screen32 },
  { id: "settings-and-configuration/ReceiptConfiguration", sectionId: "settings-and-configuration", fileName: "ReceiptConfiguration.tsx", Component: Screen33 },
  { id: "settings-and-configuration/ReportBug", sectionId: "settings-and-configuration", fileName: "ReportBug.tsx", Component: Screen34 },
  { id: "settings-and-configuration/SettingsRoot", sectionId: "settings-and-configuration", fileName: "SettingsRoot.tsx", Component: Screen35 },
  { id: "settings-and-configuration/SettingsSecurityAccesWithPinToEnterSection", sectionId: "settings-and-configuration", fileName: "SettingsSecurityAccesWithPinToEnterSection.tsx", Component: Screen36 },
  { id: "settings-and-configuration/SuggestFeature", sectionId: "settings-and-configuration", fileName: "SuggestFeature.tsx", Component: Screen37 },
  { id: "settings-and-configuration/UserProfile", sectionId: "settings-and-configuration", fileName: "UserProfile.tsx", Component: Screen38 },
  { id: "settings-and-configuration/UsersAddUser", sectionId: "settings-and-configuration", fileName: "UsersAddUser.tsx", Component: Screen39 },
  { id: "settings-and-configuration/UsersCreateRoleBreakdown", sectionId: "settings-and-configuration", fileName: "UsersCreateRoleBreakdown.tsx", Component: Screen40 },
  { id: "settings-and-configuration/UsersEditUser", sectionId: "settings-and-configuration", fileName: "UsersEditUser.tsx", Component: Screen41 },
  { id: "settings-and-configuration/UsersList", sectionId: "settings-and-configuration", fileName: "UsersList.tsx", Component: Screen42 },
  { id: "onboarding-and-security/AuthRegisterLogin", sectionId: "onboarding-and-security", fileName: "AuthRegisterLogin.tsx", Component: Screen43 },
  { id: "onboarding-and-security/CheckEmailPasswordResetInstructions", sectionId: "onboarding-and-security", fileName: "CheckEmailPasswordResetInstructions.tsx", Component: Screen44 },
  { id: "onboarding-and-security/CreateNewPin", sectionId: "onboarding-and-security", fileName: "CreateNewPin.tsx", Component: Screen45 },
  { id: "onboarding-and-security/FirstLaunchOnboardingOrders", sectionId: "onboarding-and-security", fileName: "FirstLaunchOnboardingOrders.tsx", Component: Screen46 },
  { id: "onboarding-and-security/PinChange", sectionId: "onboarding-and-security", fileName: "PinChange.tsx", Component: Screen47 },
  { id: "onboarding-and-security/PinResetRoleSelection", sectionId: "onboarding-and-security", fileName: "PinResetRoleSelection.tsx", Component: Screen48 },
  { id: "onboarding-and-security/ResetForgottenPinCashierFinal", sectionId: "onboarding-and-security", fileName: "ResetForgottenPinCashierFinal.tsx", Component: Screen49 },
  { id: "onboarding-and-security/ResetPassword", sectionId: "onboarding-and-security", fileName: "ResetPassword.tsx", Component: Screen50 },
  { id: "onboarding-and-security/ResetPinEnterEmailManagerAdmin", sectionId: "onboarding-and-security", fileName: "ResetPinEnterEmailManagerAdmin.tsx", Component: Screen51 },
  { id: "onboarding-and-security/SetNewPassword", sectionId: "onboarding-and-security", fileName: "SetNewPassword.tsx", Component: Screen52 },
  { id: "system-emails/EmailUpdated", sectionId: "system-emails", fileName: "EmailUpdated.tsx", Component: Screen53 },
  { id: "system-emails/PromotedToManager", sectionId: "system-emails", fileName: "PromotedToManager.tsx", Component: Screen54 },
  { id: "system-emails/ResetPassword", sectionId: "system-emails", fileName: "ResetPassword.tsx", Component: Screen55 },
  { id: "system-emails/ResetPin", sectionId: "system-emails", fileName: "ResetPin.tsx", Component: Screen56 },
  { id: "system-emails/Welcome", sectionId: "system-emails", fileName: "Welcome.tsx", Component: Screen57 },
];
