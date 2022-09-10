import React from "react";

import PagesList from "../components/PagesList";
import BottomNavigationComponent from "../components/BottomNavigation";
import TopNavigation from "../components/TopNavigation";

export default {
    title: "Navigations",
    component: PagesList,
};

const Template = (args) => <PagesList {...args} />;

export const SideNavigation = Template.bind({});

SideNavigation.args = {
    activePage: "/",
};

export const BottomNavigation = (args) => (
    <BottomNavigationComponent {...args} />
);

export const TopNavigationTemplate = (args) => <TopNavigation />;
