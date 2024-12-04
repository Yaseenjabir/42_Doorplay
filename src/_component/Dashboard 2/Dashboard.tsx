import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Notification from "./Notification/Notification";

export default function Layout() {
  return (
    <DashboardLayout
      defaultSidebarCollapsed
      slots={{
        toolbarActions: Notification,
      }}
    >
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
